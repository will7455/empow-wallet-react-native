import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'

export default class Introduce extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: 'Empow Wallet is a decentralized wallet that provides benefits and security for users. Instead of managing many different types of e-wallets, you now need only one universal wallet for all kinds of cryptocurrencies. And just need a wallet to interact with Dapps of different Blockchains.',
            title: 'Empow Wallet offers users the following services:',
            child1: '- Create a free Empow wallet with an encrypted private key that you can use to send, receive and store hundreds of tokens.',
            child2: '- Create your EOS account with TRON, ETH, EOS, USDT (ERC20) and USDT (TRC20) easily and free of charge.',
            child3: '- Create a free IOST account and add it to Empow Wallet to make transactions safely, quickly and conveniently.'
        }
    }

    render() {
        const { content, title, child1, child2, child3 } = this.state
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Introduce</Text>
                    </View>
                    <View style={Styles.waperList}>
                        <Text style={[Styles.textGarener, { marginBottom: 20 }]}>{content}</Text>
                        <Text style={[Styles.textGarener]}>{title}</Text>
                        <Text style={[Styles.textGarener]}>{child1}</Text>
                        <Text style={[Styles.textGarener]}>{child2}</Text>
                        <Text style={[Styles.textGarener]}>{child3}</Text>
                    </View>
                </View>
            </View>
        )
    }
}