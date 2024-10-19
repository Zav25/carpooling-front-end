import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconContainer from '../components/IconContainer'; // Adjust the import path as needed

export default function RequestRideScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [numPersons, setNumPersons] = useState('');

  const handleRequestRide = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      const { username } = JSON.parse(userData);

      const rideRequest = {
        passenger: username,
        origin,
        destination,
        num_persons: Number(numPersons),
      };

      // Make the API call to create a ride request
      await axios.post('https://carpooling-be.onrender.com/api/rides/', rideRequest);
      Alert.alert('Success', 'Ride requested successfully');
      // Optionally reset form fields
      setOrigin('');
      setDestination('');
      setNumPersons('');
    } catch (error) {
      Alert.alert('Error', 'Failed to request ride, please try again');
      console.error('Error requesting ride:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require('../assets/images/carpooling-cover.png')}
          style={styles.coverImage}
        />
        <Text style={styles.title}>Request a Ride</Text>
        <TextInput
          placeholder="Where are you?"
          value={origin}
          onChangeText={setOrigin}
          style={[styles.input, styles.firstInput]} // Apply additional styles to the first input
        />
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
        <TouchableOpacity style={[styles.letsGoButton, styles.letsGoButtonMargin]} onPress={handleRequestRide}>
          <Text style={styles.letsGoText}>Let's Go</Text>
        </TouchableOpacity>
      </ScrollView>
      <IconContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  firstInput: {
    marginTop: 20, // Adjust the margin for the first input
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
    marginTop: 20,
  },
  letsGoText: {
    color: 'white',
    fontSize: 14,
  },
});

