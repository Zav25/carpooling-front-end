import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconContainer from '../components/IconContainer'; // Import the IconContainer component

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        Welcome to Carpooling! Our app helps you find and share rides with others. 
        Whether you're a driver or a passenger, you can easily connect with others for a convenient, 
        eco-friendly, and cost-effective travel experience.
      </Text>
      <IconContainer /> {/* Include the IconContainer for navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
});
