import { AppRegistry, Platform } from 'react-native';

import App from './App';
import { decode, encode } from 'base-64';

// if (Platform.OS === 'ios'){
    if (!global.btoa) {
        global.btoa = encode;
    }
    
    if (!global.atob) {
        global.atob = decode;
    }
// }


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent('woozeee', () => App);
