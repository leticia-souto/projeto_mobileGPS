import MapView, { Polyline } from "react-native-maps";
import { StyleSheet } from "react-native";

export default function MapComponent({ locations }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {locations.length > 1 && (
        <Polyline
          coordinates={locations}
          strokeWidth={5}
          strokeColor="blue"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 400,
  },
});