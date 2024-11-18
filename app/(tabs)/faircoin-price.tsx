import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFairCoinPrice } from "@/module/faircoin/FairCoinService";

export default function FairCoinPriceScreen() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchFairCoinPrice = async () => {
      try {
        const price = await getFairCoinPrice();
        setPrice(price);
      } catch (error) {
        console.error("Error fetching FairCoin price:", error);
      }
    };

    fetchFairCoinPrice();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">FairCoin Price</ThemedText>
      <ThemedText style={styles.description}>
        Check the current price of FairCoin.
      </ThemedText>
      {price !== null ? (
        <ThemedText style={styles.price}>${price}</ThemedText>
      ) : (
        <ThemedText>Loading...</ThemedText>
      )}
    </ThemedView>
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
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
