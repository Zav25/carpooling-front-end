import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function IconContainer() {
  return (
    <View style={styles.fixedContainer}>
      <View style={styles.separator} /> {/* Horizontal line above the container */}
      <View style={styles.container}>
        <Link href="/RequestRide">
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
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    bottom: 0,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
