import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    home: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
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
  }
];