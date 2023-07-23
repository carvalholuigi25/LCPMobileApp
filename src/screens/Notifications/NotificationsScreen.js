import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

function NotificationsScreen() {
  return (
    <View style={globalStyles.notifications}>
      <View style={styles.notificationsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="bell" size={20} />
          <Text style={styles.title}>Notifications</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationsContent: {
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

export default NotificationsScreen;