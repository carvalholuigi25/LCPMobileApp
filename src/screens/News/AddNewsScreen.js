import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

function AddNewsScreen() {
  return (
    <View style={globalStyles.addNews}>
      <View style={styles.addNewsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="plus-circle" size={20} />
          <Text style={styles.title}>Add News</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewsContent: {
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

export default AddNewsScreen;