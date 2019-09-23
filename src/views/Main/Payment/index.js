import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Picker,
    TextInput,
    Clipboard
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import WalletService from '../../../services/WalletService'
import IconCopy from '../../../assets/images/icon-copy.svg'

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountName: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.accountName ? this.props.navigation.state.params.accountName : '',
            publicKey: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.publicKey ? this.props.navigation.state.params.publicKey : ''
        }
    }

    clickCreate = async () => {
        const { accountName } = this.state

        try {
            var result = await WalletService.checkEosAccount(accountName);
            console.log(result)
        } catch (error) {
            // this.setState({
            //     error: error.message
            // })
        }
    }

    render() {

        const { accountName, publicKey } = this.state

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                    </View>
                    <View style={Styles.waperContent}>
                        <View style={Styles.waperInfo}>
                            <Text style={[Styles.textGarener]}>Confirmation Request</Text>
                            <Text style={[Styles.textGarener]}>Send 0.4730 EOS to signupeoseos</Text>
                            <Text style={[Styles.textGarener, { color: '#8f90a2', marginTop: 10 }]}>Memo</Text>
                            <View style={Styles.waperInput}>
                                <Text style={[Styles.textGarener]}>{accountName}-{publicKey.substring(0, 20) + '...'}</Text>
                                <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10 }} onPress={() => { Clipboard.setString(`${accountName}-${publicKey}`) }}>
                                    <IconCopy/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={Styles.notify}>
                            <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>Make sure you include this memo when you send it or your funds will be lost!</Text>
                        </View>

                        <Button children="Click after Transfer" onPress={() => this.clickCreate()}></Button>
                    </View>
                </View>
            </View>
        )
    }
}