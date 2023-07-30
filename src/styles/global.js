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
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
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
    about: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    main: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    search: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    addNews: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    notifications: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    users: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    usersDetails: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    news: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    newsDetails: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    media: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    todoItems: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    settings: {
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
    src: require('../assets/images/bkg-min.jpg')
  }
];

export const gameImgs = [
  {
    id: 1,
    title: 'GTA V',
    srcImg: require('../assets/images/games/images/gtav.jpeg'),
    srcCover: require('../assets/images/games/covers/gtav.png')
  }
];