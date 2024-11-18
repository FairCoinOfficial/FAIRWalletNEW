import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function FairCoinPriceScreen() {
  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">FairCoin Price</ThemedText>
        <ThemedText style={styles.description}>
          Check the current price of FairCoin.
        </ThemedText>
        {/* Add FairCoin price display here */}
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
