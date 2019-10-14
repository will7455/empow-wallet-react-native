import {
	createAppContainer,
} from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import SettingScreen from '../Setting'
import CurrencyScreen from '../Currency'
import LanguageScreen from '../Language'
import ChangePasswordScreen from '../ChangePassword'
import SwitchNoteScreen from '../SwitchNote'
import ExportAccountScreen from '../ExportAccount'
import UnlockAccountScreen from '../UnlockAccount'
import IntroduceScreen from '../Introduce'
import TermOfServiceScreen from '../TermOfService'
import ContactUsScreen from '../ContactUs'


export default createStackNavigator({
	Setting: SettingScreen,
	Currency: CurrencyScreen,
	Language: LanguageScreen,
	ChangePassword: ChangePasswordScreen,
	SwitchNote: SwitchNoteScreen,
	ExportAccount: ExportAccountScreen,
	UnlockAccount: UnlockAccountScreen,
	Introduce: IntroduceScreen,
	TermOfService: TermOfServiceScreen,
	ContactUs: ContactUsScreen,
}, {
	initialRouteName: 'Setting',
	headerMode: 'none'
})
