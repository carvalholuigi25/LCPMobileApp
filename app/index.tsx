import React from 'react';
import 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Text, Image, View, StatusBar, ViewStyle, StyleProp, ImageStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyNavMain from './components/navs/mynavmain';
import HomeScreen from './screens/home';
import AdminScreen from './screens/admin';
import UserScreen from './screens/user';

const Drawer = createDrawerNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow'
    },
};

const drawOptions: DrawerNavigationOptions = {
    headerShown: true,
    headerTintColor: '#000000',
    headerTitleAlign: 'center',
    headerTransparent: false,
    headerStatusBarHeight: 0,
    headerStyle: {
        backgroundColor: '#00FF38',
    },
    headerTitleStyle: {
        width: '100%'
    }
};

function GetLogo(props: any) {
    const logostyles: any = { 
        width: 100, 
        height: 50, 
        padding: 0, 
        margin: 0, 
        resizeMode: 'cover', 
        alignSelf: 'center' 
    };

    return (
        <Image source={require('assets/images/logo_compact.png')} style={logostyles} />
    );
}

function GetAvatarDet(props: any) {
    const isBigAvDet = false;

    const viewAvStyle: StyleProp<ViewStyle> = isBigAvDet ? { 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    } : { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center' 
    };

    const imgAvStyle: StyleProp<ImageStyle> = isBigAvDet ? { 
        width: 80, 
        height: 80, 
    } : { 
        width: 40, 
        height: 40 
    };

    const avDetStyle: StyleProp<TextStyle> = isBigAvDet ? {
        margin: 15,
        textAlign: 'center'
    } : {
        marginLeft: 15,
        textAlign: 'center' 
    };

    return (
        <View style={viewAvStyle}>
            <Image 
                source={require('assets/images/users/luis.jpg')} 
                style={[imgAvStyle, {
                    padding: 0, 
                    margin: 0, 
                    resizeMode: 'cover', 
                    alignSelf: 'center', 
                    borderRadius: 50, 
                    borderColor: '#00FF38', 
                    borderWidth: 2 
                }]} 
            />
            <Text style={avDetStyle}>Luis Carvalho</Text>
        </View>
    );
}

function CustomDrawerContent(props: any) {
    const viewVerStyle: StyleProp<ViewStyle> = { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        alignItems: 'flex-start', 
        flex: 0 
    };

    const txtVerStyle: StyleProp<TextStyle> = { 
        padding: 15 
    };

    const navigation = useNavigation<any>();

    const navToHome = () => { 
        navigation.navigate("index", { screen: 'MyHome' });
    };

    const navToUser = () => { 
        navigation.navigate("index", { screen: 'MyUser' });
    };

    return (
        <>
            <DrawerContentScrollView {...props}>
                <DrawerItem label={props => <GetLogo {...props} />} onPress={navToHome} />
                <DrawerItem label={props => <GetAvatarDet {...props} />} onPress={navToUser} />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={viewVerStyle}>
                <Text style={txtVerStyle}>
                    Version: {process.env.EXPO_PUBLIC_MYAPPVERSION}
                </Text>
            </View>
        </>
    );
}

export default function Index() {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#00FF38" />
            <PaperProvider theme={theme}>
                <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="HomeScreen" backBehavior='history' screenOptions={drawOptions}>
                    <Drawer.Screen
                        name='MyHome'
                        component={HomeScreen}
                        options={{
                            title: '',
                            headerShown: false,
                            drawerItemStyle: { display: 'none' }
                        }} />

                    <Drawer.Screen
                        name='MyUser'
                        component={UserScreen}
                        options={{
                            title: 'User',
                            drawerItemStyle: { display: 'none' }
                        }} />

                    <Drawer.Screen
                        name='MyAdminScreen'
                        component={AdminScreen}
                        options={{
                            title: 'Admin',
                            drawerIcon: ({ color }) => <MaterialIcons name="admin-panel-settings" color={color} size={26} />,
                        }} />

                    <Drawer.Screen
                        name='MyNavMain'
                        component={MyNavMain}
                        options={{
                            title: 'Main',
                            drawerIcon: ({ color }) => <MaterialCommunityIcons name="post" color={color} size={26} />,
                            drawerItemStyle: { display: 'none' }
                        }} />
                </Drawer.Navigator>
            </PaperProvider>
        </>
    );
}