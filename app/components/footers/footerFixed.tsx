import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function FooterFixed({color}: any = '#000') {
  const yearcopy = new Date().getFullYear() ?? 2024;

  return (
    <View style={styles.footer}>
      <Text style={{color: color}}>
        Created by Luis Carvalho - &copy; {yearcopy} LCP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
