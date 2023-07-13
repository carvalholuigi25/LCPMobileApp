import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LoginScreen, RegisterScreen, MainScreen } from '../screens';
import MyRoutes from '../navigators/routes';

const Stack = createNativeStackNavigator();

export default function StackNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                {
                    MyRoutes().map(x => {
                        return (
                            <Stack.Screen name={x.path} component={x.element} key={x.key} options={{title: x.title}} />
                        );
                    })
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}