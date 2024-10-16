import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

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

export default function SignUpScreen() {
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

  const handleInputChange = (name: keyof FormState, value: string | boolean) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      await axios.post('https://carpooling-be.onrender.com/api/users/', form);
      // Use router.push('/SignIn') if you want programmatic navigation after signup
    } catch (error) {
      alert('Error signing up, please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us and start your journey</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Link href="/SignIn" style={styles.link}>
        Already have an account? <Text style={styles.linkBold}>Sign In</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f4f8' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, marginBottom: 20, color: '#666' },
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
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#007BFF',
  },
  linkBold: {
    fontWeight: 'bold',
  },
});
