import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Img from '../assets/images/img-transaction-success.svg'
import Modal from "react-native-modal"

export default props => {
    const { onPress, modalVisible, phone, call } = props
    return (
        <Modal isVisible={modalVisible}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.bottomModal}
            onBackdropPress={onPress}>
            <View style={styles.waperPopup}>
                <Text style={[styles.textGarener, { marginBottom: 20 }]}>Select the number to call</Text>
                <TouchableOpacity onPress={call}>
                    <Text style={[styles.textPhone]}>{phone}</Text>
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
        color: '#8B8B8B',
        fontFamily: 'Poppins-Black',
        fontSize: 11
    },
    textPhone: {
        color: '#007AFF',
        fontFamily: 'Poppins-Black',
        fontSize: 13
    },

    waperPopup: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        borderRadius: 8
    }
})
