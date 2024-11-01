import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconContainer from '../components/IconContainer';
import { useRouter, Link } from 'expo-router';
import MapScreen from '../components/MapScreen';

export default function RequestRideScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState({ latitude: 23.7368, longitude: 90.3965 }); // Shahbag, Dhaka
  const [to, setTo] = useState({ latitude: 23.7935, longitude: 90.4066 }); // Banani, Dhaka
  const [numPersons, setNumPersons] = useState('');
  const router = useRouter();

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

      await axios.post('https://carpooling-be.onrender.com/api/rides/', rideRequest);
      Alert.alert('Success', 'Ride requested successfully');
      setOrigin('');
      setDestination('');
      setNumPersons('');
      router.push('/Profile');
    } catch (error) {
      Alert.alert('Error', 'Failed to request ride, please try again');
      console.error('Error requesting ride:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Request a Ride</Text>
        <MapScreen
          origin={from}
          destination={to} 
        />
        <TextInput
          placeholder="Where are you?"
          value={origin}
          onChangeText={setOrigin}
          style={[styles.input, styles.firstInput]}
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
        <Link href="/PostedRides" style={styles.viewPostedRidesButton}>
          <Text style={styles.viewPostedRidesText}>View Posted Rides</Text>
        </Link>
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
    marginTop: 20,
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
  viewPostedRidesButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  viewPostedRidesText: {
    color: '#007bff',
    fontSize: 16,
  },
});
