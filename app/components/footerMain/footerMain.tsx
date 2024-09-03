import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function FooterAbout() {
  const yearcopy = new Date().getFullYear() ?? 2024;

  return (
    <View style={styles.footer}>
      <Text style={styles.footertxt}>
        Created by Luis Carvalho - &copy; {yearcopy} LCP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 80,
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
    alignItems: 'center',
    padding: 15,
  },
  footertxt: {
    color: '#000'
  }
});
