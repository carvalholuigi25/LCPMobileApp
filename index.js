import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { registerRootComponent } from 'expo';

if(Platform.OS === "android") {
    registerRootComponent(App);
} else {
    AppRegistry.registerComponent(appName, () => App);
}