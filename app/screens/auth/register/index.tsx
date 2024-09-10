import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from '@react-navigation/native';
import FooterFixed from '@/app/components/footers/footerFixed';
import RegisterForm from '@/app/features/forms/regform';

export default function RegisterScreen() {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container]}>
      <View>
        <Image source={require('assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
      </View>
      <RegisterForm />
      <View>
        <Link to='/screens/auth/login'>
          Back to login
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
  logo: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 25
  },
  frmreg: {
    color: '#ffffff',
    flex: 1,
    padding: 15,
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inpreg: {
    width: '100%',
    padding: 15,
    borderRadius: 15
  },
  btnclear: {
    color: '#ADD8E6',
    padding: 15
  },
  btnreg: {
    color: '#00FF38',
    padding: 15
  }
});
