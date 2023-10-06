import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartPage({
  selectedBeneficiary,
  cartItems,
  isOffline,
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

  const handleCheckout = async () => {
    setIsLoading(true);
    if (!isOffline) {
      // Save cartItems and index to cache
      const cartData = { cartItems, index: id };
      try {
        const cachedCartData = await AsyncStorage.getItem("cartData");
        if (cachedCartData != null) {
          // If there is already cached data, parse it and add the new cartData object to the array
          const cachedCartDataArray = JSON.parse(cachedCartData);
          cachedCartDataArray.push(cartData);
          await AsyncStorage.setItem(
            "cartData",
            JSON.stringify(cachedCartDataArray)
          );
        } else {
          // If there is no cached data, create a new array with the cartData object and save it to the cache
          const newCartDataArray = [cartData];
          await AsyncStorage.setItem(
            "cartData",
            JSON.stringify(newCartDataArray)
          );
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      setIsSuccess(true);
      handleRemoveFromCart(null);
    } else {
      api
        .post("/beneficiaries/updateCart", { cartItems, id })
        .then((response) => {
          setIsLoading(false);
          setIsSuccess(true);
          handleRemoveFromCart(null);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    }
  };
  const handleCloseSuccess = () => {
    navigation.navigate("Home");
    setIsSuccess(false);
    setSelectedBeneficiary(null);
    setCartItems([]);
  };

  useEffect(() => {
    // Load cartItems and index from cache on mount
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cartData");
        if (cartData != null) {
          const { cartItems, index } = JSON.parse(cartData);
          if (index === id) {
            setCartItems(cartItems);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadCartData();
  }, []);

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
