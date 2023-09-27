import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";

export default function Pin({ setSelectedBeneficiary }) {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await api
      .get(`/beneficiary/${pin}`)
      .then((res) => {
        setSelectedBeneficiary(res.data);
        navigation.navigate("BeneficiaryDetails"); // Navigate to BeneficiaryDetails screen
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const isLoginDisabled = () => {
    return pin.length !== 6;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        value={pin}
        onChangeText={(text) => setPin(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.button, isLoginDisabled() && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoginDisabled()}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
