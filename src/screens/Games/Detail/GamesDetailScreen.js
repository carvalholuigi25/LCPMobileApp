import React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { gameImgs } from '../../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

const GamesDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.savContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.gamesContainer}>
          <Image source={item && ["http", "https", "file"].includes(item.image) ? { uri: item.image } : gameImgs[item.id - 1].srcImg} style={styles.image} />
          <View style={styles.coverContainer}>
            <Image source={item && ["http", "https", "file"].includes(item.cover) ? { uri: item.cover } : gameImgs[item.id - 1].srcCover} style={styles.cover} />
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.btnActions}>
              <Button title="Update" style={styles.btn} onPress={() => { navigation.navigate("updateGamesDrawer", { id: item.id, item: item }) }} />
              <Button title="Delete" style={styles.btn} onPress={() => { navigation.navigate("deleteGamesDrawer", { id: item.id }) }} />
            </View>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Companies:</Text> {item.companies}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Publishers:</Text> {item.publishers}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Category:</Text> {item.category}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Game Modes:</Text> {item.gamemodes}
            </Text>
            <Text style={styles.desc}>
              {item.description}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Platforms:</Text> {item.platforms}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Release Date:</Text> {item.releaseDate}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Rating:</Text> {item.rating}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.stitle}>Age Rate:</Text> {item.ageRate}
            </Text>
            <Button title='Back' onPress={() => { navigation.navigate('gamesDrawer') }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  savContainer: { 
    flex: 1, 
    padding: 0, 
    margin: 0
  },
  container: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  gamesContainer: {
    flex: 1,
    width: '100%'
  },
  image: {
    width: '100%',
    height: 200,
    margin: 0,
    padding: 0,
    objectFit: 'cover',
    resizeMode: 'cover'
  },
  coverContainer: {
    position: 'absolute',
    top: 0,
    bottom: 'auto',
    left: '50%',
    right: 0,
    transform: [
      { translateX: -60 },
      { translateY: 120 },
    ],
    margin: 0,
    padding: 0,
    width: '100%'
  },
  cover: {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    objectFit: 'contain',
    resizeMode: 'cover'
  },
  body: {
    margin: 0,
    padding: 15
  },
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20
  },
  stitle: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold'
  },
  desc: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 30
  },
  info: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 30
  },
  btnActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    padding: 15
  },
  btn: {
    margin: 15,
    padding: 15,
    borderRadius: 15
  }
});

export default GamesDetailScreen;
