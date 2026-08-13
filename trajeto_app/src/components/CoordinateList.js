import { View, Text, FlatList, StyleSheet } from "react-native";

export default function CoordinateList({ locations }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Coordenadas capturadas
      </Text>

      <FlatList
        data={locations}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.coordenada}>
            {index + 1}. Latitude: {item.latitude.toFixed(6)}
            {"\n"}
            Longitude: {item.longitude.toFixed(6)}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  coordenada: {
    marginBottom: 8,
  },
});