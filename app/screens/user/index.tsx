import React from 'react';
import { Text, Image, View, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mavatar}>
          <Image source={require('../../../assets/images/users/covers/luis_c.jpeg')} style={styles.coveravatar} />
          <Image source={require('../../../assets/images/users/luis.jpg')} style={styles.logoavatar} />
        </View>
        
        <View style={styles.munameavatar}>
          <Text style={styles.unameavatar}>Luis Carvalho</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const padspc = (15 * 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 0,
    margin: 0,
    paddingTop: (StatusBar.currentHeight! - padspc) - 15,
  },
  scrollView: {
    marginBottom: StatusBar.currentHeight! + padspc,
  },
  text: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#000000',
    lineHeight: 25
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
  mavatar: {
    position: 'relative',
    margin: 0
  },
  coveravatar: {
    width: '100%',
    height: 200,
    padding: 0, 
    margin: 0,
    borderRadius: 0, 
    resizeMode: 'cover', 
    alignSelf: 'center' 
  },
  logoavatar: {
    position: 'absolute',
    bottom: 0,
    width: 100, 
    height: 100, 
    padding: 0, 
    margin: -30,
    borderRadius: 50, 
    resizeMode: 'cover', 
    alignSelf: 'center' 
  },
  munameavatar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },
  unameavatar: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    color: '#000000',
    lineHeight: 25
  }
});
