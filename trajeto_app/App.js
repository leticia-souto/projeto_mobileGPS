import { useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import InicioScreen from './src/screens/InicioScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Tab = createBottomTabNavigator();
const azul = '#1769e0';

const temaClaro = {
  fundo: '#f5f8ff', superficie: '#ffffff', texto: '#14213d',
  secundario: '#60708f', borda: '#dbe5f5',
};

const temaEscuro = {
  fundo: '#07111f', superficie: '#0d1b2e', texto: '#ffffff',
  secundario: '#b6c4d8', borda: '#243b5a',
};

export default function App() {
  const [entrou, setEntrou] = useState(false);
  const [escuro, setEscuro] = useState(false);
  const [corridas, setCorridas] = useState([]);
  const cores = escuro ? temaEscuro : temaClaro;

  if (!entrou) {
    return <WelcomeScreen onStart={() => setEntrou(true)} />;
  }

  const icones = {
    Início: 'home-outline',
    Correr: 'navigate-outline',
    Histórico: 'time-outline',
    Perfil: 'person-outline',
  };

  return (
    <NavigationContainer theme={escuro ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: azul },
          headerTintColor: '#fff',
          tabBarActiveTintColor: azul,
          tabBarInactiveTintColor: escuro ? '#94a3b8' : '#718096',
          tabBarStyle: { backgroundColor: cores.superficie },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icones[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Início" options={{ title: 'Início' }}>
          {() => <InicioScreen cores={cores} corridas={corridas} />}
        </Tab.Screen>
        <Tab.Screen name="Correr" options={{ title: 'Correr' }}>
          {() => (
            <HomeScreen
              cores={cores}
              onSaveRun={(corrida) => setCorridas((lista) => [corrida, ...lista])}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Histórico" options={{ title: 'Histórico' }}>
          {() => <HistoricoScreen cores={cores} corridas={corridas} />}
        </Tab.Screen>
        <Tab.Screen name="Perfil" options={{ title: 'Perfil' }}>
          {() => (
            <PerfilScreen
              cores={cores}
              escuro={escuro}
              onToggleTheme={() => setEscuro((valor) => !valor)}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}