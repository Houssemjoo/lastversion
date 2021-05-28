import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View } from 'react-native';
import OnBoarding from '../components/Exercices/OnBoarding'

export default function Exercices() {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle={"dark-content"} backgroundColor="#FFF" />
      <OnBoarding/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
