import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveSessions = () => {
    const saveKey = async (keyname, value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(keyname, jsonValue);
        } catch (e) {
          console.log("The " + keyname + " couldnt be saved. Error details: " + e);
        }
    };

    return { saveKey };
}

export default SaveSessions;