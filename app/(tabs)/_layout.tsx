import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Calgary",
        }}
      />
      <Tabs.Screen
        name="welcome"
        options={{
          title: "Edmonton",
        }}
      />
    </Tabs>
  );
}
