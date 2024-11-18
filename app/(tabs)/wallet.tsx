import { StyleSheet, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Wallet as WalletIcon } from "@styled-icons/material-rounded";

type RootStackParamList = {
  Send: undefined;
  Receive: undefined;
  Transactions: undefined;
};

export default function WalletScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Wallet</ThemedText>
        <ThemedText style={styles.description}>
          Manage your FairCoins by sending, receiving, and viewing transactions.
        </ThemedText>
        <WalletIcon width={24} height={24} />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => navigation.navigate("Send")}>
            Send
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Receive")}
          >
            Receive
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Transactions")}
          >
            Transactions
          </Button>
        </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});
