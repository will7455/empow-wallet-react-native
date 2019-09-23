import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Linking
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import PopupTransactionSuccess from '../../../components/PopupTransactionSuccess'
import WalletService from '../../../services/WalletService'
import { TX_API } from '../../../constants/index'

export default class Send extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            accountInfo: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.accountInfo ? this.props.navigation.state.params.accountInfo : [],
            modalVisible: false,
            sendSuccess: false
        }
    }

    onChangeText = (text, index) => {
        if (index === 1) {
            this.setState({
                sendTo: text
            })
        }

        if (index === 2) {
            this.setState({
                sendAmount: text
            })
        }

        if (index === 3) {
            this.setState({
                sendMemo: text
            })
        }
    }

    clickSend = async () => {
        const { sendTo, sendAmount, sendMemo, accountInfo } = this.state
        const data = { to: sendTo, value: sendAmount, memo: sendMemo, coinInfo: accountInfo }
        const result = await WalletService.send(data);

        if (result.error) {
            this.setState({
                error: result.error
            })
        } else {
            this.setState({
                modalVisible: true,
                sendSuccess: result.txid ? result.txid : 'Send Transaction successfully',
            })
        }
    }

    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    onPressLink = (txURL) => {
        Linking.canOpenURL(txURL).then(supported => {
            if (supported) {
                Linking.openURL(txURL);
            } else {
                console.log("Don't know how to open URI: " + txURL);
            }
        });
    }

    renderModel() {
        const { accountInfo, sendSuccess } = this.state;

        let txURL = ''

        if (accountInfo.type == 'coin') {
            txURL = TX_API[accountInfo.name.toUpperCase()] + sendSuccess
        } else {
            txURL = TX_API[accountInfo.type.toUpperCase()] + sendSuccess
        }

        if (sendSuccess == 'SenSend Transaction successfully') txURL = '#'

        return (
            <PopupTransactionSuccess onPressLink={() => this.onPressLink(txURL)} onPress={() => this.setModalVisible()} txURL={txURL} sendSuccess={sendSuccess} modalVisible={this.state.modalVisible}></PopupTransactionSuccess>
        )
    }

    render() {
        const { accountInfo } = this.state;
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Send</Text>
                    </View>
                    <View style={Styles.waperMenu}>
                        <View style={Styles.menu}>
                            <TextInput placeholderTextColor="#8f90a2" placeholder={'To'} style={[Styles.textGarener]} onChangeText={(text) => this.onChangeText(text, 1)}></TextInput>
                        </View>
                        <View style={Styles.menu}>
                            <TextInput placeholderTextColor="#8f90a2" placeholder={'Amount'} style={[Styles.textGarener, { width: '80%' }]} onChangeText={(text) => this.onChangeText(text, 2)}></TextInput>
                            <Text style={[Styles.textGarener]}>{accountInfo.symbol}</Text>
                        </View>
                        {accountInfo.memo && <View style={Styles.menu}>
                            <TextInput placeholderTextColor="#8f90a2" placeholder={'Memo'} style={[Styles.textGarener]} onChangeText={(text) => this.onChangeText(text, 3)}></TextInput>
                        </View>}
                    </View>
                    {this.state.error && <View style={Styles.notify}>
                        <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>{this.state.error}</Text>
                    </View>}
                    <Button children="Send" onPress={() => this.clickSend()}></Button>
                    {this.renderModel()}
                </View>

            </View>
        )
    }
}