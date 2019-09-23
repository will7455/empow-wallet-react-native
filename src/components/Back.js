import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import ArrowLeft from '../assets/images/arrow-left.svg'
import React, { Component } from 'react'

class Back extends Component {
    onPress = () => {
        const { navigation, preRoute, btnStyle, txtStyle } = this.props
        if (preRoute) {
            navigation.navigate(preRoute);
        } else {
            navigation.goBack()
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.waperButton} onPress={() => this.onPress()}>
                <ArrowLeft fill="white"></ArrowLeft>
            </TouchableOpacity>
        )
    }
}


export default Back

const styles = StyleSheet.create({
    waperButton: {
        width: 32,
        height: 32,
        borderRadius: 12,
        backgroundColor: '#534e73',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
