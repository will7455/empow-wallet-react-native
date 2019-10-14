import {
	createAppContainer,
} from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../Home'
import SearchScreen from '../Search'
import CoinDetailScreen from '../CoinDetail'
import SendScreen from '../Send'
import RamScreen from '../Ram'
import CpuOrNetScreen from '../CpuOrNet'
import ReceiveScreen from '../Receive'
import SearchDappScreen from '../SearchDapp'
import CreateEosScreen from '../CreateEos'
import PaymentScreen from '../Payment'
import CreateIostScreen from '../CreateIost'
import WalletScreen from '../Wallet'
import WithdrawHistoryScreen from '../WithdrawHistory'
import SignTransactionScreen from '../SignTransaction'
import WebViewScreen from '../WebViewScreen'

export default createStackNavigator({
	Home: HomeScreen,
	Search: SearchScreen,
	CoinDetail: CoinDetailScreen,
	Send: SendScreen,
	Ram: RamScreen,
	CpuOrNet: CpuOrNetScreen,
	Receive: ReceiveScreen,
	SearchDapp: SearchDappScreen,
	CreateEos: CreateEosScreen,
	Payment: PaymentScreen,
	CreateIost: CreateIostScreen,
	Wallet: WalletScreen,
	WithdrawHistory: WithdrawHistoryScreen,
	SignTransaction: SignTransactionScreen,
	WebView: WebViewScreen
}, {
	initialRouteName: 'Home',
	headerMode: 'none'
})
