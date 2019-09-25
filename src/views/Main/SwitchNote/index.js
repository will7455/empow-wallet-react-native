import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    Picker
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import LogoTron from '../../../assets/images/logo-tron-2.svg'
import LogoBinance from '../../../assets/images/logo-binance-2.svg'
import LogoBitcoin from '../../../assets/images/logo-bitcoin-2.svg'
import LogoEthereum from '../../../assets/images/logo-ethereum-2.svg'
import LogoIota from '../../../assets/images/logo-iota-2.svg'
import LogoMonero from '../../../assets/images/logo-monero-2.svg'
import StorageService from '../../../services/StorageService'
import Button from '../../../components/Button'

class SwitchNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    name: 'ETHEREUM',
                    symbol: 'TRX',
                },
                {
                    name: 'TRON',
                    symbol: 'BTC',
                },
                {
                    name: 'EOS',
                    symbol: 'ETH',
                },
                {
                    name: 'BINANCE',
                    symbol: 'BNB',
                },
                {
                    name: 'RIPPLE',
                    symbol: 'MRX',
                },
            ],
            loading: false
        }
    }

    componentDidMount() {
        var setting = StorageService.setting;
        var network = setting.network || [];
        this.setupData(network);
    }

    setupData(network) {
        var data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            data[i].selectedValue = network[data[i].name]
        }
        this.setState({
            data
        })
    }

    onChangeSelect = (itemValue, index) => {
        var data = this.state.data;
        var obj = this.state.data[index];
        obj.selectedValue = itemValue;

        data[index] = obj;

        this.setState({
            data
        })
    }

    clickSave = () => {
        this.setState({
            loading: true
        })

        setTimeout(() => {
            var network = {};
            var data = this.state.data;
            for (let i = 0; i < data.length; i++) {
                network[data[i].name] = data[i].selectedValue;
            }

            StorageService.setting.network = network;
            StorageService.save('setting');
            this.props.navigation.navigate('Setting');
        }, 1000);
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

        return LogoIota;
    }

    renderItem = ({ item, index }) => {
        var Logo = this.renderLogo(item.name);
        return (
            <View style={[Styles.child, index === 0 ? { borderTopColor: '#534e73', borderTopWidth: 1 } : '']}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Logo></Logo>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.name}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.symbol}</Text>
                    </View>
                </View>

                <View style={{ height: 28, width: 100, borderRadius: 8, overflow: 'hidden' }}>
                    <Picker
                        selectedValue={item.selectedValue}
                        style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                        onValueChange={(itemValue, itemIndex) => this.onChangeSelect(itemValue, index)}
                    >
                        <Picker.Item label="MAINNET" value={'MAINNET'} />
                        <Picker.Item label="ROPSTEN" value={'ROPSTEN'} />
                        <Picker.Item label="TOMOCHAIN" value={'TOMOCHAIN'} />
                    </Picker>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Change network</Text>
                    </View>
                    <View style={Styles.waperList}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={true}
                            extraData={this.state}
                        />
                    </View>
                    <Button children="Save" onPress={() => this.clickSave()} isLoading={this.state.loading}></Button>
                </View>

            </View>
        )
    }
}

export default SwitchNote