import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconContainer from '../components/IconContainer'; // Adjust the import path as needed
import { Link, useRouter } from 'expo-router';
import MapScreen from '@/components/MapScreen';

export default function PostRide() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState({ latitude: 23.7368, longitude: 90.3965 }); // Shahbag, Dhaka
  const [to, setTo] = useState({ latitude: 23.7935, longitude: 90.4066 }); // Banani, Dhaka
  const [capacity, setCapacity] = useState('');

  const router = useRouter();

  const handlePostRide = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      const { username } = JSON.parse(userData);

      const newRide = {
        driver: username,
        origin,
        destination,
        num_persons: Number(capacity),
      };

      // Make the API call to create a new ride
      await axios.post('https://carpooling-be.onrender.com/api/rides/', newRide);
      Alert.alert('Success', 'Ride posted successfully');
      // Optionally reset form fields
      setOrigin('');
      setDestination('');
      setCapacity('');

      router.push('/Profile');
    } catch (error) {
      Alert.alert('Error', 'Failed to post ride, please try again');
      console.error('Error posting ride:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Post a Ride</Text>
        <MapScreen
          origin={from}
          destination={to} 
        />
        <TextInput
          placeholder="Starting location"
          value={origin}
          onChangeText={setOrigin}
          style={[styles.input, styles.firstInput]}
        />
        <TextInput
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
        />
        <TextInput
          placeholder="Capacity"
          value={capacity}
          onChangeText={setCapacity}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={[styles.postRideButton, styles.postRideButtonMargin]} onPress={handlePostRide}>
          <Text style={styles.postRideText}>Post Ride</Text>
        </TouchableOpacity>

        <Link href="/PendingRides" style={styles.viewPostedRidesButton}>
          <Text style={styles.viewPostedRidesText}>View Requested Rides</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  postRideButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  postRideButtonMargin: {
    marginTop: 20,
  },
  postRideText: {
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
