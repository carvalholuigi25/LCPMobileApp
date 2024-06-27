'use strict';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scontainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnprimary: {
    backgroundColor: '#f4511e',
    color: '#fff',
    padding: 10,
    borderRadius: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'justify',
    lineHeight: 30,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  footertxt : {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
  }
});