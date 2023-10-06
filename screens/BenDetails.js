import React from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Items from "../api/comodities";
import Card from "../components/Card";
import CartButton from "../components/CartButton";

export default function BeneficiaryDetails({
  selectedBeneficiary,
  cartItems,
  setSelectedBeneficiary,
  setCartItems,
  handleAddToCart,
}) {
  const navigation = useNavigation();
  const amount = selectedBeneficiary ? selectedBeneficiary.amount : 0;
  // Create a random array of items

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  // Show confirmation dialog when the user presses the back button
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();

        Alert.alert(
          "Confirm",
          "Are you sure you want to go back?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {},
            },
            {
              text: "Logout",
              style: "destructive",
              onPress: () => {
                setSelectedBeneficiary(null);
                setCartItems([]);
                navigation.dispatch(e.data.action);
              },
            },
          ],
          { cancelable: false }
        );
      });

      return unsubscribe;
    }, [navigation, setSelectedBeneficiary, setCartItems])
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#007DBC", "#6FB9E8"]} style={styles.card}>
        <Text style={styles.balanceText}>Balance: Rs. {amount.toFixed(2)}</Text>
      </LinearGradient>
      <ScrollView style={styles.scrollView}>
        {Items.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <View key={index} style={styles.cardRow}>
                <Card
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  onAddToCart={handleAddToCart}
                />
                {Items[index + 1] && (
                  <Card
                    name={Items[index + 1].name}
                    price={Items[index + 1].price}
                    image={Items[index + 1].image}
                    onAddToCart={handleAddToCart}
                  />
                )}
              </View>
            );
          }
        })}
      </ScrollView>
      <CartButton
        balance={amount.toFixed(2)}
        onPress={handleCartPress}
        cartItems={cartItems}
      />
      {/* <Logout
        setSelectedBeneficiary={setSelectedBeneficiary}
        setCartItems={setCartItems}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    marginTop: 25,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  balanceText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
  },
  scrollView: {
    width: "100%",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
