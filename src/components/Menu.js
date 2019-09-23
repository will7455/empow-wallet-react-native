import React from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import Home from '../assets/images/icon-home.svg'
import Wallet from '../assets/images/icon-wallet.svg'
import Muted from '../assets/images/icon-muted.svg'
import Setting from '../assets/images/icon-setting.svg'

export default props => {
    const { navigation, onPress, btnStyle, txtStyle } = props
    var routeName = navigation && navigation.state && navigation.state.routeName ? navigation.state.routeName : ''
    return (
        <View style={styles.waperMenu}>
            <TouchableOpacity style={[styles.default, routeName === 'Home' ? styles.selected : '']} onPress={() => {navigation.navigate('Home')}}>
                <Home></Home>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.default, routeName === 'Wallet' ? styles.selected : '']}>
                <Wallet></Wallet>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.default, routeName === 'Dapp' ? styles.selected : '']} onPress={() => {navigation.navigate('Dapp')}}>
                <Muted></Muted>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.default, routeName === 'Setting' ? styles.selected : '']} onPress={() => {navigation.navigate('Setting')}}>
                <Setting></Setting>
            </TouchableOpacity>
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
        position:'absolute',
        bottom:0,
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
