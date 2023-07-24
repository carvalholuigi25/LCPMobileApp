import * as React from 'react';
import { Link } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, myimgs } from '../../styles/global';
import { Footer } from '../../components';

const MainScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.main}>
      <View style={styles.mainContent}>
        <View style={globalStyles.titleContainer}>
          <MaterialIcons name="dashboard" size={20} />
          <Text style={styles.title}>Main</Text>
        </View>
        <Text style={styles.text}>In construction...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
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

export default MainScreen;