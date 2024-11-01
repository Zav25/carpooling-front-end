import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

interface MapScreenProps {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}

export default function MapScreen({ origin, destination }: MapScreenProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(origin.latitude - destination.latitude) + 0.05,
          longitudeDelta: Math.abs(origin.longitude - destination.longitude) + 0.05,
        }}
      >
        <Marker coordinate={origin} title="Origin" />
        <Marker coordinate={destination} title="Destination" />

        <Polyline
          coordinates={[origin, destination]}
          strokeColor="#007bff"
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
});
