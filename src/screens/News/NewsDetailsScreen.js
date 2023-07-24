import React, {useCallback} from 'react';
import { Alert, Linking, View, Text, StyleSheet, SafeAreaView, FlatList, Image, Button } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';
import db from '../../data/db.json';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const ItemNewsDet = ({ data, id }) => {
  var mydata = [data].filter(x => x.id == id);

  return mydata && mydata.length > 0 ? (
    <View style={styles.itemNewsDetContainer}>
      <Image source={{ uri: mydata[0].image }} style={styles.itemNewsDetImg} />
      <Text style={styles.itemNewsDetTitle}>{mydata[0].title}</Text>
      <Text style={styles.itemNewsDetText}>
        Categoria: {mydata[0].category} ||
        Data: {mydata[0].date}
      </Text>
      <Text style={styles.itemNewsDetText}>
        Autor: {mydata[0].authorname}
      </Text>
      <Text style={styles.itemNewsDetText}>{mydata[0].desc}</Text>
      <OpenURLButton url={mydata[0].src}>Source</OpenURLButton>
    </View>
  ) : ( <></> );
}

const NewsDetailsScreen = ({navigation, route}) => {
  return (
    <View style={globalStyles.newsDetails}>
      <View style={styles.newsDetailsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="newspaper-o" size={20} />
          <Text style={styles.title}>News Details</Text>
        </View>
        <Text style={styles.text}>This is {!!route.params ? route.params.name : "guest"}'s news!</Text>
        <SafeAreaView style={styles.itemNewsSAVContainer}>
          <FlatList
            data={db.news}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ItemNewsDet data={item} id={!!route.params ? route.params.newsId : -1} />}
            numColumns={1}
            style={styles.itemNewsListContainer}
            contentContainerStyle={{ paddingVertical: 150 }}
          />
          <Button title='Back' onPress={() => navigation.navigate('newsDrawer')} />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsDetailsContent: {
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
  },
  itemNewsDetContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  itemNewsDetImg: {
    width: "100%",
    height: 140,
    objectFit: 'cover',
  },
  itemNewsDetTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'quantico',
    marginTop: 8
  },
  itemNewsDetText: {
    textAlign: 'justify',
    lineHeight: 30,
    fontSize: 14,
    fontFamily: 'quantico',
    marginTop: 15
  }
});

export default NewsDetailsScreen;