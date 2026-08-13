import { View, Button, StyleSheet } from "react-native";

export default function Buttons({ onStart, onStop }) {
  return (
    <View style={styles.container}>
      <Button
        title="Iniciar Rastreamento"
        onPress={onStart}
      />

      <Button
        title="Parar Rastreamento"
        onPress={onStop}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});