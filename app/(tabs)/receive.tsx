import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Inbox as ReceiveIcon } from "@styled-icons/material-rounded/Inbox";

export default function ReceiveScreen() {
  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Receive FairCoins</ThemedText>
        <ThemedText style={styles.description}>
          Share your address to receive FairCoins.
        </ThemedText>
        <ReceiveIcon width={24} height={24} />
        {/* Add receive functionality here */}
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
