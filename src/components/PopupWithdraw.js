import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Clipboard } from 'react-native'
import Success from '../assets/images/withdraw-success.svg'
import Error from '../assets/images/withdraw-error.svg'
import IconCopy from '../assets/images/icon-copy.svg'
import Modal from "react-native-modal"

export default props => {
    const { onPress, modalVisible, error, address } = props
    return (

        <View>
            {error && <Modal isVisible={modalVisible}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.bottomModal}
                onBackdropPress={onPress}>
                <View style={styles.waperPopup}>
                    <Text style={[styles.textGarener, { marginBottom: 20, color: '#F94F4F' }]}>Error</Text>
                    <Error></Error>
                    <Text style={[styles.textGarener, { color: '#F94F4F', marginTop: 5 }]}>{error}</Text>
                </View>
            </Modal>}

            {address && <Modal isVisible={modalVisible}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.bottomModal}
                onBackdropPress={onPress}>
                <View style={styles.waperPopup}>
                    <Text style={[styles.textGarener, { marginBottom: 20 }]}>Withdraw success</Text>
                    <Success></Success>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Text style={[styles.textGarener, {marginRight: 5}]}>{address}</Text>
                        <TouchableOpacity onPress={() => { Clipboard.setString(address) }}>
                            <IconCopy />
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>}
        </View>
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
