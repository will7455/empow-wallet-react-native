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
            loading: false,
            accountName: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.accountName ? this.props.navigation.state.params.accountName : '',
            publicKey: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.publicKey ? this.props.navigation.state.params.publicKey : '',
            index: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.index ? this.props.navigation.state.params.index : '',
            payment: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.payment ? this.props.navigation.state.params.payment : ''
        }
    }

    clickCreate = async () => {

        this.setState({
            loading: true
        })


        const { accountName, index, payment } = this.state

        setTimeout(async () => {
            try {
                var checkEosAccount = await WalletService.checkEosAccount(accountName);

                if (checkEosAccount) {
                    WalletService.createEosAccount(payment, accountName, async (error) => {
                        if (error) {
                            this.setState({
                                error: error.message ? error.message : error,
                                loading: false
                            })
                            return;
                        }

                        await WalletService.getAllAccountInfo();
                        WalletService.startPool();

                        this.props.navigation.navigate('CoinDetail', {
                            index
                        });
                    })
                }
            } catch (error) {
                this.setState({
                    error: error.message,
                    loading: false
                })
            }
        }, 1000);

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
                                    <IconCopy />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={Styles.notify}>
                            <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>Make sure you include this memo when you send it or your funds will be lost!</Text>
                        </View>

                        <Button children="Click after Transfer" onPress={() => this.clickCreate()} isLoading={this.state.loading}></Button>
                    </View>
                </View>
            </View>
        )
    }
}