/**
 * @format
 */
// require('node-libs-react-native/globals');

import './shim.js'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import StorageService from './src/services/StorageService'
import WalletService from './src/services/WalletService'
import AsyncStorage from '@react-native-community/async-storage';

const MyHeadlessTask = async () => {
    setTimeout(async () => {
        var pw = await AsyncStorage.getItem('pw');
        if (pw) {
            StorageService.unlock(pw).then(async () => {
                console.log("vanvan")
                WalletService.init(null);
                WalletService.updateServiceAddress();
                await WalletService.getAllAccountInfo();
                await WalletService.checkChange();
            }).catch(error => {
                this.setState({
                    error: error,
                    loading: false
                })
            })
        }
    }, 60000)
};

AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
