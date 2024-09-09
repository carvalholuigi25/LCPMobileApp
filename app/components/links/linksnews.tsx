// Loading.tsx
import React from 'react';
import { View, StyleSheet, Alert, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LinksNews: React.FC<any> = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.mnews}>
          <TouchableOpacity style={styles.newsitem} onPress={() => Alert.alert('News 1!', 'Coming soon...')}>
            <ImageBackground source={require('../../../assets/images/technology.jpeg')} style={styles.newsitemimg} imageStyle={styles.newsitemimgs2}>
              <LinearGradient colors={['transparent', '#000']} style={styles.newssubitem}>
                <Text style={styles.newssubitemtxt}>News 1</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.newsitem} onPress={() => Alert.alert('News 2!', 'Coming soon...')}>
            <ImageBackground source={require('../../../assets/images/technology.jpeg')} style={styles.newsitemimg} imageStyle={styles.newsitemimgs2}>
              <LinearGradient colors={['transparent', '#000']} style={styles.newssubitem}>
                <Text style={styles.newssubitemtxt}>News 2</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.newsitem} onPress={() => Alert.alert('News 3!', 'Coming soon...')}>
            <ImageBackground source={require('../../../assets/images/technology.jpeg')} style={styles.newsitemimg} imageStyle={styles.newsitemimgs2}>
              <LinearGradient colors={['transparent', '#000']} style={styles.newssubitem}>
                <Text style={styles.newssubitemtxt}>News 3</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnews: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    height: 'auto',
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    flex: 1,
    flexWrap: 'wrap'
  },
  newsitem: {
    marginTop: 0,
    padding: 5
  },
  newsitemimg: {
    padding: 0,
    margin: 0,
    width: 100,
    height: 100,
    borderRadius: 0
  },
  newsitemimgs2: {
    borderRadius: 24
  },
  newssubitem: {
    height: '100%',
    width: '100%',
    borderRadius: 24
  },
  newssubitemtxt: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default LinksNews;
