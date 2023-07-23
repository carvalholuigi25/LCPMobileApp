import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

function NewsDetailsScreen() {
  return (
    <View style={globalStyles.newsDetails}>
      <View style={styles.newsDetailsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="newspaper" size={20} />
          <Text style={styles.title}>News Details</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsDetailsContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center'
  },
  text: {
    fontSize: 15,
    margin: 15,
    textAlign: 'center'
  }
});

export default NewsDetailsScreen;