import React, { useState } from "react";
import Scanner from "./screens/Scanner";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import BeneficiaryDetails from "./screens/BenDetails";
import CartPage from "./screens/CartPage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Button, View, Text } from "react-native";

const Stack = createStackNavigator();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const navigation = useNavigation();

  const handleAddToCart = (name, quantity, price) => {
    const newItem = { name, quantity, price };
    setCartItems([...cartItems, newItem]);
  };
  const handleRemoveFromCart = (item) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(newCartItems);
  };
  const handleLogout = () => {
    setCartItems([]);
    setSelectedBeneficiary(null);
    navigation.navigate("Home");
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {selectedBeneficiary && (
                <Button title="Logout" onPress={handleLogout} />
              )}
            </View>
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner">
          {(props) => (
            <Scanner
              {...props}
              setSelectedBeneficiary={setSelectedBeneficiary}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => (
            <CartPage
              {...props}
              cartItems={cartItems}
              selectedBeneficiary={selectedBeneficiary}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="BeneficiaryDetails"
          options={{ title: "Beneficiary Details" }}
        >
          {(props) => (
            <BeneficiaryDetails
              {...props}
              cartItems={cartItems}
              selectedBeneficiary={selectedBeneficiary}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
