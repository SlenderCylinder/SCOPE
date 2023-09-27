import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Icon } from "react-native-elements"; // Import the Icon component
import Logo from "../assets/logo";

import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Icon
            style={{ marginRight: 10 }}
            color={"white"}
            name="qrcode"
            type="font-awesome"
          />
          <Text style={{ color: "white", fontSize: 20 }}>Scan QR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]} // Add margin to the second button
          title="Pin"
          onPress={() => navigation.navigate("Pin")}
        >
          <Icon
            style={{ marginRight: 10 }}
            color={"white"}
            name="lock"
            type="font-awesome"
          />
          <Text style={{ color: "white", fontSize: 20 }}>Enter PIN</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logoContainer: {
    width: 200,
    alignItems: "center", // Center the logo horizontally
    marginTop: 10, // Add some margin to separate the logo from the header
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 250,
    color: "white",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
