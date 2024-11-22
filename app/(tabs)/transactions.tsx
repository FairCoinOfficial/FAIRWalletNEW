import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons as TransactionsIcon } from "@expo/vector-icons";
import BitcoinService from "@/module/faircoin/FairCoinService";

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

const fetchTransactions = async (setTransactions: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const userAddress = "your-faircoin-address"; // Replace with actual logic to fetch user's address
    const txs = await BitcoinService.getTransactions(userAddress);
    setTransactions(txs);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions(setTransactions);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Transactions</ThemedText>
      <ThemedText style={styles.description}>
        View your transaction history below.
      </ThemedText>
      <TransactionsIcon name="receipt-long" size={24} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.txid}
        renderItem={({ item }) => (
          <ThemedView style={styles.transactionItem}>
            <ThemedText>{item.txid}</ThemedText>
            <ThemedText>{item.value}</ThemedText>
          </ThemedView>
        )}
        ListEmptyComponent={<ThemedText>No transactions found.</ThemedText>}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log("End reached");
        }}
      />
    </ThemedView>
  );
}
