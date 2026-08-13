import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function WelcomeScreen({ onStart }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>⌖</Text>
      </View>

      <Text style={styles.title}>Bem-vindo ao Trajeto</Text>

      <Text style={styles.description}>
        Registre seu percurso, acompanhe sua localização e veja a distância e o tempo da sua atividade.
      </Text>

      <Pressable style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f5f8ff',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: '#1a73e8',
  },
  icon: {
    color: '#fff',
    fontSize: 58,
  },
  title: {
    color: '#172b4d',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    color: '#53627a',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 35,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1a73e8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
