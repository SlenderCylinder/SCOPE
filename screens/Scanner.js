import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import beneficiaries from "../DB/Bdata.json";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data);
    setScanned(true);
    const beneficiary = beneficiaries.find((b) => b.uniqID === data);
    if (beneficiary) {
      alert(`Welcome, ${beneficiary.firstName} ${beneficiary.lastName}!`);
    } else {
      alert(`Invalid QR code`);
    }
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
          {beneficiaries.map((beneficiary) => {
            if (beneficiary.uniqID === scannedData) {
              return (
                <View key={beneficiary.uniqID}>
                  <Text style={styles.scanResultText}>
                    Welcome, {beneficiary.firstName} {beneficiary.lastName}!
                  </Text>
                </View>
              );
            }
          })}
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
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
