import React, { useState } from "react";
import Scanner from "./screens/Scanner";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import BeneficiaryDetails from "./screens/BenDetails";
import CartPage from "./screens/CartPage";
import { NavigationContainer } from "@react-navigation/native";

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
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Scanner">
        {(props) => (
          <Scanner {...props} setSelectedBeneficiary={setSelectedBeneficiary} />
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
        options={({ route }) => ({ title: route.params.name })}
      >
        {(props) => (
          <BeneficiaryDetails
            {...props}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
