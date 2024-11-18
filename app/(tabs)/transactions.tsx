import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { ReceiptLong as TransactionsIcon } from "@styled-icons/material-rounded/ReceiptLong";

export default function TransactionsScreen() {
  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Transactions</ThemedText>
        <ThemedText style={styles.description}>
          View your transaction history below.
        </ThemedText>
        <TransactionsIcon width={24} height={24} />
        {/* Add transactions list here */}
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
});
