import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [selectedLanguage, setSelectedLanguage] = useState('en-us');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state: NetInfoState) => {
      const online = (state.isConnected && state.isInternetReachable);
      setIsOnline(online)
    });

    return () => removeNetInfoSubscription();
  }, []);

  const checkTheNetwork = () => {
    Alert.alert("Network status", "" + isOnline);
  }

  return (
    <View style={globalStyles.settings}>
      <View style={styles.settingsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="gear" size={20} />
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.lblTitle}>Theme:</Text>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTheme(itemValue)
            }
            placeholder='Choose the theme'
            style={styles.picker}>
            <Picker.Item label="Choose the theme" value="" enabled={false} />
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Dark" value="dark" />
            <Picker.Item label="Light" value="light" />
          </Picker>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.lblTitle}>Language:</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            placeholder='Choose the language'
            style={styles.picker}>
            <Picker.Item label="Choose the language" value="" enabled={false} />
            <Picker.Item label="English (United States)" value="en-us" />
            <Picker.Item label="Português (Portugal)" value="pt-pt" />
          </Picker>
        </View>
        <View style={styles.optionsContentBtn}>
          <Button title='Check the network status' onPress={checkTheNetwork} style={styles.btn} />
        </View>
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
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 15,
    padding: 15,
  },
  lblTitle: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: 'black'
  },
  picker: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    color: 'black',
    width: 230,
    borderRadius: 15,
  },
  optionsContentBtn: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15
  },
  btn: {
    padding: 15,
    margin: 15,
    borderRadius: 15,
    textAlign: 'center'
  }
});

export default SettingsScreen;