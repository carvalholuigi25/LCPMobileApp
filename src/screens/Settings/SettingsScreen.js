import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const showMyDBPath = async () => {
  var mycmd = await FileSystem.getInfoAsync(FileSystem.documentDirectory);
  console.log(mycmd);
  Alert.alert('DB Path', JSON.stringify(mycmd));
}

const SettingsScreen = () => {
  return (
    <View style={globalStyles.settings}>
      <View style={styles.settingsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="gear" size={20} />
          <Text style={styles.title}>Settings</Text>
        </View>
        <Button title='Show my DB path' onPress={showMyDBPath} style={styles.btn} />
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
  },
  btn: {
    padding: 15,
    borderRadius: 15,
    textAlign: 'center'
  }
});

export default SettingsScreen;