import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from '@/components/loader';
import { useNavigation } from '@react-navigation/native';

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
            <View>
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <Text style={styles.text}>Loaded!</Text>
                )}
            </View>

            <View style={styles.footer}>
                <Text style={styles.footertxt}>Criado por Luis Carvalho - &copy; 2024 LCP</Text>
            </View>
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
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      fontSize: 12,
      marginTop: 15,
      textAlign: 'center',
      alignItems: 'center',
      padding: 15
    },
    footertxt: {
      color: '#ffffff'
    }
});

export default LoadingScreen;