import * as Location from 'expo-location';

export async function pedirPermissao() {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  return status === 'granted';
}

export async function iniciarRastreamento(callback) {
  const permitido = await pedirPermissao();

  if (!permitido) {
    throw new Error('Permissão de localização negada.');
  }

  const localizacaoAtual = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  callback(localizacaoAtual.coords);

  const subscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 5,
    },
    (location) => {
      callback(location.coords);
    }
  );

  return subscription;
}

export function pararRastreamento(subscription) {
  if (subscription) {
    subscription.remove();
  }
}
