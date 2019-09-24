import {
  createAppContainer,
} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'

import RegisterScreen from './Register'
import CreateWalletScreen from './CreateWallet'
import CreateNewWalletScreen from './CreateNewWallet'
import RestoreWalletScreen from './RestoreWallet'

const AuthNavigation = createStackNavigator({
  Register: RegisterScreen,
  CreateWallet: CreateWalletScreen,
  CreateNewWallet: CreateNewWalletScreen,
  RestoreWallet: RestoreWalletScreen
}, {
  initialRouteName: 'Register',
  headerMode: 'none'
})

export default createAppContainer(AuthNavigation)