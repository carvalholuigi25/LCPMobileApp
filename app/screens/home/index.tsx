import React from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import FooterFixed from '@/app/components/footers/footerFixed';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container]}>
      <View>
        <Image source={require('assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.text}>
          Luis Carvalho Projects (LCP) is a project of websites, apps and softwares.
        </Text>
        <Link href="/screens/loading" asChild>
          <Pressable style={styles.btngetstarted}>
            <Text style={styles.btngetstartedtxt}>Get Started</Text>
          </Pressable>
        </Link>
      </View>
      <FooterFixed color={'#fff'} />
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
  text: {
    fontSize: 15,
    marginTop: 15,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 25
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
  btngetstarted: {
    backgroundColor: '#47FE1A',
    color: '#000000',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowRadius: 15,
    width: '100%',
    textAlign: 'center'
  },
  btngetstartedtxt: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
