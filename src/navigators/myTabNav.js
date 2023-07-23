import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen, AddNewsScreen, NotificationsScreen, UsersScreen, MainScreen } from '../screens';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabNav() {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Tab.Screen name="maintab" component={MainScreen} options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="dashboard" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Main</Text>
        }} />
        <Tab.Screen name="searchtab" component={SearchScreen} options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="search" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Search</Text>
        }} />
        <Tab.Screen name="addnewstab" component={AddNewsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="pluscircle" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Add News</Text>
        }} />
        <Tab.Screen name="notificationstab" component={NotificationsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="bell" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Notifications</Text>
        }} />
        <Tab.Screen name="userstab" component={UsersScreen} options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user-circle" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Users</Text>
        }} />
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#000000',
  },
})

export default MyTabNav;