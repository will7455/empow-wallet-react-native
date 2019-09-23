import React, { Component } from 'react'
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    FlatList,
    TextInput,
    Clipboard
} from 'react-native'
import Styles from './styled'
import LogoTron from '../../../assets/images/logo-tron-2.svg'
import LogoBinance from '../../../assets/images/logo-binance-2.svg'
import LogoBitcoin from '../../../assets/images/logo-bitcoin-2.svg'
import LogoEthereum from '../../../assets/images/logo-ethereum-2.svg'
import LogoIota from '../../../assets/images/logo-iota-2.svg'
import LogoMonero from '../../../assets/images/logo-monero-2.svg'
import Back from '../../../components/Back'
import IconCopy from '../../../assets/images/icon-copy.svg'

export default class ExportAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "vanvanvanvanvanv vanvanvna vanvanvn vanvanvanv vavnavn",
            isShowToken: false,
            filterResult: [
                {
                    name: 'Tron',
                    symbol: 'TRX',
                    keyPublic: 'vanvan',
                    keyPrivate: 'vananh'
                },
                {
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    keyPublic: 'vanvan',
                    keyPrivate: 'vananh'
                },
                {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    keyPublic: 'vanvan',
                    keyPrivate: 'vananh'
                },
                {
                    name: 'Binance',
                    symbol: 'BNB',
                    keyPublic: 'vanvan',
                    keyPrivate: 'vananh'
                },
                {
                    name: 'Monero',
                    symbol: 'MRX',
                    keyPublic: 'vanvan',
                    keyPrivate: 'vananh'
                },
            ]
        }
    }

    renderLogo(name) {
        if (name.toLowerCase() === 'tron') {
            return LogoTron;
        }

        if (name.toLowerCase() === 'binance') {
            return LogoBinance;
        }

        if (name.toLowerCase() === 'bitcoin') {
            return LogoBitcoin;
        }

        if (name.toLowerCase() === 'ethereum') {
            return LogoEthereum;
        }

        if (name.toLowerCase() === 'iota') {
            return LogoIota;
        }

        if (name.toLowerCase() === 'monero') {
            return LogoMonero;
        }
    }

    renderItem = ({ item, index }) => {
        var Logo = this.renderLogo(item.name);
        return (
            <View style={[Styles.coin, index === 0 ? { borderTopColor: '#534e73', borderTopWidth: 1 } : '']}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.7 }}>
                    <View>
                        <Logo></Logo>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.name}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.symbol}</Text>
                    </View>
                </View>

                <View style={{flex: 1}}>
                    <View>
                        <Text style={[Styles.textGarener, { fontSize: 10, color: '#8f90a2' }]}>Public key</Text>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent:'space-between'}}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>{item.keyPublic}</Text>
                            <TouchableOpacity onPress={() => { Clipboard.setString(item.keyPublic) }}>
                                <IconCopy />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={[Styles.textGarener, { fontSize: 10, color: '#8f90a2' }]}>Private key</Text>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent:'space-between'}}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>{item.keyPrivate}</Text>
                            <TouchableOpacity onPress={() => { Clipboard.setString(item.keyPrivate) }}>
                                <IconCopy />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderListCoin() {
        return (
            <View style={Styles.waperListCoin}>
                <FlatList
                    data={this.state.filterResult}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={true}
                    extraData={this.state}
                />
            </View>
        )
    }


    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation} preRoute='Setting'></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Export account</Text>
                    </View>
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            value={this.state.text}
                            style={[Styles.textInput, Styles.waperInput]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10 }} onPress={() => { Clipboard.setString(this.state.text) }}>
                            <IconCopy />
                        </TouchableOpacity>
                    </View>
                    {this.renderListCoin()}
                </View>
            </View>
        )
    }
}