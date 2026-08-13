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

const coresPadrao = {
  fundo: '#f5f8ff',
  superficie: '#ffffff',
  texto: '#14213d',
  secundario: '#60708f',
  borda: '#dbe5f5',
};

export default function HomeScreen({ cores = coresPadrao }) {
  const [locations, setLocations] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const rastreando = subscription !== null;
  const distancia = distanciaTotal(locations);

  useEffect(() => {
    if (!startedAt || !rastreando) {
      return undefined;
    }

    const timer = setInterval(() => {
      const segundos = Math.floor((Date.now() - startedAt) / 1000);
      setElapsedSeconds(segundos);
    }, 1000);

    return () => clearInterval(timer);
  }, [startedAt, rastreando]);

  useEffect(() => {
    return () => {
      if (subscription) {
        pararRastreamento(subscription);
      }
    };
  }, [subscription]);

  async function iniciar() {
    if (rastreando) {
      return;
    }

    try {
      setLocations([]);
      setElapsedSeconds(0);
      setStartedAt(Date.now());

      const novaSubscription = await iniciarRastreamento((coords) => {
        setLocations((prev) => {
          const ultima = prev[prev.length - 1];

          // Evita adicionar pontos idênticos enviados pelo emulador.
          if (
            ultima &&
            ultima.latitude === coords.latitude &&
            ultima.longitude === coords.longitude
          ) {
            return prev;
          }

          return [...prev, coords];
        });
      });

      setSubscription(novaSubscription);
    } catch (error) {
      setStartedAt(null);
      setElapsedSeconds(0);
      Alert.alert(
        'Erro de localização',
        error?.message || 'Não foi possível iniciar o rastreamento.'
      );
    }
  }

  function parar() {
    if (!subscription) {
      return;
    }

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

    return [horas, minutos, segundosRestantes]
      .map((valor) => String(valor).padStart(2, '0'))
      .join(':');
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.titulo, { color: cores.texto }]}>
        Minha corrida
      </Text>

      <Text style={[styles.status, { color: cores.secundario }]}>
        {rastreando ? 'Rastreamento em andamento' : 'Pronto para começar'}
      </Text>

      <Button onStart={iniciar} onStop={parar} />

      <MapComponent locations={locations} />

      <View style={styles.metrics}>
        <View style={[styles.metricCard, { backgroundColor: cores.superficie, borderColor: cores.borda }]}>
          <Text style={[styles.metricLabel, { color: cores.secundario }]}>DISTÂNCIA</Text>
          <Text style={[styles.metricValue, { color: '#1769e0' }]}>
            {(distancia / 1000).toFixed(2)} km
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: cores.superficie, borderColor: cores.borda }]}>
          <Text style={[styles.metricLabel, { color: cores.secundario }]}>TEMPO</Text>
          <Text style={[styles.metricValue, { color: cores.texto }]}>
            {formatarTempo(elapsedSeconds)}
          </Text>
        </View>
      </View>

      <Text style={[styles.coordenadasTitulo, { color: cores.texto }]}>
        Coordenadas capturadas: {locations.length}
      </Text>

      <CoordinateList locations={locations} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  metrics: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  coordenadasTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 4,
  },
});
