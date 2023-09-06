import React, { useState } from "react";
import api from "../api/api";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CheckoutItem from "../components/CheckoutItem";

export default function CartPage({
  selectedBeneficiary,
  cartItems,
  handleRemoveFromCart,
}) {
  const { balance, _id } = selectedBeneficiary;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    console.log(cartItems, _id);
    setIsLoading(true);
    // Send request to API with cart items and uniqID
    api
      .post("/beneficiaries/updateCart", { cartItems, _id })
      .then((response) => {
        setIsLoading(false);
        setIsSuccess(true);
        // Reset cart items
        handleRemoveFromCart(null);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Order placed successfully!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItems.map((item) => (
        <CheckoutItem
          key={`${item.name}-${item.quantity}`}
          handleRemoveFromCart={handleRemoveFromCart}
          item={item}
        />
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>Rs {totalPrice.toFixed(2)}</Text>
      </View>
      {totalPrice > balance ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Exceeds balance</Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          totalPrice === 0 || totalPrice > balance
            ? styles.disabledButton
            : null,
        ]}
        onPress={handleCheckout}
        disabled={totalPrice === 0 || totalPrice > balance}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#007DBC",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  checkoutText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  messageContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  messageText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
