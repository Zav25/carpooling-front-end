import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [rideHistory, setRideHistory] = useState<any[]>([]);

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
        // Replace with your API call to fetch ride history for the user
        const historyData = [
          { date: '2024-10-01', from: 'Location A', to: 'Location B', price: '$15' },
          { date: '2024-10-05', from: 'Location C', to: 'Location D', price: '$20' },
        ];
        setRideHistory(historyData);
      } catch (error) {
        console.error('Failed to load ride history', error);
      }
    };

    fetchUserData();
    fetchRideHistory();
  }, []);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      // Navigate to sign-in screen after sign out
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/user.png')} style={styles.avatar} />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      <Text style={styles.email}>Email : {user.email}</Text>
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
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>From</Text>
          <Text style={styles.tableHeaderText}>To</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
        </View>
        {rideHistory.map((ride, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{ride.date}</Text>
            <Text style={styles.tableCell}>{ride.from}</Text>
            <Text style={styles.tableCell}>{ride.to}</Text>
            <Text style={styles.tableCell}>{ride.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F9F9F9' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  username: { fontSize: 14, marginBottom: 20, color: 'rgb(228, 15, 164)' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  email: { fontSize: 16, marginBottom: 5, color: '#555' },
  info: { fontSize: 16, marginBottom: 5, color: '#777' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 10, color: '#333' },
  table: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fff', marginTop: 10 },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableHeaderText: { fontWeight: 'bold', flex: 1, textAlign: 'center', color: '#555' },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  tableCell: { flex: 1, textAlign: 'center', color: '#555' },
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
