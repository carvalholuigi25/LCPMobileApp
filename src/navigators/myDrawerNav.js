import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { NewsScreen, NewsDetailsScreen } from '../screens';

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
      </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  DrawerBarLabel: {
    color: '#000000',
  },
})

export default MyDrawerNav;