import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadSessions = () => {
    const loadKey = async (keyname) => {
        try {
          const jsonValue = await AsyncStorage.getItem(keyname);
          const mval = jsonValue != null ? JSON.parse(jsonValue) : null;
          return mval;
        } catch (e) {
          console.log("The " + keyname + " couldnt be loaded. Error details: " + e);
        }
    }

    return { loadKey };
}

export default LoadSessions;