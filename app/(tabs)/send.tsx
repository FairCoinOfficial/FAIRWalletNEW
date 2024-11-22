import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons as SendIcon } from "@expo/vector-icons";
import BitcoinService from "@/module/faircoin/FairCoinService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  status: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function SendScreen() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  const handleSend = async () => {
    try {
      const data = {
        lastTxs: [], // Add logic to fetch last transactions
        address: "your-address", // Replace with the sender's address
        receivers: [{ address: recipientAddress, value: parseFloat(amount) }],
        prvKey: "your-private-key", // Replace with the sender's private key
      };
      const txId = await BitcoinService.pushTx(data);
      setTransactionStatus(`Transaction successful! TXID: ${txId}`);
    } catch (error) {
      setTransactionStatus("Transaction failed. Please try again.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Send FairCoins</ThemedText>
      <ThemedText style={styles.description}>
        Enter the recipient's address and the amount to send.
      </ThemedText>
      <SendIcon name="send" size={24} />
      <TextInput
        style={styles.input}
        placeholder="Recipient Address"
        value={recipientAddress}
        onChangeText={setRecipientAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={handleSend}>
        Send
      </Button>
      {transactionStatus ? (
        <ThemedText style={styles.status}>{transactionStatus}</ThemedText>
      ) : null}
    </ThemedView>
  );
}
