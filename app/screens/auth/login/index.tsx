import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginForm from '@/app/features/forms/loginform';
import Footer from '@/app/components/footers/footer';

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container]}>
      <ScrollView>
        <View>
          <Image source={require('assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.subcontainer}>
          <LoginForm />
          <View style={styles.vmlnk}>
            <Link to='/screens/auth/register' style={styles.lnkregister}>
              Don't have an account yet? Register here.
            </Link>
          </View>
          <View style={styles.vmlinesep}>
            <View style={styles.mlinesep}>
              <View style={styles.linesepleft} />
              <View>
                <Text style={styles.lineseptxt}>Or login with</Text>
              </View>
              <View style={styles.linesepright} />
            </View>

            <View style={styles.msociallog}>
              <View style={styles.sociallogbtn}>
                <MaterialCommunityIcons name='google' size={styles.sociallogbtnico.fontSize} />
              </View>
              <View style={styles.sociallogbtn}>
                <MaterialCommunityIcons name='facebook' size={styles.sociallogbtnico.fontSize} />
              </View>
              <View style={styles.sociallogbtn}>
                <MaterialCommunityIcons name='microsoft' size={styles.sociallogbtnico.fontSize} />
              </View>
            </View>
          </View>
        </View>
        <Footer color={'#fff'} />
      </ScrollView>
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
    width: 150,
    height: 150,
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 25
  },
  subcontainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    borderRadius: 30,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  lnkregister: {
    color: '#00FF38',
    fontWeight: 'bold'
  },
  vmlnk: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center'
  },
  vmlinesep: {
    marginTop: 15
  },
  mlinesep: {
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  linesepleft: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff'
  },
  lineseptxt: {
    width: '100%',
    padding: 5,
    textAlign: 'center',
    color: '#fff'
  },
  linesepright: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff'
  },
  msociallog: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sociallogbtn: {
    width: 45,
    height: 45,
    borderRadius: 50,
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  sociallogbtnico: {
    fontSize: 23
  }
});
