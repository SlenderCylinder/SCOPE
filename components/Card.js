import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Card({ image, name, price, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartPress = () => {
    onAddToCart(name, quantity, newPrice);
    setQuantity(1); // Reset quantity to 1 after adding to cart
    setModalVisible(false); // Close the modal after adding to cart
  };

  const handlePriceChange = (text) => {
    if (text === "") {
      setNewPrice("");
    } else {
      const newPriceValue = parseFloat(text);
      if (!isNaN(newPriceValue) && newPriceValue <= price) {
        setNewPrice(newPriceValue);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setModalVisible(true)}
    >
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </ImageBackground>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Image source={{ uri: image }} style={styles.modalImage} />
                <Text style={styles.modalName}>{name}</Text>
                <View style={styles.modalPriceQuantityContainer}>
                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPrice}>Rs {price}</Text>
                  </View>
                  <View style={styles.modalQuantityContainer}>
                    <TouchableOpacity onPress={handleDecrement}>
                      <Text style={styles.modalQuantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalQuantity}>{quantity}</Text>
                    <TouchableOpacity onPress={handleIncrement}>
                      <Text style={styles.modalQuantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.modalPriceInputContainer}>
                  <Text style={styles.modalPriceInputLabel}>
                    Edit price (max Rs {price}):
                  </Text>
                  <TextInput
                    style={styles.modalPriceInput}
                    keyboardType="numeric"
                    value={newPrice.toString()}
                    onChangeText={handlePriceChange}
                  />
                </View>
                <TouchableOpacity
                  style={styles.modalCartButton}
                  onPress={handleAddToCartPress}
                >
                  <Text style={styles.modalCartButtonText}>Add to cart</Text>
                  <AntDesign name="shoppingcart" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "start",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalPriceQuantityContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalPriceContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalQuantityButton: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
  },
  modalQuantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  modalPriceInputContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  modalPriceInputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalPriceInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff6b6b",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  modalCartButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});
