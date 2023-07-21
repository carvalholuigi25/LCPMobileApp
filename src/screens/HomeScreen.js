import * as React from 'react';
import { Button, View, ScrollView, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { globalStyles, myimgs } from '../styles/global';
import { Footer } from '../components';
import { Link } from '@react-navigation/native';

function HomeScreen() {
  return (
    <ImageBackground source={myimgs[2].src} style={globalStyles.mybkgimg}>
      <View style={globalStyles.home}>
        <View style={styles.homeContent}>
            <Text style={[styles.title, globalStyles.shadowProp]}>LCP</Text>

            <View style={styles.grpBtnsLoaded}>
              <Link to='/login' style={styles.btnGoLog}>
                Sign in
              </Link>

              <Link to='/register' style={styles.btnGoReg}>
                Sign up
              </Link>
            </View>
        </View>
        <Footer />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: 1,
    fontFamily: 'inter'
  },
  grpBtnsLoaded: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btnGoLog: {
    padding: 15,
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    borderRadius: 15,
    margin: 15
  },
  btnGoReg: {
    padding: 15,
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    borderRadius: 15,
    margin: 15
  }
});

export default HomeScreen;