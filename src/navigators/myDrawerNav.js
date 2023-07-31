import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  NewsScreen, NewsDetailsScreen, MediaScreen, 
  MediaLocalScreen, TodoItemsScreen, GamesScreen, 
  GamesDetailScreen, SettingsScreen, CreateGamesScreen, 
  UpdateGamesScreen, DeleteGamesScreen 
} from '../screens';

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
          title: 'News Details',
          drawerItemStyle: { display: 'none' }
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
        <Drawer.Screen name="gamesDrawer" component={GamesScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="controller-classic" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Games</Text>,
          title: 'Games'
        }} />
        <Drawer.Screen name="gamesDetailsDrawer" component={GamesDetailScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="controller-classic" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Games Details</Text>,
          title: 'Games Details',
          drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name="createGamesDrawer" component={CreateGamesScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="controller-classic" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Create Games</Text>,
          title: 'Create Games',
          drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name="updateGamesDrawer" component={UpdateGamesScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="controller-classic" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Update Games</Text>,
          title: 'Update Games',
          drawerItemStyle: { display: 'none' }
        }} />
        
        <Drawer.Screen name="deleteGamesDrawer" component={DeleteGamesScreen} options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons name="controller-classic" size={20} color={focused ? 'blue' : '#000000'} />
          ),
          drawerLabel: () => <Text style={styles.DrawerBarLabel}>Delete Games</Text>,
          title: 'Delete Games',
          drawerItemStyle: { display: 'none' }
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