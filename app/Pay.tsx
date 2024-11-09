import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Pay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Ride ID: <Text style={styles.value}>12345</Text></Text>
        <Text style={styles.label}>Origin: <Text style={styles.value}>Downtown</Text></Text>
        <Text style={styles.label}>Destination: <Text style={styles.value}>Uptown</Text></Text>
        <Text style={styles.label}>Price: <Text style={styles.value}>$25.00</Text></Text>
      </View>

      <TextInput 
        style={styles.input}
        placeholder="Enter Payment Method"
        placeholderTextColor="#888"
      />

      <TextInput 
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Expiry Date"
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="CVV"
          secureTextEntry
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 30,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Pay;
