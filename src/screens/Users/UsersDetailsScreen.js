import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

function UsersDetailsScreen() {
  return (
    <View style={globalStyles.usersDetails}>
      <View style={styles.usersDetailsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="user" size={20} />
          <Text style={styles.title}>Users Details</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  usersDetailsContent: {
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

export default UsersDetailsScreen;