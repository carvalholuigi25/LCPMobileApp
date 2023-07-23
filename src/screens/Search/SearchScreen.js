import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

function SearchScreen() {
  return (
    <View style={globalStyles.search}>
      <View style={styles.searchContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="search" size={20} />
          <Text style={styles.title}>Search</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContent: {
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

export default SearchScreen;