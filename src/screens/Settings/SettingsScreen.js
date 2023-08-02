import React, { useEffect, useState } from 'react';
import '../../assets/i18n/i18n';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

const SettingsScreen = () => {
  const {t, i18n} = useTranslation();
  const [currentTheme, setTheme] = useState('default');
  const [currentLanguage, setLanguage] = useState('en-US');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state: NetInfoState) => {
      const online = (state.isConnected && state.isInternetReachable);
      setIsOnline(online)
    });

    return () => removeNetInfoSubscription();
  }, []);

  const checkTheNetwork = () => {
    Alert.alert(t('titleNetworkStatus'), (isOnline == true ? t('networkStatusOnline') : t('networkStatusOffline')));
  }

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  return (
    <View style={globalStyles.settings}>
      <View style={styles.settingsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="gear" size={20} />
          <Text style={styles.title}>{t('settingsTitle')}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.lblTitle}>{t('themeTitle')}:</Text>
          <Picker
            selectedValue={currentTheme}
            onValueChange={(itemValue, itemIndex) =>
              setTheme(itemValue)
            }
            placeholder={t('themePlaceholder')}
            style={styles.picker}>
            <Picker.Item label={t('themePlaceholder')} value="" enabled={false} />
            <Picker.Item label={t('themeOptDef')} value="default" />
            <Picker.Item label={t('themeOptDark')} value="dark" />
            <Picker.Item label={t('themeOptLight')} value="light" />
          </Picker>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.lblTitle}>{t('languageTitle')}:</Text>
          <Picker
            selectedValue={currentLanguage}
            onValueChange={(itemValue, itemIndex) => {
              setLanguage(itemValue);
              changeLanguage(itemValue);
            }}
            placeholder={t('languagePlaceholder')}
            style={styles.picker}>
            <Picker.Item label={t('languagePlaceholder')} value="" enabled={false} />
            <Picker.Item label={t('languageOpt1')} value="en-US" />
            <Picker.Item label={t('languageOpt2')} value="pt-PT" />
          </Picker>
        </View>
        <View style={styles.optionsContentBtn}>
          <Button title={t('btnCheckNetworkStatus')} onPress={checkTheNetwork} style={styles.btn} />
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