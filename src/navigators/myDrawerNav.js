import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { NewsScreen, NewsDetailsScreen, MediaScreen, MediaLocalScreen, TodoItemsScreen } from '../screens';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Drawer = createDrawerNavigator();

const MyDrawerNav = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="newsDrawer" component={NewsScreen} options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome name="newspaper-o" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>News</Text>,
          title: 'News'
        }} />
         <Drawer.Screen name="newsDetailsDrawer" component={NewsDetailsScreen} options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome name="newspaper-o" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>News Details</Text>,
          title: 'News Details'
        }} />
        <Drawer.Screen name="mediaDrawer" component={MediaScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="perm-media" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Media</Text>,
          title: 'Media'
        }} />
        <Drawer.Screen name="mediaLocalDrawer" component={MediaLocalScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="perm-media" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Media Local</Text>,
          title: 'Media Local'
        }} />
        <Drawer.Screen name="todoItemsDrawer" component={TodoItemsScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="list" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Todo Items</Text>,
          title: 'Todo items'
        }} />
        <Drawer.Screen name="settingsDrawer" component={SettingsScreen} options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome name="gear" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Settings</Text>,
          title: 'Settings'
        }} />
      </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  DrawerBarLabel: {
    color: '#000000',
  },
})

export default MyDrawerNav;