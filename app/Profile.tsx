import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import IconContainer from '../components/IconContainer'; // Import the IconContainer
import axios from 'axios';

// Define the Ride interface
interface Ride {
  id: number; // or string, depending on your API response
  origin: string;
  destination: string;
  driver: string | null;
  passenger: string | null;
  price: number; // or string, depending on your API response
  status: 'pending' | 'active' | 'completed'; // Adjust as necessary
  start_time: string; // Adjust based on your API response
  end_time: string; // Adjust based on your API response
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]); // Use the Ride type for rideHistory
  const [pendingRides, setPendingRides] = useState<Ride[]>([]);
  const [activeRides, setActiveRides] = useState<Ride[]>([]);
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    const fetchRideHistory = async () => {
      try {
        const response = await axios.get('https://carpooling-be.onrender.com/api/rides/');
        const rides: Ride[] = response.data; // Specify the rides type

        // Filter rides based on user's username
        const userRides = rides.filter(ride => ride.driver === user?.username || ride.passenger === user?.username);

        // Categorize rides
        setPendingRides(userRides.filter(ride => ride.status === 'pending'));
        setActiveRides(userRides.filter(ride => ride.status === 'active'));
        setCompletedRides(userRides.filter(ride => ride.status === 'completed'));
      } catch (error) {
        console.error('Failed to load ride history', error);
      }
    };

    fetchUserData();
    fetchRideHistory();
  }, [user?.username]); // Re-fetch rides when username changes

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      // Navigate to sign-in screen after sign out
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  // Specify the ride parameter type in the function signature
  const handleRidePress = (ride: Ride) => {
    Alert.alert(
      'Ride Details',
      `ID: ${ride.id}\nOrigin: ${ride.origin}\nDestination: ${ride.destination}\nPrice: ${ride.price}\nStatus: ${ride.status}\nStart Time: ${ride.start_time}\nEnd Time: ${ride.end_time}`,
      [{ text: 'OK' }]
    );
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/images/icons8-user-100.png')} style={styles.avatar} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
        <Text style={styles.email}>Email: {user.email}</Text>
        <Text style={styles.info}>Phone: {user.phone_number}</Text>
        <Text style={styles.info}>Address: {user.address}</Text>
        <Text style={styles.info}>NID/Passport: {user.nid_passport}</Text>
        <View style={styles.buttonRow}>
          <Link href="/UpdateProfile" style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Update Profile</Text>
          </Link>
          <Link href="/SignIn" onPress={handleSignOut} style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Logout</Text>
          </Link>
        </View>

        <Text style={styles.sectionTitle}>Ride History</Text>

        {/* Render Pending Rides */}
        <Text style={styles.subSectionTitle}>Pending Rides</Text>
        {pendingRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}

        {/* Render Active Rides */}
        <Text style={styles.subSectionTitle}>Active Rides</Text>
        {activeRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}

        {/* Render Completed Rides */}
        <Text style={styles.subSectionTitle}>Completed Rides</Text>
        {completedRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <IconContainer /> {/* Add IconContainer here */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 20,
  },
  username: { 
    fontSize: 14, 
    marginBottom: 20, 
    color: 'rgb(228, 15, 164)',
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#333',
  },
  email: { 
    fontSize: 16, 
    marginBottom: 5, 
    color: '#555',
  },
  info: { 
    fontSize: 16, 
    marginBottom: 5, 
    color: '#777',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 30, 
    marginBottom: 10, 
    color: '#333',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: '#333',
  },
  rideItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  linkButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
