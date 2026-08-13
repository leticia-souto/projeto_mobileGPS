import { useState } from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return <HomeScreen />;
}
