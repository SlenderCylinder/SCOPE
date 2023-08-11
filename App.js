import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Card from "./components/Card";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>What can I say, Thank you</Text>
      <Text>You're welcome</Text>
      <StatusBar style="auto" />
      <Card amount={1000} />
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
});
