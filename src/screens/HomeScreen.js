import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { globalStyles, myimgs } from '../styles/global';

function HomeScreen() {
  return (
    <View style={globalStyles.home}>
      <View style={styles.homeContent}>
        <Image source={myimgs[0].src} style={styles.img} />
        <Text style={styles.title}>Welcome to LCP Mobile App!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
  },
  img: {
    width: 200,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 15
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'nunito-regular'
  }
});

export default HomeScreen;