import React from 'react';
import MyTabNav from './myTabNav';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AboutScreen, HomeScreen, LoginScreen, MainScreen, RegisterScreen } from '../screens';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import MyDrawerNav from './myDrawerNav';

const Stack = createNativeStackNavigator();

const MyMainNav = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="home" component={HomeScreen} options={{
        title: 'Home',
        StackIcon: ({ focused }) => (
          <FontAwesome name="home" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Stack.Screen name="login" component={LoginScreen} options={{
        title: 'Login',
        StackIcon: ({ focused }) => (
          <FontAwesome name="sign-in" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{
        title: 'Register',
        StackIcon: ({ focused }) => (
          <AntDesign name="user" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Stack.Screen name="main" component={MyTabNav} options={{
        title: 'Main',
        StackIcon: ({ focused }) => (
          <MaterialIcons name="dashboard" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Stack.Screen name="about" component={AboutScreen} options={{
        title: 'About',
        StackIcon: ({ focused }) => (
          <FontAwesome name="info-circle" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Stack.Screen name="others" component={MyDrawerNav} options={{
        title: 'Others'
      }} />
    </Stack.Navigator>
  );
}

export default MyMainNav;