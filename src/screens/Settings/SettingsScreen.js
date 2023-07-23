import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

function SettingsScreen() {
  return (
    <View style={globalStyles.settings}>
      <View style={styles.settingsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="gear" size={20} />
          <Text style={styles.title}>Settings</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContent: {
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

export default SettingsScreen;