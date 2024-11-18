import * as bitcoin from 'bitcoinjs-lib';
import bitcoinUnit from 'bitcoin-units';

const COIN: number = 100000000;
const PRECISION: number = 8;
const DUST: number = 2730;
const BASE_FEE: number = 10000;
const LOCK_TIME_TIMESTAMP_THRESHOLD: number = 5000000;

/**
 * convert a BTC value to Satoshi
 *
 * @param btc   number       BTC value
 * @returns number           Satoshi value (int)
 */
const toSatoshi = (btc: number): number => {
    return parseInt((btc * COIN).toFixed(0), 10);
};

/**
 * convert a Satoshi value to BTC
 *
 * @param satoshi   number   Satoshi value
 * @returns string           BTC value (float)
 */
const toBTC = (satoshi: number): string => {
    return bitcoinUnit(satoshi, 'satoshi').to('BTC').value();
};

/**
 * convert a Satoshi value to fixed decimals
 *
 * @param satoshi   number   Satoshi value
 * @param fixed     number   Number of decimal places
 * @returns string           BTC value with fixed decimals
 */
const toFixed = (satoshi: number, fixed: number = 2): string => {
    if (satoshi) {
        return satoshi.toFixed(fixed);
    }
    return '';
};

/**
 * check whether an address is valid
 *
 * @param address   string               wallet address
 * @param network   bitcoin.Network      Bitcoin network
 * @returns boolean                      True if valid, false otherwise
 */
const validate = async (address: string, network: bitcoin.Network): Promise<boolean> => {
    try {
        bitcoin.address.toOutputScript(address, network);
        return true;
    } catch (e) {
        return false;
    }
};

const BitcoinUtil = {
    toSatoshi,
    toBTC,
    validate,
    toFixed
};

export default BitcoinUtil;
