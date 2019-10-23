import React, { Component } from 'react'
import {
    View,
    Text,
    Picker,
} from 'react-native'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Back from '../../../components/Back'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import StorageService from '../../../services/StorageService'
import WalletService from '../../../services/WalletService'

export default class SignTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: 0,
            loading: false,
            checked: false
        }
    }

    onChangeSelect = (itemValue) => {
        this.setState({
            defaultValue: itemValue,
        })
    }

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onAccept = () => {
        const { defaultValue, checked } = this.state
        const now = new Date().getTime()
        let timeExpired = now + defaultValue
        if (checked) timeExpired = -1
        if (defaultValue === 0) timeExpired = 0

        if (timeExpired && timeExpired != 0) {
            StorageService.addWhitelist(WalletService.transactionQueue.transaction.contractAddress, timeExpired)
        }

        WalletService.acceptTransaction()
    }

    onReject = () => {
        WalletService.rejectTransaction((uuid, messageUUID) => {
            console.log('Transaction reject by user')
        })
    }

    render() {
        const { defaultValue, loadingReject, loading } = this.state

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Sign Transaction</Text>
                    </View>
                    <View style={Styles.waperGroup}>
                        <Text style={[Styles.textGarener, { fontSize: 17, marginBottom: 10 }]}>Confirmation Request</Text>
                        <Text style={[Styles.textGarener, { marginBottom: 20 }]}>The website cdn.tronbet.io is requesting your permission to use a smart contract</Text>

                        <View style={Styles.child}>
                            <Text style={[Styles.textGarener]}>EOS Address</Text>
                            <Text style={[Styles.textGarener]}>132465798456</Text>
                        </View>
                        <View style={Styles.child}>
                            <Text style={[Styles.textGarener]}>Cost</Text>
                            <Text style={[Styles.textGarener]}>10 TRX</Text>
                        </View>
                    </View>
                    <View style={Styles.waperGroup}>
                        <Text style={[Styles.textGarener]}>Enable automatic signing. This allows Empow to automatically sign similar transactions on your behelf.</Text>
                        <View style={Styles.waperPicker}>
                            <Picker
                                selectedValue={defaultValue}
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
                                checked={this.state.checked}
                                onToggle={this.toggleCheckbox}
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
                            <TouchableOpacity onPress={() => this.onReject()} style={[Styles.waperButton, { borderColor: '#ff6a7e', borderWidth: 1 }]}>
                                {loadingReject && <View>
                                    <ActivityIndicator color='white'></ActivityIndicator>
                                </View>}
                                <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%' }}>
                            <TouchableOpacity onPress={() => this.onAccept()}>
                                <LinearGradient
                                    style={Styles.waperButton}
                                    colors={['#f94f4f', '#8e3ddf']}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                >
                                    {loading && <View>
                                        <ActivityIndicator color='white'></ActivityIndicator>
                                    </View>}
                                    <Text style={[Styles.textGarener]}>Accept</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}