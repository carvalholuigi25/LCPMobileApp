// src 1 (for external videos): https://instamobile.io/react-native-tutorials/play-youtube-videos-react-native/
// src 2 (for external videos): https://lonelycpp.github.io/react-native-youtube-iframe/basic-usage

import React, { useState, useCallback, useRef } from "react";
import { Alert, Button, View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

const MediaScreen = () => {
  return (
    <View style={globalStyles.media}>
      <View style={styles.mediaContent}>
        <View style={globalStyles.titleContainer}>
          <MaterialIcons name="perm-media" size={20} />
          <Text style={styles.title}>Media</Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>External video</Text>
              <YoutubePlayer
                width={styles.video.width}
                height={styles.video.height}
                style={styles.video}
                play={false}
                videoId={'iTOaFootkSk'}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaContent: {
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
  video: {
    flex: 1,
    width: 400,
    height: 400
  }
});

export default MediaScreen;