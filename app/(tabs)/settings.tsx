import { StyleSheet, View, Switch } from "react-native";
import { Provider as PaperProvider, Text, Button } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Settings as SettingsIcon } from "@styled-icons/material-rounded/Settings";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);
  const toggleNotifications = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText style={styles.description}>
          Configure your FAIRWallet settings below.
        </ThemedText>
        <SettingsIcon width={24} height={24} />
        <View style={styles.settingItem}>
          <ThemedText>Dark Mode</ThemedText>
          <Switch
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        <View style={styles.settingItem}>
          <ThemedText>Enable Notifications</ThemedText>
          <Switch
            onValueChange={toggleNotifications}
            value={isNotificationsEnabled}
          />
        </View>
        <Button mode="contained" onPress={() => console.log("Settings saved")}>
          Save Settings
        </Button>
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
});
