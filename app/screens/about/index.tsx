import React from 'react';
import { Image, Text, StyleSheet, Pressable, Linking, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FooterMain from '@/app/components/footerMain';

export default function AboutScreen() {
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.mico}>
          <MaterialIcons name="info" color={styles.ico.color} size={styles.mico.fontSize} />
          <Text style={styles.txtico}>
            About
          </Text>
        </View>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Luis Carvalho Projects (LCP) is a project of websites, apps and softwares.</Text>
        <Text style={styles.text}>Any questions? Contact me.</Text>
        <View style={styles.contactcontainer}>
          <Pressable onPress={() => Linking.openURL('https://www.facebook.com/lcp2267')} style={[styles.contactitem, styles.citemfb]}>
            <MaterialCommunityIcons name="facebook" size={30} color={styles.citemfb.color} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://github.com/carvalholuigi25')} style={[styles.contactitem, styles.citemgh]}>
            <MaterialCommunityIcons name="github" size={30} color={styles.citemgh.color} />
          </Pressable>
          <LinearGradient colors={['#FF9A03', '#9C1C9E']} style={styles.contactitem}>
            <Pressable onPress={() => Linking.openURL('https://www.instagram.com/lcp2267')}>
              <MaterialCommunityIcons name="instagram" size={30} color={styles.citemig.color} />
            </Pressable>
          </LinearGradient>
          <LinearGradient colors={['#00FF38', '#003499']} style={styles.contactitem}>
            <Pressable onPress={() => Linking.openURL('mailto:luiscarvalho239@gmail.com')}>
              <MaterialCommunityIcons name="email" size={30} color={styles.citemmail.color} />
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
      <FooterMain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingVertical: 15
  },
  mico: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  ico: {
    color: '#000000'
  },
  txtico: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginLeft: 5,
    lineHeight: 25
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
    padding: 15,
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#000000',
    lineHeight: 25
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
  contactcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  contactitem: {
    backgroundColor: 'rgba(250, 250, 250, 1)',
    color: '#000000',
    borderRadius: 25,
    padding: 5,
    width: 50,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  citemmail: {
    backgroundColor: '#00FF38',
    color: '#ffffff'
  },
  citemfb: {
    backgroundColor: 'blue',
    color: '#ffffff'
  },
  citemgh: {
    backgroundColor: 'black',
    color: '#ffffff'
  },
  citemig: {
    backgroundColor: 'purple',
    color: '#ffffff'
  }
});
