import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";

const Scanner = React.memo(({ setSelectedBeneficiary }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const response = await api
        .get(`/beneficiaries/${data}`)
        .then((res) => {
          setSelectedBeneficiary(res.data);
        })
        .then(() => {
          navigation.navigate("BeneficiaryDetails");
        });
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  };

  // Update this function to use the pop method
  const handleGoBack = () => {
    navigation.pop();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanResultContainer}>
          <Button title={"Tap to Scan Again"} onPress={handleGoBack} />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scanResultContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center", // Center the logo horizontally
    marginTop: 10, // Add some margin to separate the logo from the header
  },
});

export default Scanner;
