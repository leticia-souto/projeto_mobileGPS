import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoricoScreen({ cores, corridas = [] }) {
  return (
    <ScrollView
      style={{ backgroundColor: cores.fundo }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: cores.texto }]}>Histórico</Text>

      {corridas.length === 0 ? (
        <View
          style={[
            styles.empty,
            {
              backgroundColor: cores.superficie,
              borderColor: cores.borda,
            },
          ]}
        >
          <Ionicons name="footsteps-outline" size={44} color="#1769e0" />

          <Text style={[styles.emptyTitle, { color: cores.texto }]}>
            Nenhuma corrida salva
          </Text>

          <Text style={[styles.emptyText, { color: cores.secundario }]}>
            Finalize e salve uma corrida para vê-la aqui.
          </Text>
        </View>
      ) : (
        corridas.map((corrida, index) => (
          <View
            key={`${corrida.data || 'corrida'}-${index}`}
            style={[
              styles.card,
              {
                backgroundColor: cores.superficie,
                borderColor: cores.borda,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="flag-outline" size={24} color="#1769e0" />

              <Text style={[styles.date, { color: cores.secundario }]}>
                {corrida.data || 'Data não informada'}
              </Text>
            </View>

            <Text style={styles.distance}>
              {((corrida.distancia || 0) / 1000).toFixed(2)} km
            </Text>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={19} color="#1769e0" />
              <Text style={[styles.infoText, { color: cores.texto }]}>
                Tempo: {formatarTempo(corrida.tempo)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={19} color="#1769e0" />
              <Text style={[styles.infoText, { color: cores.secundario }]}>
                Pontos registrados: {corrida.locations?.length || 0}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

function formatarTempo(segundos = 0) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return [horas, minutos, segundosRestantes]
    .map((valor) => String(valor).padStart(2, '0'))
    .join(':');
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  empty: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    marginLeft: 10,
  },
  distance: {
    color: '#1769e0',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
