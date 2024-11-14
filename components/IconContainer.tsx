import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IconContainer() {
  const [isDriver, setIsDriver] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch the user from AsyncStorage to determine if they are a driver
    AsyncStorage.getItem('user')
      .then((user) => {
        if (user) {
          const parsedUser = JSON.parse(user);
          setIsDriver(parsedUser.is_driver); // Assuming is_driver is part of the user object
        }
      })
      .catch((error) => {
        console.error('Error fetching user from AsyncStorage:', error);
      });
  }, []);

  return (
    <View style={styles.fixedContainer}>
      <View style={styles.separator} />
      <View style={styles.container}>
        <Link href={isDriver === true ? "/PendingRides" : "/RequestRide"}>
          <Image source={require('../assets/images/icons8-home-100.png')} style={styles.icon} />
        </Link>
        <Link href="/Profile">
          <Image source={require('../assets/images/icons8-user-100.png')} style={styles.icon} />
        </Link>
        <Link href="/About">
          <Image source={require('../assets/images/icons8-about-us-100.png')} style={styles.icon} />
        </Link>
        <Link href="/FareChart">
          <Image source={require('../assets/images/icons8-combo-chart-100.png')} style={styles.icon} />
        </Link>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'relative',
    bottom: -10,
    width: '100%',
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0, // No vertical padding to prevent clipping
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  icon: {
    width: 30,  // Original size width (you can adjust if needed)
    height: 30, // Original size height
  },
});
