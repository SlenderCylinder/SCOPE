import React, { useState } from "react";
import Scanner from "./screens/Scanner";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Pin from "./screens/Pin";
import BeneficiaryDetails from "./screens/BenDetails";
import CartPage from "./screens/CartPage";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./screens/Loading";
import { ActivityIndicator } from "react-native";

const Stack = createStackNavigator();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const handleAddToCart = (name, quantity, price) => {
    const newItem = { name, quantity, price };
    setCartItems([...cartItems, newItem]);
  };

  const handleRemoveFromCart = (item) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(newCartItems);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Pin">
          {(props) => (
            <Pin {...props} setSelectedBeneficiary={setSelectedBeneficiary} />
          )}
        </Stack.Screen>
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
              setSelectedBeneficiary={setSelectedBeneficiary}
              setCartItems={setCartItems}
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
              setSelectedBeneficiary={setSelectedBeneficiary}
              setCartItems={setCartItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
