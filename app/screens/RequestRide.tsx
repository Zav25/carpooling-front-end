import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>Request a Ride</Text>
      <TextInput
        placeholder="Where do you want to go?"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />
      <TextInput
        placeholder="Number of persons"
        value={numPersons}
        onChangeText={setNumPersons}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Request Ride" onPress={handleRequestRide} />
      <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});
