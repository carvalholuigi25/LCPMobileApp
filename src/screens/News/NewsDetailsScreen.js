import React, { useCallback } from 'react';
import { Alert, Linking, View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image, Button } from 'react-native';
import { globalStyles } from '../../styles/global';
import { FontAwesome } from '@expo/vector-icons';
import db from '../../data/db.json';

const OpenURLButton = ({ url, children }) => {
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
      <Text style={styles.itemNewsDetText}>
        {mydata[0].desc}
      </Text>
      <OpenURLButton url={mydata[0].src} style={styles.itemNewsDetBtnSrc}>Source</OpenURLButton>
    </View>
  ) : (<></>);
}

const NewsDetailsScreen = ({ navigation, route }) => {
  const renderItem = ({ item, index }) => {
    return (
      <ItemNewsDet data={item} id={!!route.params ? route.params.newsId : -1} />
    )
  };

  return (
    <View style={globalStyles.newsDetails}>
      <View style={styles.newsDetailsContent}>
        <View style={globalStyles.titleContainer}>
          <FontAwesome name="newspaper-o" size={20} />
          <Text style={styles.title}>News Details</Text>
        </View>
        <SafeAreaView style={styles.itemNewsSAVContainer}>
            <FlatList
              data={db.news}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={1}
              style={styles.itemNewsListContainer}
              contentContainerStyle={{ paddingVertical: 15 }}
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
  itemNewsSAVContainer: {
    flex: 1,
  },
  itemNewsListContainer: {
    flex: 1
  },
  itemNewsDetContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  itemNewsDetScrollView: {
    marginHorizontal: 15,
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
    marginTop: 15,
    marginBottom: 15
  },
  itemNewsDetBtnSrc: {
    marginTop: 15
  }
});

export default NewsDetailsScreen;