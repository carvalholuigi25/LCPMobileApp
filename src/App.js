import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { globalStyles } from "./styles/global";
import { myThemes } from "./styles/themes";
import MyMainNav from './navigators/myMainNav';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const getFonts = () => Font.loadAsync({
  'quantico': require('./assets/fonts/Quantico/Quantico-Regular.ttf'),
  'inter': require('./assets/fonts/Inter/Inter-Regular.ttf'),
  'nunito': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
  'roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf')
});

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTheme, setTheme] = useState({});

  const loadTheme = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myTheme');
      setTheme(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("The theme couldnt be loaded. Error details: " + e);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
        await loadTheme();
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onlay = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={globalStyles.container} onLayout={onlay}>
      <NavigationContainer theme={currentTheme == "dark" ? myThemes.dark : myThemes.light}>
        <MyMainNav />
      </NavigationContainer>
    </View>
  );
}