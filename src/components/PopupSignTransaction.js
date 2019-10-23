import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Picker, Dimensions } from 'react-native'
import Modal from "react-native-modal"
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import LinearGradient from 'react-native-linear-gradient'

export default props => {
    const { onPress, modalVisible, transaction, onReject,  onAccept} = props

    return (
        <Modal isVisible={modalVisible}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={Styles.bottomModal}
            onBackdropPress={onPress}>
            {transaction &&
                <View style={Styles.waperContainer}>
                    <View style={Styles.container}>
                        <View style={Styles.waperGroup}>
                            <Text style={[Styles.textGarener, { fontSize: 17, marginBottom: 10 }]}>{`${transaction.coin.toUpperCase()} ${transaction.type.toUpperCase()} TRANSACTION`}</Text>

                            {transaction.contractAddress && <View style={Styles.child}>
                                <Text style={[Styles.textGarener]}>Address</Text>
                                <Text style={[Styles.textGarener]}>{transaction.contractAddress}</Text>
                            </View>}

                            {transaction.amount && <View style={Styles.child}>
                                <Text style={[Styles.textGarener]}>Amount</Text>
                                <Text style={[Styles.textGarener]}>{`${transaction.amount} ${transaction.symbol}`}</Text>
                            </View>}
                        </View>
                        <View style={Styles.waperGroup}>
                            <Text style={[Styles.textGarener]}>Enable automatic signing. This allows Empow to automatically sign similar transactions on your behelf.</Text>
                            <View style={Styles.waperPicker}>
                                <Picker
                                    selectedValue={0}
                                    style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                                    onValueChange={(itemValue, itemIndex) => this.onChangeSelect(itemValue)}
                                >
                                    <Picker.Item label="Don't automatically sign" value={0} />
                                    <Picker.Item label="For fifteen minutes" value={15 * 60 * 1000} />
                                    <Picker.Item label="For thirty minutes" value={30 * 60 * 1000} />
                                    <Picker.Item label="For one hour" value={60 * 60 * 1000} />
                                    <Picker.Item label="For one day" value={24 * 60 * 60 * 1000} />
                                </Picker>
                            </View>
                            <View style={Styles.waperCheckbox}>
                                <CircleCheckBox
                                    checked={false}
                                    labelPosition={LABEL_POSITION.RIGHT}
                                    outerSize={15}
                                    innerSize={10}
                                    outerColor='white'
                                    innerColor='#EE4F5F'
                                />
                                <Text style={[Styles.textGarener, { marginLeft: 10 }]}>Add the app to the while list so it will be authenticated automatically.The pop-up window will also stop showing.</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ width: '48%' }}>
                                <TouchableOpacity onPress={() => onReject()} style={[Styles.waperButton, { borderColor: '#ff6a7e', borderWidth: 1 }]}>
                                    <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '48%' }}>
                                <TouchableOpacity onPress={() => onAccept()}>
                                    <LinearGradient
                                        style={Styles.waperButton}
                                        colors={['#f94f4f', '#8e3ddf']}
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    >
                                        <Text style={[Styles.textGarener]}>Accept</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </Modal>
    )
}

const screenWidth = Math.round(Dimensions.get('window').width);

const Styles = StyleSheet.create({

    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#3c3854'
    },

    container: {
        width: screenWidth - 20,
        paddingTop: 20
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 13
    },

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    waperGroup: {
        backgroundColor: '#534e73',
        borderRadius: 8,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        marginTop: 10
    },

    child: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },

    waperPicker: {
        width: '100%',
        borderRadius: 8,
        height: 32,
        elevation: 4,
        overflow: 'hidden',
        marginTop: 15
    },

    waperCheckbox: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },

    waperButton: {
        width: '100%',
        height: 46,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        marginTop: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    }
});