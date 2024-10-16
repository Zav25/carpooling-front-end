import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormState {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_driver: boolean;
  phone_number: string;
  nid_passport: string;
  address: string;
  password: string;
}

export default function UpdateProfileScreen() {
  const [form, setForm] = useState<FormState>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_driver: false,
    phone_number: '',
    nid_passport: '',
    address: '',
    password: '',
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserId(parsedUser.id);
          setForm({
            username: parsedUser.username,
            first_name: parsedUser.first_name,
            last_name: parsedUser.last_name,
            email: parsedUser.email,
            is_driver: parsedUser.is_driver,
            phone_number: parsedUser.phone_number,
            nid_passport: parsedUser.nid_passport,
            address: parsedUser.address,
            password: '', // Password should be updated separately for security reasons
          });
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (name: keyof FormState, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  const handleUpdateProfile = async () => {
    if (!userId) {
      alert('User ID not found');
      return;
    }

    try {
      await axios.put(`https://carpooling-be.onrender.com/api/users/${userId}/`, form);
      alert('Profile updated successfully');
      // Use router.push('/Profile') if you want programmatic navigation after updating
    } catch (error) {
      alert('Error updating profile, please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Your Profile</Text>
      {Object.keys(form).map((key) => {
        if (key === 'is_driver') {
          return (
            <View key={key} style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Driver?</Text>
              <Switch
                value={form.is_driver}
                onValueChange={(value) => handleInputChange('is_driver', value)}
              />
            </View>
          );
        }
        return (
          <TextInput
            key={key}
            placeholder={key.replace('_', ' ')}
            value={form[key as keyof FormState].toString()}
            onChangeText={(value) => handleInputChange(key as keyof FormState, value)}
            style={styles.input}
            secureTextEntry={key === 'password'}
          />
        );
      })}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <Link href="/Profile" style={styles.link}>
        <Text style={styles.linkText}>Back to Profile</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f4f8' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: { fontSize: 16, color: '#333' },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: {
    marginTop: 20,
    alignSelf: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
