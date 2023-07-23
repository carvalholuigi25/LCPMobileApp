import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { AntDesign } from '@expo/vector-icons'; 

function RegisterScreen() {
  return (
    <View style={globalStyles.register}>
      <View style={styles.registerContent}>
        <View style={globalStyles.titleContainer}>
          <AntDesign name="user" size={20} />
          <Text style={styles.title}>Register</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center'
  },
  text: {
    fontSize: 15,
    margin: 15,
    textAlign: 'center'
  }
});

export default RegisterScreen;