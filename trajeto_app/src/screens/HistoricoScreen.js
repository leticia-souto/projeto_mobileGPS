import { View, Text, StyleSheet } from 'react-native';

export default function HistoricoScreen({ cores }) {
  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.title, { color: cores.texto }]}>Histórico</Text>
      <View style={[styles.empty, { backgroundColor: cores.superficie, borderColor: cores.borda }]}>
        <Text style={[styles.emptyTitle, { color: cores.texto }]}>Nenhuma corrida salva</Text>
        <Text style={[styles.emptyText, { color: cores.secundario }]}>Suas atividades finalizadas aparecerão aqui.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 20 },
  empty: { borderRadius: 16, borderWidth: 1, padding: 24 },
  emptyTitle: { fontSize: 19, fontWeight: 'bold' },
  emptyText: { fontSize: 15, marginTop: 8, lineHeight: 22 },
});