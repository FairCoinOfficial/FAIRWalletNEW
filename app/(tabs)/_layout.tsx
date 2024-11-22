import React, { useState } from "react";
import { Platform } from "react-native";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import HomeScreen from "@/app/(tabs)/index";
import ExploreScreen from "@/app/(tabs)/explore";
import SettingsScreen from "@/app/(tabs)/settings";
import FairCoinPriceScreen from "@/app/(tabs)/faircoin-price";
import WalletScreen from "@/app/(tabs)/wallet";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "explore", title: "Explore", icon: "rocket" },
    { key: "settings", title: "Settings", icon: "cog" },
    {
      key: "faircoin-price",
      title: "FairCoin Price",
      icon: "chart-line",
    },
    { key: "wallet", title: "Wallet", icon: "wallet" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    explore: ExploreScreen,
    settings: SettingsScreen,
    "faircoin-price": FairCoinPriceScreen,
    wallet: WalletScreen,
  });

  const renderIcon = ({
    route,
    focused,
    color,
  }: {
    route: { key: string };
    focused: boolean;
    color: string;
  }) => {
    switch (route.key) {
      case "home":
        return <MaterialIcons name="home" size={24} color={color} />;
      case "explore":
        return <MaterialIcons name="rocket" size={24} color={color} />;
      case "settings":
        return <MaterialIcons name="settings" size={24} color={color} />;
      case "faircoin-price":
        return <MaterialIcons name="show-chart" size={24} color={color} />;
      case "wallet":
        return <MaterialIcons name="account-balance-wallet" size={24} color={color} />;
      default:
        return null;
    }
  };

  return (
    <PaperProvider>
      <BottomNavigation
        barStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
      />
    </PaperProvider>
  );
}
