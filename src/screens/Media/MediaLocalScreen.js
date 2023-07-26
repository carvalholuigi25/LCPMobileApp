// src 1 (for local videos): https://blog.logrocket.com/adding-videos-react-native-react-native-video/
// src 2 (for local videos): https://docs.expo.dev/versions/latest/sdk/video/#usage

import React, { useState, useCallback, useRef } from "react";
import { Alert, Button, View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const MediaLocalScreen = () => {
  const video = useRef(null);

  return (
    <View style={globalStyles.media}>
      <View style={styles.mediaLocalContent}>
        <View style={globalStyles.titleContainer}>
          <MaterialIcons name="perm-media" size={20} />
          <Text style={styles.title}>Media Local</Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Local video</Text>
              <Video
                ref={video}
                style={styles.videoLocal}
                source={{
                  uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls={true}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={true}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaLocalContent: {
    flex: 1
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
  videoLocal: {
    flex: 1,
    width: 400,
    height: 400
  },
  btnControlPlayerLocal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MediaLocalScreen;