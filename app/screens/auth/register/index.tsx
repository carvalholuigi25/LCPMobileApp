import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RegisterForm from '@/app/features/forms/regform';
import RegisterFormStepper from '@/app/features/forms/regformstepper';
import Footer from '@/app/components/footers/footer';

export default function RegisterScreen() {
  const mode: string = 'stepper';
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container]}>
      <ScrollView>
        <View>
          <Image source={require('assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Register</Text>
        </View>

        <View style={styles.subcontainer}>
          {mode == 'stepper' ? (
            <RegisterFormStepper />
          ) : (
            <RegisterForm />
          )}
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
  }
});
