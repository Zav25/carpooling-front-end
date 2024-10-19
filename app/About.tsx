import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import IconContainer from '../components/IconContainer'; // Import the IconContainer component

export default function AboutScreen() {
  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/images/about-cover.jpeg')} style={styles.coverImage} />
        <Text style={styles.title}>Cleaner Bangladesh, Cleaner Future</Text>
        <Text style={styles.text}>
          Welcome to our carpooling app—your sustainable solution to navigating the bustling streets of Dhaka!
          Recognized as one of the most air-polluted cities globally, Dhaka faces significant challenges, 
          and we believe that together, we can make a difference.
        </Text>
        <Text style={styles.text}>
          Our mission is to create a greener, more sustainable environment by reducing the number of cars on the road 
          and preventing greenhouse gas emissions. By offering a reliable carpooling service, we aim to ease everyday 
          commutes during rush hours, making them not only more affordable but also eco-friendly.
        </Text>
        <Text style={styles.text}>
          We are committed to benefiting our community by promoting shared rides, reducing traffic congestion, and 
          enhancing the overall travel experience. Join us in our journey towards a cleaner, greener Dhaka, one ride 
          at a time. Together, we can breathe easier and move forward to a brighter future.
        </Text>
        <Text style={styles.text}>
          Ready to ride with us? Let’s make every trip count!
        </Text>

        <View style={styles.card}>
          <Image source={require('../assets/images/about-rain.jpeg')} style={styles.cardImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>RAINING? {"\n"}BUT NO RIDES?</Text>
            <Text style={styles.cardText}>But with “Carpooling”, you can easily find rides!</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Cannot find a ride? {"\n"}Late to work? Home?</Text>
            <Text style={styles.cardText}>WE CONNECT RIDES FASTER</Text>
          </View>
          <Image source={require('../assets/images/about-connect.jpeg')} style={styles.cardImage} />
        </View>
      </ScrollView>
      <IconContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#28a745',
    padding: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

