import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function ({ amount }) {
  return (
    <View style={styles.card}>
      <Text style={styles.amountText}>Amount: ${amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
