import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
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
  status: 'pending' | 'active' | 'completed' | 'canceled'; // Adjust as necessary
  start_time: string; // Adjust based on your API response
  end_time: string; // Adjust based on your API response
  num_persons: number;
}

// Define the User interface
interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  nid_passport: string;
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Use User interface
  const [pendingRides, setPendingRides] = useState<Ride[]>([]);
  const [activeRides, setActiveRides] = useState<Ride[]>([]);
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  const [canceledRides, setCanceledRides] = useState<Ride[]>([]);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null); // State for selected ride

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser: User = JSON.parse(userData); // Parse user data
          setUser(parsedUser);
          fetchRideHistory(parsedUser.username); // Fetch rides after setting user
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchRideHistory = async (username: string) => {
    if (!username) return; // Prevent fetching if username is not available

    try {
      const response = await axios.get('https://carpooling-be.onrender.com/api/rides/');
      const rides: Ride[] = response.data;

      const userRides = rides.filter(ride => ride.driver === username || ride.passenger === username);

      setPendingRides(userRides.filter(ride => ride.status === 'pending'));
      setActiveRides(userRides.filter(ride => ride.status === 'active'));
      setCompletedRides(userRides.filter(ride => ride.status === 'completed'));
      setCanceledRides(userRides.filter(ride => ride.status === 'canceled'));
    } catch (error) {
      console.error('Failed to load ride history', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      // Navigate to sign-in screen after sign out
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const handleRidePress = (ride: Ride) => {
    setSelectedRide(ride); // Set the selected ride to show its details
  };

  const handleCloseDetails = () => {
    setSelectedRide(null); // Close the ride details view
  };

  const handleCancelRide = async () => {
    if (selectedRide) {
      try {
        await axios.patch(`https://carpooling-be.onrender.com/api/rides/${selectedRide.id}/`, {
          status: 'canceled', // Change the status to cancelled
          price: 0,
        });
        fetchRideHistory(user?.username || ''); // Refresh ride history
        handleCloseDetails(); // Close details view
      } catch (error) {
        console.error('Failed to cancel ride', error);
      }
    }
  };

  const handleCompleteRide = async () => {
    if (selectedRide) {
      try {
        const currentTime = new Date();
        const startTime = new Date(selectedRide.start_time);
        const durationInMinutes = Math.round((currentTime.getTime() - startTime.getTime()) / (1000 * 60)); // Convert milliseconds to minutes
  
        let price = selectedRide.num_persons * durationInMinutes * 3;

        price = price > 9999 ? 9999: price;

        console.log(price);
        
        await axios.patch(`https://carpooling-be.onrender.com/api/rides/${selectedRide.id}/`, {
          status: 'completed',
          end_time: currentTime.toISOString(),
          price: price,
        });

  
        fetchRideHistory(user?.username || ''); // Refresh ride history
        handleCloseDetails(); // Close details view
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to complete ride:', error.response?.data);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    }
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

        <Text style={styles.subSectionTitle}>Pending Rides</Text>
        {pendingRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.subSectionTitle}>Active Rides</Text>
        {activeRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.subSectionTitle}>Completed Rides</Text>
        {completedRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.subSectionTitle}>Canceled Rides</Text>
        {canceledRides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <Text>ID: {ride.id}</Text>
            <Text>Origin: {ride.origin}</Text>
            <Text>Destination: {ride.destination}</Text>
            <Text>Price: {ride.price}</Text>
          </TouchableOpacity>
        ))}

        {selectedRide && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Ride Details</Text>
            <Text>ID: {selectedRide.id}</Text>
            <Text>Origin: {selectedRide.origin}</Text>
            <Text>Destination: {selectedRide.destination}</Text>
            <Text>Price: {selectedRide.price}</Text>
            <Text>Status: {selectedRide.status}</Text>
            <Text>Start Time: {selectedRide.start_time}</Text>
            <Text>End Time: {selectedRide.end_time}</Text>

            <View style={styles.detailsButtons}>
              <Button title="Close" onPress={handleCloseDetails} />
              <Button title="Cancel" onPress={handleCancelRide} />
              <Button title="Complete" onPress={handleCompleteRide} />
            </View>
          </View>
        )}
      </ScrollView>
      <IconContainer />
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
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  linkButton: {
    padding: 10,
    backgroundColor: 'rgb(228, 15, 164)',
    borderRadius: 5,
  },
  linkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  rideItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
    width: '100%',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    elevation: 4,
    position: 'absolute',
    top: '20%',
    left: '5%',
    right: '5%',
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default ProfileScreen;
