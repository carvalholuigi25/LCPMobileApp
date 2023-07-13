import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, LoginScreen, RegisterScreen, MainScreen } from '../screens';
import MyRoutes from '../navigators/routes';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home'>
                {
                    MyRoutes().map(x => {
                        return (
                            <Tab.Screen name={x.path} component={x.element} key={x.key} options={{title: x.title}} />
                        );
                    })
                }
            </Tab.Navigator>
        </NavigationContainer>
    );
}