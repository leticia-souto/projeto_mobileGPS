import { View, Text, StyleSheet } from 'react-native';

export default function InicioScreen({ cores }) {
  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.greeting, { color: cores.secundario }]}>Olá, corredor!</Text>
      <Text style={[styles.title, { color: cores.texto }]}>Pronto para o próximo trajeto?</Text>

      <View style={[styles.card, { backgroundColor: cores.superficie, borderColor: cores.borda }]}>
        <Text style={[styles.cardTitle, { color: cores.texto }]}>Resumo de hoje</Text>
        <Text style={[styles.value, { color: '#1769e0' }]}>0,00 km</Text>
        <Text style={[styles.caption, { color: cores.secundario }]}>Nenhuma corrida registrada ainda</Text>
      </View>

      <View style={[styles.card, { backgroundColor: '#1769e0' }]}>
        <Text style={styles.blueTitle}>Comece uma corrida</Text>
        <Text style={styles.blueText}>Acompanhe distância, tempo e seu percurso no mapa.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  greeting: { fontSize: 16, marginTop: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 8, marginBottom: 24 },
  card: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  value: { fontSize: 36, fontWeight: 'bold', marginTop: 12 },
  caption: { marginTop: 4 },
  blueTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  blueText: { color: '#eaf2ff', fontSize: 15, marginTop: 8, lineHeight: 22 },
});