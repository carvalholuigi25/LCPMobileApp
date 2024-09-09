import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Loader from '@/app/components/loader';
import Footer from '@/app/components/footer';

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation<any>();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('index', { screen: 'MyNavMain' });
        }, 1000 + 500);
    }, []);

    return (
        <LinearGradient
            colors={colors}
            style={[styles.container]}>
            <StatusBar barStyle="dark-content" backgroundColor="#00FF38" />

            <View>
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <Text style={styles.text}>Loaded!</Text>
                )}
            </View>

            <Footer />
        </LinearGradient>
    );
}

const colors = ['#00FF38', '#003499'];
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 15,
        marginBottom: 15,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    btn: {
        backgroundColor: '#47FE1A',
        color: '#000000',
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 15,
        shadowOpacity: 1,
        shadowColor: '#000000',
        shadowRadius: 15,
        textAlign: 'center',
    },
    btntxt: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default LoadingScreen;