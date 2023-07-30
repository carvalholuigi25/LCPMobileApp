// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchAllGames } from '../../server/services/gamesService';

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

  return (
    <View>
      <FlatList
        data={games}
        keyExtractor={(game) => game.id.toString()}
        renderItem={({ game }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('gamesDetailsDrawer', { game })}
          >
            <Text>{game.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GamesScreen;
