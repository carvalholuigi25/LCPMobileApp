import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Footer() {
    return (
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, globalStyles.shadowProp]}>
          Created by Luis Carvalho 
          &copy;2023 - LCP
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    footer: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 'auto'
    },
    footerContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    footerText: {
      fontFamily: 'quantico',
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: 14,
      flexWrap: 'wrap',
      color: 'white',
      letterSpacing: 1,
      padding: 15
    }
  });