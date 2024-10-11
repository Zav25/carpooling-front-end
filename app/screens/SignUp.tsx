import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../types';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

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
  const navigation = useNavigation<SignUpScreenNavigationProp>();
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

  const handleInputChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      await axios.post('https://carpooling-be.onrender.com/api/users/', form);
      navigation.navigate('SignIn');
    } catch (error) {
      alert('Error signing up, please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {Object.keys(form).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          value={form[key as keyof FormState].toString()}
          onChangeText={(value) => handleInputChange(key as keyof FormState, value)}
          style={styles.input}
        />
      ))}
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});
