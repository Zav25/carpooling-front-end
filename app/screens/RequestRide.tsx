import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type RequestRideScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RequestRide'>;

export default function RequestRideScreen() {
  const navigation = useNavigation<RequestRideScreenNavigationProp>();
  const [destination, setDestination] = useState('');
  const [numPersons, setNumPersons] = useState('');

  const handleRequestRide = () => {
    // Implement ride request functionality here
    alert('Ride requested successfully');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Request a Ride</Text>
        <TouchableOpacity style={styles.viewProfileButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Where do you want to go?"
        value={destination}
        onChangeText={setDestination}
        style={[styles.input, styles.firstInput]} // Apply additional styles to the first input
      />
      <TextInput
        placeholder="Number of persons"
        value={numPersons}
        onChangeText={setNumPersons}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={[styles.letsGoButton, styles.letsGoButtonMargin]} onPress={handleRequestRide}>
        <Text style={styles.letsGoText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  viewProfileButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewProfileText: { color: 'white', fontSize: 12 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  firstInput: {
    marginTop: 100, // Add top margin specifically for the first input
  },
  letsGoButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  letsGoButtonMargin: {
    marginTop: 20, // Add top margin specifically for the "Let's Go" button
  },
  letsGoText: { color: 'white', fontSize: 14 },
});
