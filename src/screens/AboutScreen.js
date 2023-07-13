import React, { useCallback, useState } from 'react';
import { Alert, Button, View, Text, StyleSheet, Image, Linking } from 'react-native';
import { globalStyles, myimgs } from '../styles/global';
import { ScrollView } from 'react-native-gesture-handler';

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} style={styles.button} />;
};

function AboutScreen() {
  const [isMyContactInfoShown, setIsMyContactInfoShown] = useState(false);
  const toggleContact = () => setIsMyContactInfoShown(value => !value);

  return (
    <View style={globalStyles.about}>
      <ScrollView style={styles.aboutContent}>
        <Text style={styles.title}>
          About
        </Text>
        <Text style={styles.text}>
          LCP Mobile Projects Expo, which is a native mobile app to show, create and share my projects for everyone or me.
        </Text>
        <View style={styles.containerButtons}>
          <Button style={styles.btnToggleContact} title={!isMyContactInfoShown ? 'Show my contact info' : 'Hide my contact info'} onPress={toggleContact} />
        </View>

        {
          isMyContactInfoShown && (
            <View style={styles.authorInfoContainer}>
              <Text style={styles.title}>
                Creator
              </Text>
              <View style={styles.authorImageContainer}>
                <Image source={myimgs[1].src} style={styles.imgAuthor} />
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.text}>
                  Name: Luis Carvalho
                </Text>
                <Text style={styles.text}>
                  Career: Web developer, programmer, engineer, specialist and technician of IT
                </Text>
                <View style={styles.buttonGrp}>
                  <OpenURLButton url={'mailto://luiscarvalho239@gmail.com'}>Send me a email</OpenURLButton>
                </View>
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutContent: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15
  },
  imgAuthor: {
    width: 150,
    height: 150,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 15
  },
  authorInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  authorImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15
  },
  text: {
    textAlign: 'justify',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    lineHeight: 30
  },
  buttonGrp: {
    marginTop: 15,
    marginBottom: 15
  },
  containerButtons: {
    marginTop: 5
  }
});

export default AboutScreen;