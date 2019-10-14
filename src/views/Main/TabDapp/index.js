import {
	createAppContainer,
} from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../Home'
import CreateEosScreen from '../CreateEos'
import PaymentScreen from '../Payment'
import CreateIostScreen from '../CreateIost'
import Dapp2Screen from '../Dapp2'
import SignInScreen from '../SignIn'
import SignUpScreen from '../SignUp'
import ForgotPasswordScreen from '../ForgotPassword'
import ConnectScreen from '../Connect'
import TermOfServiceScreen from '../TermOfService'
import WalletScreen from '../Wallet'
import ChangePasswordLeftScreen from '../ChangePasswordLeft'
import SettingLeftScreen from '../SettingLeft'
import WithdrawHistoryScreen from '../WithdrawHistory'
import SignTransactionScreen from '../SignTransaction'
import WebViewScreen from '../WebViewScreen'

export default createStackNavigator({
	Home: HomeScreen,
	CreateEos: CreateEosScreen,
	Payment: PaymentScreen,
	CreateIost: CreateIostScreen,
	Dapp2: Dapp2Screen,
	SignIn: SignInScreen,
	SignUp: SignUpScreen,
	ForgotPassword: ForgotPasswordScreen,
	Connect: ConnectScreen,
	TermOfService: TermOfServiceScreen,
	Wallet: WalletScreen,
	ChangePasswordLeft: ChangePasswordLeftScreen,
	SettingLeft: SettingLeftScreen,
	WithdrawHistory: WithdrawHistoryScreen,
	SignTransaction: SignTransactionScreen,
	WebView: WebViewScreen
}, {
	initialRouteName: 'SignIn',
	headerMode: 'none'
})
