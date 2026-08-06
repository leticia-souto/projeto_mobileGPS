import * as Location from 'expo-location';

async function pedirPermissao() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    alert('Permissão negada');
    return false;
  }

  return true;

}

const [locations, setLocations] = useState([]);
const [subscription, setSubscription] = useState(null);

async function iniciarRastreamento() {
  const permitido = await pedirPermissao();

  if (!permitido) return;

  const sub = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 5,
    },
    (location) => {
      setLocations((prev) => [...prev, location.coords]);
    }
  );

  setSubscription(sub);

  function pararRastreamento() {
  if (subscription) {
    subscription.remove();
    setSubscription(null);
   }
 }
}

import MapView, { Polyline } from 'react-native-maps';

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  <Polyline
    coordinates={locations}
    strokeWidth={5}
    strokeColor="blue"
  />
</MapView>