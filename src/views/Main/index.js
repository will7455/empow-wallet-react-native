import {
	createAppContainer,
} from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './Home'
import SearchScreen from './Search'
import SettingScreen from './Setting'
import CurrencyScreen from './Currency'
import LanguageScreen from './Language'
import ChangePasswordScreen from './ChangePassword'
import SwitchNoteScreen from './SwitchNote'
import ExportAccountScreen from './ExportAccount'
import CoinDetailScreen from './CoinDetail'
import SendScreen from './Send'
import RamScreen from './Ram'
import CpuOrNetScreen from './CpuOrNet'
import ReceiveScreen from './Receive'
import DappScreen from './Dapp'
import SeeAllDappScreen from './SeeAllDapp'
import SearchDappScreen from './SearchDapp'
import UnlockAccountScreen from './UnlockAccount'
import CreateEosScreen from './CreateEos'
import PaymentScreen from './Payment'
import CreateIostScreen from './CreateIost'
import Dapp2Screen from './Dapp2'
import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'
import ForgotPasswordScreen from './ForgotPassword'
import ConnectScreen from './Connect'
import IntroduceScreen from './Introduce'
import TermOfServiceScreen from './TermOfService'
import ContactUsScreen from './ContactUs'
import WalletScreen from './Wallet'
import ChangePasswordLeftScreen from './ChangePasswordLeft'

const MainNavigation = createStackNavigator({
	Home: HomeScreen,
	Search: SearchScreen,
	Setting: SettingScreen,
	Currency: CurrencyScreen,
	Language: LanguageScreen,
	ChangePassword: ChangePasswordScreen,
	SwitchNote: SwitchNoteScreen,
	ExportAccount: ExportAccountScreen,
	CoinDetail: CoinDetailScreen,
	Send: SendScreen,
	Ram: RamScreen,
	CpuOrNet: CpuOrNetScreen,
	Receive: ReceiveScreen,
	Dapp: DappScreen,
	SeeAllDapp: SeeAllDappScreen,
	SearchDapp: SearchDappScreen,
	UnlockAccount: UnlockAccountScreen,
	CreateEos: CreateEosScreen,
	Payment: PaymentScreen,
	CreateIost: CreateIostScreen,
	Dapp2: Dapp2Screen,
	SignIn: SignInScreen,
	SignUp: SignUpScreen,
	ForgotPassword: ForgotPasswordScreen,
	Connect: ConnectScreen,
	Introduce: IntroduceScreen,
	TermOfService: TermOfServiceScreen,
	ContactUs: ContactUsScreen,
	Wallet: WalletScreen,
	ChangePasswordLeft: ChangePasswordLeftScreen
}, {
	initialRouteName: 'Home',
	headerMode: 'none'
})


export default MainNavigation