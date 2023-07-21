import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    mybkgimg: {
      flex: 1,
      resizeMode: 'cover',
      width: '100%',
      height: '100%'
    },
    myscrollview: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    shadowProp: {
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 5 },
      textShadowRadius: 10,
      fontWeight: '800'
    },
    home: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    },
    login: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    register: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    main: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    about: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    }
});

export const myimgs = [
  {
    id: 1,
    src: require('../assets/images/logo.png')
  },
  {
    id: 2,
    src: require('../assets/images/author.jpg')
  },
  {
    id: 3,
    src: require('../assets/images/bkg.jpg')
  }
];