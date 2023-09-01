import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Scanner from "./screens/Scanner";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Logo from "./assets/logo"; // Replace with the actual path to your Logo component

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
      {/* Logo after the header */}
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
    alignItems: "right",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center", // Center the logo horizontally
    marginTop: 10, // Add some margin to separate the logo from the header
  },
});

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
