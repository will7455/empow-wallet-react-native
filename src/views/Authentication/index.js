import {
  createAppContainer,
} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'

import LoginScreen from './Login'
import RegisterScreen from './Register'
import ResetScreen from './Reset'
import CreateWalletScreen from './CreateWallet'
import CreateNewWalletScreen from './CreateNewWallet'
import RestoreWalletScreen from './RestoreWallet'

const AuthNavigation = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Reset: ResetScreen,
  CreateWallet: CreateWalletScreen,
  CreateNewWallet: CreateNewWalletScreen,
  RestoreWallet: RestoreWalletScreen
}, {
  initialRouteName: 'Register',
  headerMode: 'none'
})

export default createAppContainer(AuthNavigation)