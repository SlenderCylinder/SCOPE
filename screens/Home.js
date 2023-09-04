import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Logo from "../assets/logo"; // Replace with the actual path to your Logo component

import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button title="Scan" onPress={() => navigation.navigate("Scanner")} />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "right",
    justifyContent: "right",
  },
  logoContainer: {
    alignItems: "center", // Center the logo horizontally
    marginTop: 10, // Add some margin to separate the logo from the header
  },
});
