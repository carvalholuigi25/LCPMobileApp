import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, LoginScreen, RegisterScreen, MainScreen } from '../screens';
import MyRoutes from '../navigators/routes';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
            {
              MyRoutes().map(x => {
                return (
                  <Drawer.Screen name={x.path} component={x.element} key={x.key} options={{title: x.title}} />
                );
              })
            }
        </Drawer.Navigator>
      </NavigationContainer>
    );
}