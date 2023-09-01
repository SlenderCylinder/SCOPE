import { Text, View, StyleSheet, Button } from "react-native";
import beneficiaries from "../DB/Bdata.json";

export default function BeneficiaryDetails({ route, beneficiary }) {
  const { uniqID } = route.params;
  const selectedBeneficiary = beneficiaries.find((b) => b.uniqID === uniqID);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Balance: ${selectedBeneficiary.balance.toFixed(2)}
      </Text>
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
  scanResultContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    alignItems: "center",
  },
  balanceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
