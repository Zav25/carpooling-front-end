import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_driver: boolean;
  phone_number: string;
  nid_passport: string;
  address: string;
}

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from API
    fetch('http://127.0.0.1:8000/api/users/')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.username}</Text>
      <Text>{item.email}</Text>
      <Text>{item.is_driver ? 'Driver' : 'Passenger'}</Text>
      <Text>{item.phone_number}</Text>
      <Text>{item.address}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={renderUserItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
