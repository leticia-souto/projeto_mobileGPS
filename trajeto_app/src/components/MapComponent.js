import { useEffect, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';

export default function MapComponent({ locations }) {
  const mapRef = useRef(null);
  const ultimaLocalizacao = locations[locations.length - 1];

  useEffect(() => {
    if (!ultimaLocalizacao || !mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: ultimaLocalizacao.latitude,
        longitude: ultimaLocalizacao.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      800
    );
  }, [ultimaLocalizacao]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation={true}
      followsUserLocation={false}
    >
      {ultimaLocalizacao && (
        <Marker
          coordinate={ultimaLocalizacao}
          title="Minha posição"
          description="Localização atual"
        />
      )}

      {locations.length > 1 && (
        <Polyline
          coordinates={locations}
          strokeWidth={5}
          strokeColor="blue"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 400,
  },
});
