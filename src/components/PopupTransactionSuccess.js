import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Img from '../assets/images/img-transaction-success.svg'
import Modal from "react-native-modal"

export default props => {
    const { onPress, modalVisible, sendSuccess, onPressLink } = props
    return (
        <Modal isVisible={modalVisible}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.bottomModal}
            onBackdropPress={onPress}>
            <View style={styles.waperPopup}>
                <Text style={[styles.textGarener, { marginBottom: 20 }]}>Transaction success!</Text>
                <Img></Img>
                <Text style={[styles.textGarener, { marginTop: 30, marginBottom: 10 }]}>Click link below</Text>
                <TouchableOpacity onPress={onPressLink}>
                    <Text style={[styles.textGarener, { color: '#ff6a7e' }]}>{sendSuccess <= 30 ? sendSuccess : sendSuccess.substring(0, 30) + '...'}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 13
    },

    waperPopup: {
        backgroundColor: '#413d5d',
        alignItems: 'center',
        padding: 20
    }
})
