// Loading.tsx
import React from 'react';
import { View, StyleSheet, Alert, Pressable, Text, Image } from 'react-native';

const LinksProjects: React.FC<any> = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.mprojects}>
        <Pressable onPress={() => Alert.alert('Websites!', 'Coming soon...')} style={styles.projectsitems}>
          <Text style={styles.projectsitemsct}>0</Text>
          <Image source={require('../../../assets/images/projects/iwebsites.png')} style={styles.projectsitemsimg} width={50} height={50} />
          <Text style={styles.projectsitemstxt}>Websites</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Softwares!', 'Coming soon...')} style={styles.projectsitems}>
          <Text style={styles.projectsitemsct}>0</Text>
          <Image source={require('../../../assets/images/projects/isoftwares.png')} style={styles.projectsitemsimg} width={50} height={50} />
          <Text style={styles.projectsitemstxt}>Softwares</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Apps!', 'Coming soon...')} style={styles.projectsitems}>
          <Text style={styles.projectsitemsct}>0</Text>
          <Image source={require('../../../assets/images/projects/iapps.png')} style={styles.projectsitemsimg} width={50} height={50} />
          <Text style={styles.projectsitemstxt}>Apps</Text>
        </Pressable>
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
  mprojects: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flex: 1,
    flexWrap: 'wrap'
  },
  projectsitems: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    width: 100,
    borderColor: '#47FE1A',
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  projectsitemsimg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  projectsitemstxt: {
    alignItems: 'center',
    fontSize: 14
  },
  projectsitemsct: {
    position: 'absolute',
    top: '-15%',
    right: '-5%',
    bottom: 0,
    backgroundColor: '#47FE1A',
    margin: 'auto',
    padding: 5,
    borderRadius: 10,
    width: 20,
    height: 20,
    fontSize: 10,
    lineHeight: 10,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default LinksProjects;
