import {
	createAppContainer,
} from 'react-navigation'

import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WalletSeleted from '../../assets/images/icon-wallet.svg'
import Wallet from '../../assets/images/icon-wallet-selected.svg'
import Setting from '../../assets/images/icon-setting.svg'
import SettingSelected from '../../assets/images/icon-setting-selected.svg'
import Home from '../../assets/images/icon-home.svg'
import HomeSelected from '../../assets/images/icon-home-selected.svg'

import TabHome from './TabHome'
import TabDapp from './TabDapp'
import TabSetting from './TabSetting'


const TabNavigation = createBottomTabNavigator({
	Home: {
		screen: TabHome,
		navigationOptions: {
			tabBarIcon: ({ focused }) =>
				focused ? <WalletSeleted></WalletSeleted> : <Wallet></Wallet>
		}
	},
	Dapp: {
		screen: TabDapp,
		navigationOptions: {
			tabBarIcon: ({ focused }) =>
				focused ? <HomeSelected></HomeSelected> : <Home></Home>
		}
	},
	Setting: {
		screen: TabSetting,
		navigationOptions: {
			tabBarIcon: ({ focused }) =>
				focused ? <SettingSelected></SettingSelected> : <Setting></Setting>
		}
	}
}, {
	tabBarOptions: {
		showLabel: false,
		style: {
			backgroundColor: '#3c3854',
			elevation: 6,
			borderWidth: 0
		}
	}
});

const MainNavigation = createStackNavigator({
	TabNavigation
}, {
	headerMode: 'none'
})


export default MainNavigation

// export default createStackNavigator({ MainNavigation }, { headerMode: "none" });