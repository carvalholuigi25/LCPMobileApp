import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Graph from '@/components/graph';
import LinksProjects from '@/components/linksprojects';
import LinksNews from '@/components/linksnews';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Welcome Luis</Text>
        </View>
        <Graph />
        <LinksProjects />
        <LinksNews />
      </ScrollView>
    </View>
  );
}

const padspc = (15 * 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 0,
    margin: 0,
    paddingTop: StatusBar.currentHeight! - padspc,
  },
  scrollView: {
    marginBottom: StatusBar.currentHeight! + padspc,
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
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
