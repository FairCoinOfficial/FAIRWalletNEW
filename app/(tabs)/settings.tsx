import { StyleSheet } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Settings as SettingsIcon } from "@styled-icons/material-rounded/Settings";

export default function SettingsScreen() {
  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText style={styles.description}>
          Configure your FAIRWallet settings below.
        </ThemedText>
        <SettingsIcon width={24} height={24} />
        {/* Add settings options here */}
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
