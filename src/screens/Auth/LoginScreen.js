import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons'; 

function LoginScreen() {
  return (
    <View style={globalStyles.login}>
      <View style={styles.loginContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="sign-in" size={20} />
          <Text style={styles.title}>Login</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContent: {
    flex: 1,
    textAlign: 'center'
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

export default LoginScreen;