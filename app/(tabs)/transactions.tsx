import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ReceiptLong as TransactionsIcon } from "@styled-icons/material-rounded/ReceiptLong";
import BitcoinService from "@/module/faircoin/FairCoinService";

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userAddress = "your-faircoin-address"; // Replace with actual logic to fetch user's address
        const txs = await BitcoinService.getTransactions(userAddress);
        setTransactions(txs);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Transactions</ThemedText>
        <ThemedText style={styles.description}>
          View your transaction history below.
        </ThemedText>
        <TransactionsIcon width={24} height={24} />
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.txid}
          renderItem={({ item }) => (
            <ThemedView style={styles.transactionItem}>
              <ThemedText>{item.txid}</ThemedText>
              <ThemedText>{item.value}</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    marginVertical: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
