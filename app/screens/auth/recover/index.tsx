import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '@/app/components/footers/footer';
import RecoverForm from '@/app/features/forms/recform';

export default function RecoverScreen() {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.container]}>
      <ScrollView>
        <View>
          <Image source={require('assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Recover your account credientials</Text>
        </View>

        <View style={styles.subcontainer}>
          <RecoverForm />
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
