import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import Button from '../components/Button';
import MapComponent from '../components/MapComponent';
import CoordinateList from '../components/CoordinateList';
import {
  iniciarRastreamento,
  pararRastreamento,
} from '../services/locationService';
import { distanciaTotal } from '../utils/distance';

export default function HomeScreen() {
  const [locations, setLocations] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const rastreando = subscription !== null;

  useEffect(() => {
    if (!startedAt || !rastreando) return;

    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startedAt, rastreando]);

  async function iniciar() {
    try {
      if (subscription) return;

      setLocations([]);
      setElapsedSeconds(0);
      setStartedAt(Date.now());

      const novaSubscription = await iniciarRastreamento((coords) => {
        setLocations((prev) => [...prev, coords]);
      });

      setSubscription(novaSubscription);
    } catch (error) {
      setStartedAt(null);
      Alert.alert('Erro', error.message || 'Não foi possível iniciar o rastreamento.');
    }
  }

  function parar() {
    pararRastreamento(subscription);
    setSubscription(null);

    if (startedAt) {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }
  }

  function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  }

  const distancia = distanciaTotal(locations);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrador de Trajeto</Text>

      <Button onStart={iniciar} onStop={parar} />

      <MapComponent locations={locations} />

      <Text style={styles.info}>
        Distância: {(distancia / 1000).toFixed(2)} km
      </Text>

      <Text style={styles.info}>
        Tempo: {formatarTempo(elapsedSeconds)}
      </Text>

      <CoordinateList locations={locations} />
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
});
