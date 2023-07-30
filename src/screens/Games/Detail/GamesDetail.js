// HomeScreen.js
import React from 'react';
import { Button, View, Text } from 'react-native';
import { fetchAllGamesById } from '../../server/services/gamesService';

const GamesDetailScreen = ({ route, navigation }) => {
  const { game } = route.params;

  return (
    <View style={{flex: 1}}>
        <Text>{game.title}</Text>
        <Text>{game.description}</Text>
        <Button title='Back' onPress={() => { navigation.navigate('gamesDrawer') }} />
    </View>
  );
};

export default GamesDetailScreen;
