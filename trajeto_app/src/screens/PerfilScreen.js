import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function PerfilScreen({ cores, escuro, onToggleTheme }) {
  return (
    <View style={[styles.container, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.title, { color: cores.texto }]}>Perfil</Text>
      <Text style={[styles.subtitle, { color: cores.secundario }]}>Personalize sua experiência no Trajeto.</Text>

      <View style={[styles.card, { backgroundColor: cores.superficie, borderColor: cores.borda }]}>
        <Text style={[styles.label, { color: cores.texto }]}>Tema do aplicativo</Text>
        <Text style={[styles.mode, { color: cores.secundario }]}>{escuro ? 'Azul e preto' : 'Azul e branco'}</Text>

        <Pressable style={styles.button} onPress={onToggleTheme}>
          <Text style={styles.buttonText}>{escuro ? 'Usar tema claro' : 'Usar tema escuro'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 16, marginTop: 8, marginBottom: 24 },
  card: { borderRadius: 16, borderWidth: 1, padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold' },
  mode: { marginTop: 8, marginBottom: 18 },
  button: { backgroundColor: '#1769e0', borderRadius: 10, padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});