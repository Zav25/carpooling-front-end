import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://carpooling-be.onrender.com/api/signin/', {
        username,
        password,
      });
      // Save user data to local storage
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      // Navigate to the RequestRide screen
      navigation.navigate('RequestRide');
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/carpooling-cover.png')} style={styles.image} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>
          Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  buttonContainer: {
    marginVertical: 15,
    width: '60%',
    alignSelf: 'center',
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#007BFF',
  },
  linkBold: {
    fontWeight: 'bold',
  },
});

