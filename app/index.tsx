import 'react-native-gesture-handler';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Text, Image, View } from 'react-native';
import HomeScreen from './screens/home';
import MyNavMain from './mynavmain';

const Drawer = createDrawerNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

const drawOptions: DrawerNavigationOptions = {
    headerShown: true,
    headerTintColor: '#000000',
    headerTitleAlign: 'center',
    headerTransparent: false,
    headerStatusBarHeight: 0,
    headerStyle: {
        backgroundColor: '#00FF38'
    },
    headerTitleStyle: {
        width: '100%'
    }
};

function GetLogo(props: any) {
    return (
        <Image source={require('../assets/images/logo_compact.png')} style={{ width: 100, height: 50, padding: 0, margin: 0, resizeMode: 'cover', alignSelf: 'center' }} />
    );
}

function GetAvatarDet(props: any) {
    const isBigAvDet = false;
    const imgAvStyle: any = isBigAvDet ? { width: 80, height: 80, padding: 0, margin: 15, resizeMode: 'cover', alignSelf: 'center', borderRadius: 50, borderColor: '#00FF38', borderWidth: 2 } : { width: 40, height: 40, padding: 0, margin: 0, marginRight: 15, resizeMode: 'cover', alignSelf: 'center', borderRadius: 50, borderColor: '#00FF38', borderWidth: 2 };
    const viewAvStyle: any = isBigAvDet ? { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' };

    return (
        <View style={viewAvStyle}>
            <Image source={require('../assets/images/users/luis.jpg')} style={imgAvStyle} />
            <Text style={{ textAlign: 'center' }}>Luis Carvalho</Text>
        </View>
    );
}

function CustomDrawerContent(props: any) {
    return (
        <>
            <DrawerContentScrollView {...props}>
                <DrawerItem label={props => <GetLogo {...props} />} onPress={() => { }} />
                <DrawerItem label={props => <GetAvatarDet {...props} />} onPress={() => { }} />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', flex: 0 }}>
                <Text style={{ padding: 15 }}>Version: 1.0.0.0</Text>
            </View>
        </>
    );
}

export default function Index() {
    return (
        <PaperProvider theme={theme}>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="HomeScreen" backBehavior='history' screenOptions={drawOptions}>
                <Drawer.Screen 
                    name="HomeScreen" 
                    component={HomeScreen} 
                    options={{ 
                        title: 'Home',
                        drawerIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} /> 
                    }} 
                />

                <Drawer.Screen 
                    name='MyNavMain' 
                    component={MyNavMain} 
                    options={{ 
                        title: 'Main', 
                        drawerIcon: ({ color }) => <MaterialCommunityIcons name="post" color={color} size={26} /> 
                    }} 
                />
            </Drawer.Navigator>
        </PaperProvider>
    );
}