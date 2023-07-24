import * as React from 'react';
import { Link } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { globalStyles, myimgs } from '../../styles/global';
import { Footer } from '../../components';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={myimgs[2].src} style={globalStyles.mybkgimg}>
      <View style={globalStyles.home}>
        <View style={styles.homeContent}>
          <Text style={[styles.title, globalStyles.shadowProp]}>LCP</Text>

          <View style={styles.grpBtnsLoaded}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('login')
            }} style={styles.btnGoReg}>
              <View style={styles.viewContainer}>
                <FontAwesome name="sign-in" style={styles.btnIcon} />
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('register')
            }} style={styles.btnGoReg}>
              <View style={styles.viewContainer}>
                <AntDesign name="user" style={styles.btnIcon} />
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.grpBtnsLoaded}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('main')
            }} style={styles.btnEnterWOLog}>
              <View style={styles.viewContainer}>
                <FontAwesome name="newspaper-o" style={styles.btnIcon} />
                <Text style={styles.btnText}>Enter</Text>
              </View>
            </TouchableOpacity>
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
  viewContainer: {
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
  },
  btnEnterWOLog: {
    padding: 15,
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    borderRadius: 15,
    margin: 15
  },
  btnIcon: {
    fontSize: 24,
    marginRight: 10,
    color: 'black'
  },
  btnText: {
    fontSize: 16,
    color: 'black'
  }
});

export default HomeScreen;