import React, { Component } from 'react'
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native'
import Styles from './styled'
import IconSearch from '../../../assets/images/icon-search.svg'
import LogoTron from '../../../assets/images/logo-tron-2.svg'
import LogoBinance from '../../../assets/images/logo-binance-2.svg'
import LogoBitcoin from '../../../assets/images/logo-bitcoin-2.svg'
import LogoEthereum from '../../../assets/images/logo-ethereum-2.svg'
import LogoIota from '../../../assets/images/logo-iota-2.svg'
import LogoMonero from '../../../assets/images/logo-monero-2.svg'

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowCoin: true,
            isShowToken: false,
            filterResult: [
                {
                    name: 'Tron',
                    symbol: 'TRX',
                    isEnabled: false
                },
                {
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    isEnabled: false
                },
                {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    isEnabled: false
                },
                {
                    name: 'Binance',
                    symbol: 'BNB',
                    isEnabled: false
                },
                {
                    name: 'Monero',
                    symbol: 'MRX',
                    isEnabled: true
                },
            ]
        }
    }

    onToggle = (index) => {
        var data = this.state.filterResult[index];
        data.isEnabled = !data.isEnabled;

        var filterResult = this.state.filterResult;
        filterResult[index] = data;

        this.setState({
            filterResult
        })
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                        <Logo></Logo>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.name}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.symbol}</Text>
                    </View>
                </View>

                <View>
                    <Switch
                        onTintColor="#B93D91"
                        thumbTintColor="white"
                        tintColor="#534E73"
                        onValueChange={() => this.onToggle(index)}
                        value={item.isEnabled} />
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
                        <View style={Styles.waperSearch}>
                            <IconSearch fill="#aaaaaa"></IconSearch>
                            <TextInput style={Styles.input}></TextInput>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={[Styles.textGarener]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    {this.renderListCoin()}
                </View>
            </View>
        )
    }
}