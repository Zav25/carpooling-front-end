import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const PaymentMethodButton = ({ method, icon, label }) => (
    <TouchableOpacity
      style={[
        styles.methodButton,
        paymentMethod === method && styles.selectedMethodButton
      ]}
      onPress={() => setPaymentMethod(method)}
    >
      <Ionicons name={icon} size={24} color={paymentMethod === method ? '#fff' : '#333'} />
      <Text style={[
        styles.methodButtonText,
        paymentMethod === method && styles.selectedMethodButtonText
      ]}>{label}</Text>
    </TouchableOpacity>
  );

  const CardForm = () => (
    <View>
      <TextInput 
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="MM/YY"
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
    </View>
  );

  const MobilePaymentForm = ({ provider }) => (
    <View>
      <TextInput 
        style={styles.input}
        placeholder={`${provider} Account Number`}
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />
      <TextInput 
        style={styles.input}
        placeholder="PIN"
        secureTextEntry
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
    </View>
  );

  const CashForm = () => (
    <View style={styles.cashContainer}>
      <Ionicons name="cash-outline" size={48} color="#4CAF50" />
      <Text style={styles.cashText}>Pay with cash to the driver</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.detailsContainer}>
        <DetailItem label="Ride ID" value="12345" />
        <DetailItem label="Origin" value="Downtown" />
        <DetailItem label="Destination" value="Uptown" />
        <DetailItem label="Price" value="৳250.00" />
      </View>

      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      <View style={styles.methodsContainer}>
        <PaymentMethodButton method="card" icon="card-outline" label="Card" />
        <PaymentMethodButton method="bkash" icon="phone-portrait-outline" label="bKash" />
        <PaymentMethodButton method="nagad" icon="phone-portrait-outline" label="Nagad" />
        <PaymentMethodButton method="cash" icon="cash-outline" label="Cash" />
      </View>

      {paymentMethod === 'card' && <CardForm />}
      {paymentMethod === 'bkash' && <MobilePaymentForm provider="bKash" />}
      {paymentMethod === 'nagad' && <MobilePaymentForm provider="Nagad" />}
      {paymentMethod === 'cash' && <CashForm />}

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  methodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    width: '23%',
  },
  selectedMethodButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  methodButtonText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  selectedMethodButtonText: {
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
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
  cashContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  cashText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Pay;