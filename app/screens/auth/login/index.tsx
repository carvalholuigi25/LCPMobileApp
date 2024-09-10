import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FooterFixed from '@/app/components/footers/footerFixed';
import LoginForm from '@/app/features/forms/loginform';

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container]}>
      <View>
        <Image source={require('assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
      </View>
      <LoginForm />
      <View>
        <Link to='/screens/auth/recover' style={{ color: '#00FF38', fontWeight: 'bold' }}>
          You forgot your account credientials? Click here.
        </Link>
        <Link to='/screens/auth/register' style={{ color: '#00FF38', fontWeight: 'bold' }}>
          Don't have an account yet? Register here.
        </Link>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
          <View>
            <Text style={{ width: '100%', padding: 5, textAlign: 'center', color: '#fff' }}>Or login with</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 50, padding: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <MaterialCommunityIcons name='google' size={15} />
          </View>
          <View style={{ width: 40, height: 40, borderRadius: 50, padding: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginLeft: 15 }}>
            <MaterialCommunityIcons name='facebook' size={15} />
          </View>
          <View style={{ width: 40, height: 40, borderRadius: 50, padding: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginLeft: 15 }}>
            <MaterialCommunityIcons name='microsoft' size={15} />
          </View>
        </View>
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
  frmlog: {
    color: '#ffffff',
    flex: 1,
    padding: 15,
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inplog: {
    width: '100%',
    padding: 15,
    borderRadius: 15
  },
  inpchlog: {
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 40,
    backgroundColor: '#ffffff'
  },
  btnclear: {
    color: '#ADD8E6',
    padding: 15
  },
  btnlog: {
    color: '#00FF38',
    padding: 15
  }
});
