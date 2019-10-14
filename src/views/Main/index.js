// import {
// 	createAppContainer,
// } from 'react-navigation'

// import { createStackNavigator } from 'react-navigation-stack'

// import HomeScreen from './Home'
// import SearchScreen from './Search'
// import SettingScreen from './Setting'
// import CurrencyScreen from './Currency'
// import LanguageScreen from './Language'
// import ChangePasswordScreen from './ChangePassword'
// import SwitchNoteScreen from './SwitchNote'
// import ExportAccountScreen from './ExportAccount'
// import CoinDetailScreen from './CoinDetail'
// import SendScreen from './Send'
// import RamScreen from './Ram'
// import CpuOrNetScreen from './CpuOrNet'
// import ReceiveScreen from './Receive'
// import DappScreen from './Dapp'
// import SeeAllDappScreen from './SeeAllDapp'
// import SearchDappScreen from './SearchDapp'
// import UnlockAccountScreen from './UnlockAccount'
// import CreateEosScreen from './CreateEos'
// import PaymentScreen from './Payment'
// import CreateIostScreen from './CreateIost'
// import Dapp2Screen from './Dapp2'
// import SignInScreen from './SignIn'
// import SignUpScreen from './SignUp'
// import ForgotPasswordScreen from './ForgotPassword'
// import ConnectScreen from './Connect'
// import IntroduceScreen from './Introduce'
// import TermOfServiceScreen from './TermOfService'
// import ContactUsScreen from './ContactUs'
// import WalletScreen from './Wallet'
// import ChangePasswordLeftScreen from './ChangePasswordLeft'
// import SettingLeftScreen from './SettingLeft'
// import WithdrawHistoryScreen from './WithdrawHistory'
// import SignTransactionScreen from './SignTransaction'
// import WebViewScreen from './WebViewScreen'

// const MainNavigation = createStackNavigator({
// 	Home: HomeScreen,
// 	Search: SearchScreen,
// 	Setting: SettingScreen,
// 	Currency: CurrencyScreen,
// 	Language: LanguageScreen,
// 	ChangePassword: ChangePasswordScreen,
// 	SwitchNote: SwitchNoteScreen,
// 	ExportAccount: ExportAccountScreen,
// 	CoinDetail: CoinDetailScreen,
// 	Send: SendScreen,
// 	Ram: RamScreen,
// 	CpuOrNet: CpuOrNetScreen,
// 	Receive: ReceiveScreen,
// 	Dapp: DappScreen,
// 	SeeAllDapp: SeeAllDappScreen,
// 	SearchDapp: SearchDappScreen,
// 	UnlockAccount: UnlockAccountScreen,
// 	CreateEos: CreateEosScreen,
// 	Payment: PaymentScreen,
// 	CreateIost: CreateIostScreen,
// 	Dapp2: Dapp2Screen,
// 	SignIn: SignInScreen,
// 	SignUp: SignUpScreen,
// 	ForgotPassword: ForgotPasswordScreen,
// 	Connect: ConnectScreen,
// 	Introduce: IntroduceScreen,
// 	TermOfService: TermOfServiceScreen,
// 	ContactUs: ContactUsScreen,
// 	Wallet: WalletScreen,
// 	ChangePasswordLeft: ChangePasswordLeftScreen,
// 	SettingLeft: SettingLeftScreen,
// 	WithdrawHistory: WithdrawHistoryScreen,
// 	SignTransaction: SignTransactionScreen,
// 	WebView: WebViewScreen
// }, {
// 	initialRouteName: 'Home',
// 	headerMode: 'none'
// })


// export default MainNavigation

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