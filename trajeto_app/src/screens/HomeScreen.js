import { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
} from "react-native";

import Buttons from "../components/Buttons";
import MapComponent from "../components/MapComponent";
import CoordinateList from "../components/CoordinateList";

import {
  iniciarRastreamento,
  pararRastreamento,
} from "../services/locationService";

import { distanciaTotal } from "../utils/distance";

export default function HomeScreen() {
  const [locations, setLocations] = useState([]);
  const [subscription, setSubscription] = useState(null);

  async function iniciar() {
    try {
      const novaSubscription =
        await iniciarRastreamento((coords) => {
          setLocations((prev) => [
            ...prev,
            coords,
          ]);
        });

      setSubscription(novaSubscription);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível iniciar o rastreamento."
      );
    }
  }

  function parar() {
    pararRastreamento(subscription);
    setSubscription(null);
  }

  const distancia = distanciaTotal(locations);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Registrador de Trajeto
      </Text>

      <Buttons
        onStart={iniciar}
        onStop={parar}
      />

      <MapComponent
        locations={locations}
      />

      <Text style={styles.distancia}>
        Distância percorrida:{" "}
        {(distancia / 1000).toFixed(2)} km
      </Text>

      <CoordinateList
        locations={locations}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  distancia: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});