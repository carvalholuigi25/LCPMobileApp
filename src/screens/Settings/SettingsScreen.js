import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { globalStyles } from '../../styles/global';
import { myThemes } from '../../styles/themes';
import '../../assets/i18n/i18n';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const {t, i18n} = useTranslation();
  const [currentTheme, setTheme] = useState('');
  const [currentLanguage, setLanguage] = useState('');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('myTheme');
        const mval = jsonValue != null ? JSON.parse(jsonValue) : null;
        setTheme(mval);
        return mval;
      } catch (e) {
        console.log("The theme couldnt be loaded. Error details: " + e);
      }
    };

    const loadLanguage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('myLanguage');
        const mval = jsonValue != null ? JSON.parse(jsonValue) : null;
        setLanguage(mval);
        return mval;
      } catch (e) {
        console.log("The language couldnt be loaded. Error details: " + e);
      }
    };
    
    setTheme(loadTheme());
    setLanguage(loadLanguage());

    const removeNetInfoSubscription = NetInfo.addEventListener((state: NetInfoState) => {
      const online = (state.isConnected && state.isInternetReachable);
      setIsOnline(online)
    });

    return () => removeNetInfoSubscription();
  }, []);

  const saveTheme = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('myTheme', jsonValue);
    } catch (e) {
      console.log("The theme couldnt be saved. Error details: " + e);
    }
  };

  const saveLanguage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('myLanguage', jsonValue);
    } catch (e) {
      console.log("The language couldnt be saved. Error details: " + e);
    }
  };

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

  const onLangChange = async (itemValue, itemIndex) => {
    setLanguage(itemValue);
    changeLanguage(itemValue);
    await saveLanguage(itemValue);
  };

  const setBkgColors = () => { return currentTheme == "dark" ? myThemes.dark.colors.background : myThemes.light.colors.background; }
  const setTxtColors = () => { return currentTheme == "dark" ? myThemes.dark.colors.text : myThemes.light.colors.text; }
  const setPickerColors = () => { return currentTheme == "dark" ? myThemes.dark.colors.picker : myThemes.light.colors.picker; }
  const setBtnColors = () => { return currentTheme == "dark" ? myThemes.dark.colors.button : myThemes.light.colors.button; }

  return (
    <View style={[globalStyles.settings, { backgroundColor: setBkgColors() }]}>
      <View style={styles.settingsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="gear" size={20} style={{ color: setTxtColors() }} />
          <Text style={[styles.title, {color: setTxtColors()}]}>{t('settingsTitle')}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={[styles.lblTitle, {color: setTxtColors()}]}>{t('themeTitle')}:</Text>
          <Picker
            mode='dialog'
            selectedValue={currentTheme}
            onValueChange={onThemeChange}
            placeholder={t('themePlaceholder')}
            style={[styles.picker, {color: setPickerColors()}]}>
            <Picker.Item label={t('themePlaceholder')} value="" enabled={false} />
            <Picker.Item label={t('themeOptDef')} value="default" />
            <Picker.Item label={t('themeOptDark')} value="dark" />
            <Picker.Item label={t('themeOptLight')} value="light" />
          </Picker>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={[styles.lblTitle, {color: setTxtColors()}]}>{t('languageTitle')}:</Text>
          <Picker
            mode='dialog'
            selectedValue={currentLanguage}
            onValueChange={onLangChange}
            placeholder={t('languagePlaceholder')}
            style={[styles.picker, {color: setPickerColors()}]}>
            <Picker.Item label={t('languagePlaceholder')} value="" enabled={false} />
            <Picker.Item label={t('languageOpt1')} value="en-US" />
            <Picker.Item label={t('languageOpt2')} value="pt-PT" />
          </Picker>
        </View>
        <View style={styles.optionsContentBtn}>
          <Button title={t('btnCheckNetworkStatus')} onPress={checkTheNetwork} color={setBtnColors()} style={styles.btn} />
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