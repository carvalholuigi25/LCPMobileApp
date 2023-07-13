import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { globalStyles } from "./styles/global";
import DrawerNav from './navigators/drawerNav';

SplashScreen.preventAutoHideAsync();

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito/static/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito/static/Nunito-Bold.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onlay = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={globalStyles.container} onLayout={onlay}>
      <DrawerNav />
    </View>
  );
}