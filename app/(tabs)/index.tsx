import { Image, StyleSheet, Platform, View, FlatList } from "react-native";

type RootStackParamList = {
  Settings: undefined;
  FairCoinPrice: undefined;
  Wallet: undefined;
};
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Button, Provider as PaperProvider } from "react-native-paper";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Home as HomeIcon } from "@styled-icons/material-rounded/Home";

const recentTransactions = [
  { id: "1", description: "Sent 10 FairCoins", amount: "-10 FC" },
  { id: "2", description: "Received 5 FairCoins", amount: "+5 FC" },
  { id: "3", description: "Sent 2 FairCoins", amount: "-2 FC" },
];

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  transactionsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

const ParallaxScrollViewComponent = (
  <ParallaxScrollView
    headerBackgroundColor={{ dark: "#A1CEDC", light: "#A1CEDC" }}
    headerImage={
      <Image
        style={styles.reactLogo}
        source={require("@/assets/images/react-logo.png")}
      />
    }
  >
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Welcome to FAIRWallet!</ThemedText>
      <HelloWave />
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Step 1: Get Started</ThemedText>
      <ThemedText>
        Edit{" "}
        <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
        to see changes. Press{" "}
        <ThemedText type="defaultSemiBold">
          {Platform.select({
            ios: "cmd + d",
            android: "cmd + m",
            web: "F12",
          })}
        </ThemedText>{" "}
        to open developer tools.
      </ThemedText>
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Step 2: Explore</ThemedText>
      <ThemedText>
        Tap the Explore tab to learn more about what's included in this wallet
        app.
      </ThemedText>
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Step 3: Manage Your Faircoins</ThemedText>
      <ThemedText>
        Use the wallet to manage your faircoins securely and efficiently.
      </ThemedText>
    </ThemedView>
    <ThemedView style={styles.buttonContainer}>
      <Button mode="contained" onPress={() => navigation.navigate("Settings")}>
        Settings
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("FairCoinPrice")}
      >
        FairCoin Price
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Wallet")}>
        Wallet
      </Button>
    </ThemedView>
    <ThemedView style={styles.transactionsContainer}>
      <ThemedText type="subtitle">Recent Transactions</ThemedText>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.transactionItem}>
            <ThemedText>{item.description}</ThemedText>
            <ThemedText>{item.amount}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  </ParallaxScrollView>
);

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return <PaperProvider>{ParallaxScrollViewComponent}</PaperProvider>;
}
