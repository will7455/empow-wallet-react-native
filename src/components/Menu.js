import React from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import WalletSeleted from '../assets/images/icon-wallet.svg'
import Wallet from '../assets/images/icon-wallet-selected.svg'
import Setting from '../assets/images/icon-setting.svg'
import SettingSelected from '../assets/images/icon-setting-selected.svg'
import Home from '../assets/images/icon-home.svg'
import HomeSelected from '../assets/images/icon-home-selected.svg'


export default props => {
    const { navigation, onPress, btnStyle, txtStyle } = props
    var routeName = navigation && navigation.state && navigation.state.routeName ? navigation.state.routeName : ''
    var isDapp = routeName === 'SignIn' || routeName === 'ForgotPassword' || routeName === 'SignUp' || routeName === 'Dapp2' || routeName === 'SettingLeft';
    return (
        <View style={styles.waperMenu}>
            {routeName !== 'Home' && <TouchableOpacity style={styles.default} onPress={() => { navigation.navigate('Home') }}>
                <Wallet></Wallet>
            </TouchableOpacity>}

            {routeName === 'Home' && <TouchableOpacity style={styles.default} onPress={() => { navigation.navigate('Home') }}>
                <WalletSeleted></WalletSeleted>
            </TouchableOpacity>}

            {!isDapp && <TouchableOpacity style={[styles.default, styles.selected]} onPress={() => { navigation.navigate('SignIn') }}>
                <Home></Home>
            </TouchableOpacity>}

            {isDapp && <TouchableOpacity style={[styles.default, styles.selected]} onPress={() => { navigation.navigate('SignIn') }}>
                <HomeSelected></HomeSelected>
            </TouchableOpacity>}

            {routeName !== 'Setting' && <TouchableOpacity style={styles.default} onPress={() => { navigation.navigate('Setting') }}>
                <Setting></Setting>
            </TouchableOpacity>}

            {routeName === 'Setting' && <TouchableOpacity style={styles.default} onPress={() => { navigation.navigate('Setting') }}>
                <SettingSelected></SettingSelected>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    waperMenu: {
        width: '100%',
        height: 45,
        backgroundColor: '#3c3854',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        elevation: 6
    },

    selected: {
        backgroundColor: '#534e73',
    },

    default: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})
