import React from 'react';
import MainScreen from '../../screens/main';
import AboutScreen from '../../screens/about';
import NewsScreen from '../../screens/news';
import SearchScreen from '../../screens/search';
import SettingsScreen from '../../screens/settings';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function MyNavMain() {
    const sizeIco = 26;

    return (
        <Tab.Navigator
            initialRouteName="MainScreen"
            backBehavior='history'
            activeColor="#ffffff"
            inactiveColor="#000000"
            shifting={true}
            labeled={true}
            activeIndicatorStyle={{ 
                backgroundColor: 'transparent' 
            }}
            barStyle={{ 
                backgroundColor: '#00FF38', 
                height: 'auto',
                borderRadius: 0,
                paddingLeft: 15,
                paddingRight: 15,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            <Tab.Screen 
                name="MainScreen" 
                component={MainScreen} 
                options={{
                    tabBarLabel: 'Main',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={sizeIco} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="NewsScreen" 
                component={NewsScreen} 
                options={{
                    tabBarLabel: 'News',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="newspaper" color={color} size={sizeIco} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="SearchScreen" 
                component={SearchScreen} 
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="search" color={color} size={sizeIco} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="SettingsScreen" 
                component={SettingsScreen} 
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="settings" color={color} size={sizeIco} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="AboutScreen" 
                component={AboutScreen} 
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="info" color={color} size={sizeIco} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
}