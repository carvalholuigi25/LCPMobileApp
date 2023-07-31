// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchAllGames } from '../../server/services/gamesService';
import { SafeAreaView } from 'react-native-safe-area-context';

const GamesScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchAllGames();
      setGames(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('gamesDetailsDrawer', { item })}
      >
        <Image 
          style={styles.image} 
          source={{ uri: item.cover }} 
          alt={`${item.title}`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.gamesContainer}>
      <View style={styles.gamesContent}>
        <SafeAreaView style={styles.gamesSAV}>
          <Button title="Create new game" style={styles.btn} onPress={() => navigation.navigate("createGamesDrawer")} />

          <FlatList
            data={games}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            style={styles.gamesListContainer}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gamesContent: {
    flex: 1,
    width: '100%'
  },
  gamesContainer: {
    flex: 1,
    width: '100%'
  },
  gamesSAV: {
    flex: 1,
  },
  gamesListContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  image: {
    width: 128,
    height: 128,
    marginTop: 15,
    marginBottom: 15,
    objectFit: 'contain',
    aspectRatio: 'auto'
  },
  btn: {
    margin: 15,
    padding: 15,
    borderRadius: 15
  }
});

export default GamesScreen;
