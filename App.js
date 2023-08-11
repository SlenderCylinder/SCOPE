<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Card from "./components/Card";
=======
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Scanner from './screens/Scanner';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import Logo from './assets/logo'; // Replace with the actual path to your Logo component
>>>>>>> dcfc5ce53d05ab88d6ef0ac4ebe5a960d1c3fa25

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>What can I say, Thank you</Text>
      <Text>You're welcome</Text>
      <StatusBar style="auto" />
      <Card amount={1000} />
=======
      <Stack.Navigator
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
      {/* Logo after the header */}
      <View style={styles.logoContainer}>
        <Logo />
      </View>
>>>>>>> dcfc5ce53d05ab88d6ef0ac4ebe5a960d1c3fa25
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
=======
    backgroundColor: '#fff',
    alignItems: 'right',
    justifyContent: 'center',
>>>>>>> dcfc5ce53d05ab88d6ef0ac4ebe5a960d1c3fa25
  },
  logoContainer: {
    alignItems: 'center', // Center the logo horizontally
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
