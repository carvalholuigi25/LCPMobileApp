import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../../styles/global';
import { LoadSessions, SaveSessions } from '../../sessions';
import { myThemes, setPropStyleTheme, aryThemes } from '../../styles/themes';
import { useTranslation } from 'react-i18next';
import * as i18nf from '../../assets/i18n/i18n';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const {t, i18n} = useTranslation();
  const [currentTheme, setTheme] = useState('');
  const [currentLanguage, setLanguage] = useState('');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const loadTheme = () => {
      LoadSessions().loadKey('myTheme').then(x => { 
        setTheme(x); 
      }).catch(error => console.log(error));
    }

    const loadLanguage = () => {
      LoadSessions().loadKey('myLanguage').then(x => {
        setLanguage(x);
        changeLanguage(x);
      }).catch(error => console.log(error));
    }
    
    loadTheme();
    loadLanguage();

    const removeNetInfoSubscription = NetInfo.addEventListener((state: NetInfoState) => {
      const online = (state.isConnected && state.isInternetReachable);
      setIsOnline(online);
    });

    return () => removeNetInfoSubscription();
  }, []);

  const saveTheme = async (value) => { await SaveSessions().saveKey("myTheme", value); }
  const saveLanguage = async (value) => { await SaveSessions().saveKey("myLanguage", value); }

  const checkTheNetwork = () => {
    Alert.alert(t('titleNetworkStatus'), (isOnline == true ? t('networkStatusOnline') : t('networkStatusOffline')));
  }

  const changeLanguage = (value) => {
    i18n.changeLanguage(value).then(() => { 
      setLanguage(value); 
    }).catch(err => console.log(err));
  };

  const onThemeChange = async (itemValue, itemIndex) => {
    setTheme(itemValue);
    await saveTheme(itemValue);
  };

  const onLangValChange = async (itemValue, itemIndex) => {
    setLanguage(itemValue);
    changeLanguage(itemValue);
    await saveLanguage(itemValue);
  };

  return (
    <View style={[globalStyles.settings, { backgroundColor: setPropStyleTheme(currentTheme, "background") }]}>
      <View style={styles.settingsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="gear" size={20} style={{ color: setPropStyleTheme(currentTheme, "color") }} />
          <Text style={[styles.title, {color: setPropStyleTheme(currentTheme, "text")}]}>{t('settingsTitle')}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={[styles.lblTitle, {color: setPropStyleTheme(currentTheme, "text")}]}>{t('themeTitle')}:</Text>
          <Picker
            mode='dialog'
            selectedValue={currentTheme}
            onValueChange={onThemeChange}
            placeholder={t('themePlaceholder')}
            style={[styles.picker, {color: setPropStyleTheme(currentTheme, "picker")}]}>
            <Picker.Item label={t('themePlaceholder')} value="" enabled={false} />
            <Picker.Item label={t('themeOptDef')} value="default" />
            {aryThemes.map((x, index) => {
              return (
                <Picker.Item label={t('themeOpt'+x.value)} value={x.name} key={index} />
              )
            })}
          </Picker>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={[styles.lblTitle, {color: setPropStyleTheme(currentTheme, "text")}]}>{t('languageTitle')}:</Text>
          <Picker
            mode='dialog'
            selectedValue={currentLanguage}
            onValueChange={onLangValChange}
            placeholder={t('languagePlaceholder')}
            style={[styles.picker, {color: setPropStyleTheme(currentTheme, "picker")}]}>
            <Picker.Item label={t('languagePlaceholder')} value="" enabled={false} />
            {i18nf.aryLangs.map((x, index) => {
              return (
                <Picker.Item label={t('languageOpt'+(index+1))} value={x.name} key={index} />
              )
            })}
          </Picker>
        </View>
        <View style={styles.optionsContentBtn}>
          <Button title={t('btnCheckNetworkStatus')} onPress={checkTheNetwork} color={setPropStyleTheme(currentTheme, "button")} style={styles.btn} />
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