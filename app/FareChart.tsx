import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconContainer from '../components/IconContainer'; // Import the IconContainer component

export default function FareChartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fare Chart</Text>
      <Text style={styles.text}>
        Our fare chart is designed to be simple and fair. Fares are calculated based on the distance traveled and the number of passengers. 
        Save money and reduce your carbon footprint by carpooling!
      </Text>
      <View style={styles.fareDetails}>
        <Text style={styles.fareDetailText}>Distance (km): Rate per km</Text>
        <Text style={styles.fareDetailText}>1-10 km: $0.50/km</Text>
        <Text style={styles.fareDetailText}>10-20 km: $0.45/km</Text>
        <Text style={styles.fareDetailText}>20+ km: $0.40/km</Text>
      </View>
      <IconContainer /> {/* Include the IconContainer for navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  fareDetails: {
    marginVertical: 20,
  },
  fareDetailText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});
