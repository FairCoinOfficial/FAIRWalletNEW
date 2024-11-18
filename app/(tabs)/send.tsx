import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Send as SendIcon } from "@styled-icons/material-rounded/Send";

export default function SendScreen() {
  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Send FairCoins</ThemedText>
        <ThemedText style={styles.description}>
          Enter the recipient's address and the amount to send.
        </ThemedText>
        <SendIcon width={24} height={24} />
        {/* Add send functionality here */}
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
