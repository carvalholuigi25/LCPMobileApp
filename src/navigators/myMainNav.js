import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AboutScreen, HomeScreen, LoginScreen, MainScreen, RegisterScreen } from '../screens';
import MyTabNav from './myTabNav';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function MyMainNav() {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="home" component={HomeScreen} options={{
        title: 'Home',
        drawerIcon: ({ focused }) => (
          <FontAwesome name="home" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Drawer.Screen name="login" component={LoginScreen} options={{
        title: 'Login',
        drawerIcon: ({ focused }) => (
          <FontAwesome name="sign-in" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Drawer.Screen name="register" component={RegisterScreen} options={{
        title: 'Register',
        drawerIcon: ({ focused }) => (
          <AntDesign name="user" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Drawer.Screen name="main" component={MyTabNav} options={{
        title: 'Main',
        drawerIcon: ({ focused }) => (
          <MaterialIcons name="dashboard" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
      <Drawer.Screen name="about" component={AboutScreen} options={{
        title: 'About',
        drawerIcon: ({ focused }) => (
          <FontAwesome name="info-circle" size={20} color={focused ? 'blue' : '#000000'} />
        )
      }} />
    </Drawer.Navigator>
  );
}

export default MyMainNav;