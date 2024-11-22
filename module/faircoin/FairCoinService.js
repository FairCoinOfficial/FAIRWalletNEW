import axios from "axios";
import * as bitcoin from "bitcoinjs-lib";
import { Buffer } from "buffer";

interface Receiver {
  address: string;
  value: number;
}

interface PushTxData {
  lastTxs: string[];
  address: string;
  receivers: Receiver[];
  prvKey: string;
}

const faircoinNet: bitcoin.networks.Network = {
  messagePrefix: "\x18Faircoin Signed Message:\n",
  bech32: "tb",
  bip32: { public: 70617039, private: 70615956 },
  pubKeyHash: 0x23,
  scriptHash: 0xc4,
  wif: 0xd4,
};

const faircoinExplorer = "https://blockchain.fairco.in/";
const faircoinBackend = "http://27.0.175.48:3000/api/";

const pushTx = async (data: PushTxData): Promise<string> => {
  try {
    const { lastTxs, address, receivers, prvKey } = data;
    const key = bitcoin.ECPair.fromWIF(prvKey, faircoinNet);
    const psbt = new bitcoin.Psbt({ network: faircoinNet });

    psbt.setVersion(1);
    psbt.setLocktime(0);

    const utxosRes = await axios.post(`${faircoinBackend}getUtxos`, {
      addr: address,
      txIds: lastTxs,
    });
    const utxos = utxosRes.data.data;

    for (const utxo of utxos) {
      const prevTxDataRes = await axios.post(
        `${faircoinBackend}getRawTransaction`,
        { txId: utxo.tx }
      );
      const prevTxData = prevTxDataRes.data.data;

      if (!prevTxData) {
        throw new Error("Failed to get txData");
      }

      psbt.addInput({
        hash: utxo.tx,
        index: utxo.id,
        sequence: 0xffffffff,
        nonWitnessUtxo: Buffer.from(prevTxData, "hex"),
      });
    }

    for (const receiver of receivers) {
      psbt.addOutput({
        address: receiver.address,
        value: receiver.value,
      });
    }

    psbt.signAllInputs(key);
    psbt.validateSignaturesOfAllInputs();
    psbt.finalizeAllInputs();

    const txData = psbt.extractTransaction().toHex();
    console.log("txData", txData);
    const newTransaction = (
      await axios.post(`${faircoinBackend}pushtx`, { txData })
    ).data.data;
    console.log("txid", newTransaction);
    return newTransaction;
  } catch (error) {
    console.error("Error pushing transaction:", error);
    throw new Error("Failed to push transaction");
  }
};

const getTransactions = async (address: string): Promise<string[]> => {
  try {
    const result = await axios.get(
      `${faircoinExplorer}ext/getaddress/${address}`
    );
    if (result.data.error) return [];
    else return result.data.last_txs;
  } catch (error) {
    console.error(`Error fetching transactions for address ${address}:`, error);
    return [];
  }
};

const balance = async (address: string): Promise<number> => {
  try {
    const result = await axios.get(
      `${faircoinExplorer}ext/getbalance/${address}`
    );
    if (result.data.error) return 0;
    else return parseFloat(result.data);
  } catch (error) {
    console.error(`Error fetching balance for address ${address}:`, error);
    return 0;
  }
};

const getTxInfo = async (tx: string): Promise<any> => {
  try {
    const result = await axios.get(`${faircoinExplorer}ext/gettx/${tx}`);
    if (result.data.error) return false;
    else return result.data;
  } catch (error) {
    console.error(`Error fetching transaction info for tx ${tx}:`, error);
    return false;
  }
};

const fetchFairCoinPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=faircoin&vs_currencies=usd"
    );
    return response.data.faircoin.usd;
  } catch (error) {
    console.error("Error fetching FairCoin price from CoinGecko:", error);
    throw new Error("Failed to fetch FairCoin price");
  }
};

const getFairCoinPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      "https://peable-website-notion-server.vercel.app/api/faircoin/price"
    );
    return response.data.price;
  } catch (error) {
    console.error("Error fetching FairCoin price from Peable:", error);
    throw new Error("Failed to fetch FairCoin price");
  }
};

const BitcoinService = {
  pushTx,
  getTransactions,
  balance,
  getTxInfo,
  fetchFairCoinPrice,
  getFairCoinPrice,
};

export default BitcoinService;
