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
import StorageService from '../../../services/StorageService'
import CoinIcon from '../../../components/CoinIcon'
import { connect } from 'react-redux';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterResult: this.props.accountInfo
        }
    }

    onClick = (index) => {
        const accountInfo = this.props.accountInfo[index]

        if (accountInfo.name == 'EOS' && !accountInfo.address) {
            this.props.navigation.navigate('CreateEos', {
                publicKey: accountInfo.publicKey,
                index
            });
            return;
        } else {
            if (accountInfo.name == 'IOST' && !accountInfo.address) {
                this.props.navigation.navigate('CreateIost', {
                    publicKey: accountInfo.publicKey,
                    index
                });
                return;
            } else {
                this.props.navigation.navigate('CoinDetail', {
                    index,
                    preRoute: 'Search'
                });
            }
        }


    }

    onToggle = (symbol) => {
        const setting = StorageService.setting;
        const { listCoinDisabled } = setting

        if (!listCoinDisabled.hasOwnProperty(symbol)) {
            listCoinDisabled[symbol] = true
        } else {
            listCoinDisabled[symbol] = !listCoinDisabled[symbol]
        }

        this.setState({
            listCoinDisabled
        })

        StorageService.setting.listCoinDisabled = listCoinDisabled;
    }

    onSearch = (text) => {
        const { accountInfo } = this.props
        let query = text
        query = query.trim().toLowerCase()

        let result = []

        if (query.trim() == '') {
            this.setState({
                filterResult: accountInfo
            })
        } else {
            accountInfo.map((value, index) => {
                if (value.name.toLowerCase().search(query) != -1 || value.symbol.toLowerCase().search(query) != -1) {
                    result.push(Object.assign(value, { index }))
                }
            })

            this.setState({
                filterResult: result
            })
        }
    }

    renderItem = ({ item, index }) => {
        const { showZeroBalance, listCoinDisabled } = StorageService.setting

        let isEnabled = true;
        if (!showZeroBalance && (item.balance == 0 || !item.balance)) return;
        if (listCoinDisabled.hasOwnProperty(item.symbol.toLowerCase())) isEnabled = !listCoinDisabled[item.symbol.toLowerCase()]

        if (item.customToken || item.type == 'BEP2') {
            item.logo = `logo_${item.type.toLowerCase()}`
        } else {
            item.logo = `logo_${item.symbol.toLowerCase()}`
        }

        if (item.type === 'coin') {
            item.logo = `logo_${item.name.toLowerCase()}`
        }

        var Logo = CoinIcon[item.logo] || CoinIcon['logo_888'];

        return (
            <View style={[Styles.coin, index === 0 ? { borderTopColor: '#534e73', borderTopWidth: 1 } : '']}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.onClick(index)}>
                    <View>
                        <Logo></Logo>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.name}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.symbol}</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Switch
                        onTintColor="#B93D91"
                        thumbColor="white"
                        trackColor="#534E73"
                        onValueChange={() => this.onToggle(item.symbol.toLowerCase())}
                        value={isEnabled} />
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
                            <TextInput style={Styles.input} onChangeText={(text) => this.onSearch(text)}></TextInput>
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

export default connect(state => ({
    accountInfo: state.app.allAccountInfo
}), ({
}))(Search)