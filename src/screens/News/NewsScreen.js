import * as React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';
import db from '../../data/db.json';

const ItemNews = ({ data, navigation }) => (
  <View style={styles.itemNewsContainer}>
    <TouchableOpacity style={styles.itemNewsTOContainer} onPress={() => 
      navigation.navigate('newsDetailsDrawer', { newsId: data.id })
    }>
      <Image source={{ uri: data.image }} style={styles.itemNewsImg} />
      <Text style={styles.itemNewsTitle}>{data.title}</Text>
    </TouchableOpacity>
  </View>
);

const NewsScreen = ({ navigation }) => {
  const renderItem = ({item, index}) => {
    return (
      <ItemNews data={item} navigation={navigation} />
    )
  };

  return (
    <View style={globalStyles.news}>
      <View style={styles.newsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="newspaper-o" size={20} />
          <Text style={styles.title}>News</Text>
        </View>
        <SafeAreaView style={styles.itemNewsSAVContainer}>
          <FlatList
            data={db.news}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            style={styles.itemNewsListContainer}
            contentContainerStyle={{ paddingVertical: 15 }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsContent: {
    flex: 1,
    width: '100%'
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
  },
  itemNewsSAVContainer: {
    flex: 1,
  },
  itemNewsTOContainer: {
    flex: 1,
  },
  itemNewsListContainer: {
    flex: 1
  },
  itemNewsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  itemNewsScrollView: {
    marginHorizontal: 15,
  },
  itemNewsImg: {
    width: "100%",
    height: 140,
    objectFit: 'cover',
  },
  itemNewsTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'quantico',
    marginTop: 8
  }
});

export default NewsScreen;