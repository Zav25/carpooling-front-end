import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import IconContainer from '../components/IconContainer'; // Import the IconContainer component

export default function FareChartScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Fare Chart</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Motorbike</Text>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>07:00 AM - 10:30 AM</Text>
            <Text style={styles.farePrice}>35</Text>
          </View>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>10:30 AM - 04:00 PM</Text>
            <Text style={styles.farePrice}>25</Text>
          </View>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>04:00 PM - 08:30 PM</Text>
            <Text style={styles.farePrice}>35</Text>
          </View>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>08:30 PM - 12:00 AM</Text>
            <Text style={styles.farePrice}>30</Text>
          </View>
          <Text style={styles.updateNote}>Fare Updated on 12th October, 2024</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Car</Text>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>07:00 AM - 10:30 AM</Text>
            <Text style={styles.farePrice}>75</Text>
          </View>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>10:30 AM - 04:00 PM</Text>
            <Text style={styles.farePrice}>65</Text>
          </View>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>04:00 PM - 08:30 PM</Text>
            <Text style={styles.farePrice}>75</Text>
          </View>
          <View style={styles.fareItem}>
            <Text style={styles.fareTime}>08:30 PM - 12:00 AM</Text>
            <Text style={styles.farePrice}>60</Text>
          </View>
          <Text style={styles.updateNote}>Fare Updated on 12th October, 2024</Text>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Note: Fare may be updated monthly. Make sure to re-check the fare chart at the beginning of every month. Fare may change as per extra busy hours or traffic.
          </Text>
        </View>
      </ScrollView>
      <IconContainer /> {/* Include the IconContainer for navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // To make space for the fixed IconContainer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'green',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
  },
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fareTime: {
    fontSize: 16,
    color: '#555',
  },
  farePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  updateNote: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'right',
  },
  notice: {
    marginTop: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 10,
  },
  noticeText: {
    fontSize: 14,
    color: '#00796b',
    textAlign: 'center',
  },
});

