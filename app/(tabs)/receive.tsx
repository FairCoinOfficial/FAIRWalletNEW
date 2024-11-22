import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { Provider as PaperProvider, Text, Button } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Inbox as ReceiveIcon } from "@styled-icons/material-rounded/Inbox";
import BitcoinService from "@/module/faircoin/FairCoinService";

const paperProvider = (
  <PaperProvider children={undefined}>{/* Add children here */}</PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    marginVertical: 16,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  address: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  copyButton: {
    marginLeft: 8,
    color: "blue",
  },
});

const fetchAddress = async (setAddress: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const userAddress = "your-faircoin-address"; // Replace with actual logic to fetch user's address
    setAddress(userAddress);
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};

export default function ReceiveScreen() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchAddress(setAddress);
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(address);
    alert("Address copied to clipboard!");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Receive FairCoins</ThemedText>
      <ThemedText style={styles.description}>
        Share your address to receive FairCoins.
      </ThemedText>
      <ReceiveIcon width={24} height={24} />
      <View style={styles.addressContainer}>
        <ThemedText style={styles.address}>{address}</ThemedText>
        <TouchableOpacity onPress={copyToClipboard}>
          <ThemedText style={styles.copyButton}>Copy</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
