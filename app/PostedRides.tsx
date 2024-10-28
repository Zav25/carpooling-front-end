import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconContainer from '@/components/IconContainer';
import { useRouter } from 'expo-router';

interface Ride {
  id: number;
  origin: string;
  destination: string;
  num_persons: number;
  passenger: string | null;
  status: string;
}

export default function PostedRides() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => {
        if (user) {
          const parsedUser = JSON.parse(user);
          setUsername(parsedUser.username);
        }
      })
      .catch((error) => {
        console.error('Error fetching user from AsyncStorage:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://carpooling-be.onrender.com/api/rides/')
      .then(response => {
        const availableRides = response.data.filter(
          (ride: Ride) => ride.status === 'pending' && ride.passenger === null
        );
        setRides(availableRides);
      })
      .catch(error => {
        console.error('Error fetching rides:', error);
      });
  }, []);

  const handleTakeRide = (rideId: number) => {
    if (!username) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    const currentTime = new Date().toISOString();
    axios.patch(`https://carpooling-be.onrender.com/api/rides/${rideId}/`, {
      passenger: username,
      status: 'active',
      start_time: currentTime,
    })
      .then(() => {
        setRides(prevRides => prevRides.filter(ride => ride.id !== rideId));
        router.push('/Profile');
      })
      .catch(error => {
        console.error('Error taking the ride:', error);
        Alert.alert('Error', 'Failed to take the ride, please try again');
      });
  };

  const renderItem = ({ item }: { item: Ride }) => (
    <View style={styles.rideContainer}>
      <Text>Origin: {item.origin}</Text>
      <Text>Destination: {item.destination}</Text>
      <Text>Number of Persons: {item.num_persons}</Text>
      <Button title="Take Ride" onPress={() => handleTakeRide(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posted Rides</Text>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
      <IconContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  rideContainer: { marginBottom: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  flatListContent: { paddingBottom: 80 },
});
