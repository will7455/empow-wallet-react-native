import {
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation'

// AuthLoading
import AuthLoadingScreen from './src/views/AuthLoading'
// AuthStack
import AuthStack from './src/views/Authentication'
// MainStack
import MainStack from './src/views/Main'
// UnlockStack
import UnlockStack from './src/views/Unlock'

import React from 'react';

import { Provider } from 'react-redux';
import store from './src/store'
import WalletService from './src/services/WalletService'
import Heartbeat from './Heartbeat'

WalletService.store = store;

setInterval(() => {
	Heartbeat.startService();
	setTimeout(() => {
		Heartbeat.stopService();
	}, 1000);
}, 60000)

const AppNavigation = createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
	Auth: AuthStack,
	Main: MainStack,
	Unlock: UnlockStack
}, {
	initialRouteName: 'AuthLoading',
})

const Container = createAppContainer(AppNavigation)

export default class App extends React.Component {
    render() {
        return (
			<Provider store={store}>
				<Container></Container>
			</Provider>
        );
    }
}