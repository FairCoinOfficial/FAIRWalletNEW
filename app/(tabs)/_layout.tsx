import React, { useState } from "react";
import { Platform } from "react-native";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";

import { Home as HomeIcon } from "@styled-icons/material-rounded/Home";
import { RocketLaunch as RocketIcon } from "@styled-icons/material-rounded/RocketLaunch";
import { Settings as CogIcon } from "@styled-icons/material-rounded/Settings";
import { ShowChart as ChartLineIcon } from "@styled-icons/material-rounded/ShowChart";
import { AccountBalanceWallet as WalletIcon } from "@styled-icons/material-rounded/AccountBalanceWallet";

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
        return <HomeIcon size={24} color={color} />;
      case "explore":
        return <RocketIcon size={24} color={color} />;
      case "settings":
        return <CogIcon size={24} color={color} />;
      case "faircoin-price":
        return <ChartLineIcon size={24} color={color} />;
      case "wallet":
        return <WalletIcon size={24} color={color} />;
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
