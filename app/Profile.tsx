import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import IconContainer from '../components/IconContainer';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

interface Ride {
  id: number;
  origin: string;
  destination: string;
  driver: string | null;
  passenger: string | null;
  price: number;
  status: 'pending' | 'active' | 'completed' | 'canceled';
  start_time: string;
  end_time: string;
  num_persons: number;
}

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
  const [user, setUser] = useState<User | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
        await fetchRideHistory(parsedUser.username);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRideHistory = async (username: string) => {
    if (!username) return;
    try {
      const response = await axios.get('https://carpooling-be.onrender.com/api/rides/');
      const allRides: Ride[] = response.data;
      const userRides = allRides.filter(ride => ride.driver === username || ride.passenger === username);
      setRides(userRides);
    } catch (error) {
      console.error('Failed to load ride history', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      router.replace('/SignIn');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const handleRidePress = (ride: Ride) => {
    setSelectedRide(ride);
  };

  const handleCloseDetails = () => {
    setSelectedRide(null);
  };

  const handleCancelRide = async () => {
    if (selectedRide) {
      try {
        await axios.patch(`https://carpooling-be.onrender.com/api/rides/${selectedRide.id}/`, {
          status: 'canceled',
          price: 0,
        });
        await fetchRideHistory(user?.username || '');
        handleCloseDetails();
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
        const durationInMinutes = Math.round((currentTime.getTime() - startTime.getTime()) / (1000 * 60));
        let price = 50 + selectedRide.num_persons * durationInMinutes * 3;
        price = Math.min(price, 9999);
        
        await axios.patch(`https://carpooling-be.onrender.com/api/rides/${selectedRide.id}/`, {
          status: 'completed',
          end_time: currentTime.toISOString(),
          price: price,
        });
        await fetchRideHistory(user?.username || '');
        handleCloseDetails();

        router.replace('/Pay');
      } catch (error) {
        console.error('Failed to complete ride:', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E40FA4" />
      </View>
    );
  }

  if (!user) {
    return <Text>No user data available</Text>;
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/images/icons8-user-100.png')} style={styles.avatar} />
          <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>

        <View style={styles.infoContainer}>
          <InfoItem icon="mail" text={user.email} />
          <InfoItem icon="call" text={user.phone_number} />
          <InfoItem icon="location" text={user.address} />
          <InfoItem icon="card" text={user.nid_passport} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/UpdateProfile')}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Ride History</Text>
        {rides.map(ride => (
          <TouchableOpacity key={ride.id} style={styles.rideItem} onPress={() => handleRidePress(ride)}>
            <View style={styles.rideHeader}>
              <Text style={styles.rideId}>Ride #{ride.id}</Text>
              <Text style={[styles.rideStatus, styles[ride.status]]}>{ride.status}</Text>
            </View>
            <Text style={styles.rideInfo}>{ride.origin} → {ride.destination}</Text>
            <Text style={styles.ridePrice}>৳{ride.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedRide && (
        <View style={styles.overlay}>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Ride Details</Text>
            <ScrollView style={styles.detailsScroll}>
              <DetailItem label="ID" value={selectedRide.id.toString()} />
              <DetailItem label="Origin" value={selectedRide.origin} />
              <DetailItem label="Destination" value={selectedRide.destination} />
              <DetailItem label="Driver" value={selectedRide.driver || 'N/A'} />
              <DetailItem label="Passenger" value={selectedRide.passenger || 'N/A'} />
              <DetailItem label="Price" value={`৳${selectedRide.price}`} />
              <DetailItem label="Status" value={selectedRide.status} />
              <DetailItem label="Start Time" value={new Date(selectedRide.start_time).toLocaleString()} />
              <DetailItem label="End Time" value={selectedRide.end_time ? new Date(selectedRide.end_time).toLocaleString() : 'N/A'} />
            </ScrollView>
            <View style={styles.detailsButtons}>
              <TouchableOpacity style={styles.detailButton} onPress={handleCloseDetails}>
                <Text style={styles.detailButtonText}>Close</Text>
              </TouchableOpacity>
              {selectedRide.status === 'pending' && (
                <TouchableOpacity style={[styles.detailButton, styles.cancelButton]} onPress={handleCancelRide}>
                  <Text style={styles.detailButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
              {selectedRide.status === 'active' && (
                <TouchableOpacity style={[styles.detailButton, styles.completeButton]} onPress={handleCompleteRide}>
                  <Text style={styles.detailButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
              {selectedRide.status === 'completed' && (
                <Link href="/Pay" asChild>
                  <TouchableOpacity style={[styles.detailButton, styles.payButton]}>
                    <Text style={styles.detailButtonText}>Pay</Text>
                  </TouchableOpacity>
                </Link>
              )}
            </View>
          </View>
        </View>
      )}

      <IconContainer />
    </View>
  );
};

const InfoItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon as any} size={24} color="#E40FA4" style={styles.infoIcon} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#E40FA4',
    marginTop: 5,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#E40FA4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  rideItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rideId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rideStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  pending: { color: '#F0AD4E' },
  active: { color: '#5BC0DE' },
  completed: { color: '#5CB85C' },
  canceled: { color: '#D9534F' },
  rideInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E40FA4',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  detailsScroll: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  detailsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#E40FA4',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  completeButton: {
    backgroundColor: '#4CD964',
  },
  payButton: {
    backgroundColor: '#007AFF',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;