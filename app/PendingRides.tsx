import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconContainer from '@/components/IconContainer';

interface Ride {
  id: number;
  origin: string;
  destination: string;
  num_persons: number;
  start_time: string;
  end_time: string;
  driver: string | null;
  status: string;
}

export default function PendingRides() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user from AsyncStorage and set the username
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
    // Fetch all rides from the API
    axios.get('https://carpooling-be.onrender.com/api/rides/')
      .then(response => {
        // Filter the rides to show only those with a pending status
        const pendingRides = response.data.filter((ride: Ride) => ride.status === 'pending');
        setRides(pendingRides);
      })
      .catch(error => {
        console.error('Error fetching rides:', error);
      });
  }, []);

  const handleTakeRide = (rideId: number) => {
    if (!username) {
      console.error('Driver username not found.');
      return;
    }

    // Get the current time and format it as an ISO string
    const currentTime = new Date().toISOString();

    // Update the ride status and assign the driver and start time
    axios.patch(`https://carpooling-be.onrender.com/api/rides/${rideId}/`, { 
      status: 'active', 
      driver: username, 
      start_time: currentTime 
    })
      .then(() => {
        // Update the local state to reflect the change
        setRides(prevRides => prevRides.filter(ride => ride.id !== rideId));
      })
      .catch(error => {
        console.error('Error taking the ride:', error);
      });
  };

  const renderItem = ({ item }: { item: Ride }) => (
    <View style={styles.rideContainer}>
      <Text>Origin: {item.origin}</Text>
      <Text>Destination: {item.destination}</Text>
      <Text>Number of Persons: {item.num_persons}</Text>
      <Text>Start Time: {item.start_time}</Text>
      <Text>End Time: {item.end_time}</Text>
      <Button title="Take Ride" onPress={() => handleTakeRide(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Rides</Text>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent} // Adjust padding if needed
      />

      <IconContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rideContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  flatListContent: {
    paddingBottom: 80, // Adjust based on the height of IconContainer
  },
});
