import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';

const NewsScreen = ({navigation}) => {
  return (
    <View style={globalStyles.news}>
      <View style={styles.newsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="newspaper-o" size={20} />
          <Text style={styles.title}>News</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
        <Button
          title="Go to News details"
          onPress={() =>
            navigation.navigate('newsDetailsDrawer', { name: 'Luigi' })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsContent: {
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

export default NewsScreen;