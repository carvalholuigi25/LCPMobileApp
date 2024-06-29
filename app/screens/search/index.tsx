import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchScreen() {
  return (
    <View style={[styles.container]}>
      <View style={styles.mico}>
        <MaterialIcons name="search" color={styles.ico.color} size={styles.mico.fontSize} />
        <Text style={styles.txtico}>
          Search
        </Text>
      </View>

      <View>
        <Text style={styles.text}>
          Coming soon...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingVertical: 15
  },
  mico: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  ico: {
    color: '#000000'
  },
  txtico: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginLeft: 5,
    lineHeight: 25
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
  btngetstarted: {
    backgroundColor: '#47FE1A',
    color: '#000000',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowRadius: 15,
    textAlign: 'center',
  },
  btngetstartedtxt: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
    alignItems: 'center',
    padding: 15
  },
  footertxt: {
    color: '#ffffff'
  }
});
