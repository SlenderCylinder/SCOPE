import React, { useState } from "react";
import api from "../api/api";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import CheckoutItem from "../components/CheckoutItem";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function CartPage({
  selectedBeneficiary,
  cartItems,
  handleRemoveFromCart,
  setCartItems,
  setSelectedBeneficiary,
}) {
  const { amount, id } = selectedBeneficiary;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();

  const handleCheckout = () => {
    console.log(cartItems, id);
    setIsLoading(true);
    // Send request to API with cart items and uniqID
    api
      .post("/beneficiaries/updateCart", { cartItems, id })
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

  const handleCloseSuccess = () => {
    navigation.navigate("Home");
    setIsSuccess(false);
    setSelectedBeneficiary(null);
    setCartItems([]);
  };

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
      {totalPrice > amount ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Exceeds balance</Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          totalPrice === 0 || totalPrice > amount
            ? styles.disabledButton
            : null,
          isLoading ? styles.loadingButton : null,
        ]}
        onPress={handleCheckout}
        disabled={totalPrice === 0 || totalPrice > amount || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.checkoutText}>Checkout</Text>
        )}
      </TouchableOpacity>
      <Modal visible={isSuccess} animationType="slide" transparent={true}>
        <View style={styles.successContainer}>
          <AntDesign name="checkcircle" size={64} color="green" />
          <Text style={styles.successText}>Order placed successfully!</Text>
          <TouchableOpacity onPress={handleCloseSuccess}>
            <Text style={styles.closeText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  loadingButton: {
    backgroundColor: "#cccccc",
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
  successContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  closeText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
