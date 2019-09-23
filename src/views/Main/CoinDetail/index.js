import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Clipboard,
    Linking,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import ChartUp from '../../../assets/images/chart-up.svg'
import ChartDown from '../../../assets/images/chart-down.svg'
import ArrowUp from '../../../assets/images/arrow-up.svg'
import ArrowDown from '../../../assets/images/arrow-down.svg'
import IconEmpty from '../../../assets/images/icon-empty.svg'
import StorageService from '../../../services/StorageService'
import { connect } from 'react-redux'
import CoinIcon from '../../../components/CoinIcon'
import Utils from '../../../utils/utils'
import { CURRENCY_SYMBOL, TX_API } from '../../../constants/index'
import IconCopy from '../../../assets/images/icon-copy.svg'
import WalletService from '../../../services/WalletService'
const screenHeight = Math.round(Dimensions.get('window').height);

class CoinDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preRoute: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.preRoute ? this.props.navigation.state.params.preRoute : '',
            selectedChild2: 0,
            selectedChildMenu: 0,
            index: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.index ? this.props.navigation.state.params.index : 0
        }
    }

    async componentDidMount() {
        await this.getTransactionHistories()
    }

    getTransactionHistories = async () => {
        var histories = await WalletService.getTransactionHistories(this.props.accountInfo[this.state.index]);
        this.setState({
            histories
        })
    }

    clickSend = () => {
        const { index } = this.state;
        this.props.navigation.navigate('Send', {
            index
        });
    }

    clickReceive = (accountInfo) => {
        this.props.navigation.navigate('Receive', {
            address: accountInfo.address
        });
    }

    clickRam = (accountInfo) => {
        if (!accountInfo) {
            return;
        }
        this.props.navigation.navigate('Ram', {
            accountInfo,
            getTransactionHistories: this.getTransactionHistories
        });
    }

    clickCpuOrNet = (title, accountInfo) => {
        this.props.navigation.navigate('CpuOrNet', {
            title: title,
            accountInfo,
            getTransactionHistories: this.getTransactionHistories
        });
    }

    clickTransaction = (txURL) => {
        Linking.canOpenURL(txURL).then(supported => {
            if (supported) {
                Linking.openURL(txURL);
            } else {
                console.log("Don't know how to open URI: " + txURL);
            }
        });
    }

    renderItem = ({ item }) => {
        if (this.state.selectedChildMenu === 1 && item.type !== 'receive') {
            return;
        }

        if (this.state.selectedChildMenu === 2 && item.type !== 'send') {
            return;
        }

        const accountInfo = this.props.accountInfo[this.state.index] || [];

        let txURL = ''

        if (accountInfo.type == 'coin') {
            txURL = TX_API[accountInfo.name.toUpperCase()] + item.txid
        } else {
            txURL = TX_API[accountInfo.type.toUpperCase()] + item.txid
        }

        return (
            <TouchableOpacity style={Styles.waperItem} onPress={() => this.clickTransaction(txURL)}>
                <View>
                    <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.address.length > 24 ? item.address.substring(0, 24) + '...' : item.address}</Text>
                    <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{typeof item.time == 'number' ? Utils.formatTime(item.time) : item.time}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    {item.type == 'receive' && <Text style={[Styles.textGarener, { fontSize: 14, color: '#6ae82d' }]}>+{parseFloat(parseFloat(item.value).toFixed(8)).toString()}</Text>}
                    {item.type == 'send' && <Text style={[Styles.textGarener, { fontSize: 14, color: '#e74c3c' }]}>-{parseFloat(parseFloat(item.value).toFixed(8)).toString()}</Text>}
                    <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{accountInfo.symbol}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderList() {
        const accountInfo = this.props.accountInfo[this.state.index]
        const height = (accountInfo.name === 'EOS' || accountInfo.name === 'TRON') ? 90 : screenHeight / 4;

        return (
            <View style={[Styles.waperList, { height: height }]}>
                {(this.state.histories && this.state.histories.length > 0) &&
                    <FlatList
                        data={this.state.histories}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={true}
                        extraData={this.state}
                    />}

                {(!this.state.histories || this.state.histories.length === 0) &&
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <IconEmpty fill="#8f90a2"></IconEmpty>
                        <Text style={[Styles.textGarener, { fontSize: 13, color: '#8f90a2' }]}>No Transaction</Text>
                    </View>
                }

            </View>

        )
    }

    renderTransactions() {
        return (
            <View style={Styles.waperTransaction}>
                <Text style={[Styles.textGarener, { fontSize: 18, fontWeight: '600' }]}>Transactions</Text>
                <View style={Styles.menu}>
                    <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 0 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 0 }) }}>
                        <Text style={[Styles.textGarener, { fontSize: 16, color: '#8f90a2' }, this.state.selectedChildMenu === 0 ? { color: '#ff6a7e' } : '']}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 1 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 1 }) }}>
                        <Text style={[Styles.textGarener, { fontSize: 16, color: '#8f90a2' }, this.state.selectedChildMenu === 1 ? { color: '#ff6a7e' } : '']}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 2 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 2 }) }}>
                        <Text style={[Styles.textGarener, { fontSize: 16, color: '#8f90a2' }, this.state.selectedChildMenu === 2 ? { color: '#ff6a7e' } : '']}>Send</Text>
                    </TouchableOpacity>
                </View>
                {this.renderList()}
            </View>
        )
    }

    renderResourceEos(accountInfo) {
        let cpuPercent = (accountInfo.cpuLimit - accountInfo.cpuUsed) / accountInfo.cpuLimit * 100
        let netPercent = (accountInfo.netLimit - accountInfo.netUsed) / accountInfo.netLimit * 100
        let ramPercent = (accountInfo.ramLimit - accountInfo.ramUsed) / accountInfo.ramLimit * 100

        return (
            <View style={Styles.waperResource}>
                <TouchableOpacity style={Styles.resource} onPress={() => this.clickRam(accountInfo)} disabled={!isNaN(ramPercent) ? false : true}>
                    <View style={[{ width: `${ramPercent}%` }, Styles.percent]}></View>
                    <Text style={[Styles.textGarener, { fontSize: 13, color: '#ff6a7e' }]}>RAM</Text>
                    {!isNaN(ramPercent) && <Text style={[Styles.textGarener, { fontSize: 12 }]}>{ramPercent.toFixed(2)}%</Text>}
                    {isNaN(ramPercent) && <ActivityIndicator color='white'></ActivityIndicator>}
                </TouchableOpacity>
                <TouchableOpacity style={Styles.resource} onPress={() => this.clickCpuOrNet("CPU", accountInfo)} disabled={!isNaN(cpuPercent) ? false : true}>
                    <View style={[{ width: `${cpuPercent}%` }, Styles.percent]}></View>
                    <Text style={[Styles.textGarener, { fontSize: 13, color: '#ff6a7e' }]}>CPU</Text>
                    {!isNaN(cpuPercent) && <Text style={[Styles.textGarener, { fontSize: 12 }]}>{cpuPercent.toFixed(2)}%</Text>}
                    {isNaN(cpuPercent) && <ActivityIndicator color='white'></ActivityIndicator>}
                </TouchableOpacity>
                <TouchableOpacity style={Styles.resource} onPress={() => this.clickCpuOrNet("NET", accountInfo)} disabled={!isNaN(netPercent) ? false : true}>
                    <View style={[{ width: `${netPercent}%` }, Styles.percent]}></View>
                    <Text style={[Styles.textGarener, { fontSize: 13, color: '#ff6a7e' }]}>NET</Text>
                    {!isNaN(netPercent) && <Text style={[Styles.textGarener, { fontSize: 12 }]}>{netPercent.toFixed(2)}%</Text>}
                    {isNaN(netPercent) && <ActivityIndicator color='white'></ActivityIndicator>}
                </TouchableOpacity>
            </View>
        )
    }

    renderResourceTron(accountInfo) {

        let bandwidthPercent = (accountInfo.bandwidthLimit - accountInfo.bandwidthUsed) / accountInfo.bandwidthLimit * 100
        let energyPercent = (accountInfo.energyLimit - accountInfo.energyUsed) / accountInfo.energyLimit * 100

        return (
            <View style={Styles.waperResource}>
                <TouchableOpacity style={[Styles.resource, { width: '47%' }]}>
                    <View style={[{ width: `${bandwidthPercent}%` }, Styles.percent]}></View>
                    <Text style={[Styles.textGarener, { fontSize: 13, color: '#ff6a7e' }]}>Bandwidth</Text>
                    <Text style={[Styles.textGarener, { fontSize: 12 }]}>{bandwidthPercent.toFixed(2)}%</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.resource, { width: '47%' }]}>
                    <View style={[{ width: `${energyPercent}%` }, Styles.percent]}></View>
                    <Text style={[Styles.textGarener, { fontSize: 13, color: '#ff6a7e' }]}>Energy</Text>
                    <Text style={[Styles.textGarener, { fontSize: 12 }]}>{energyPercent.toFixed(2)}%</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderInfo(accountInfo, setting) {
        if (accountInfo.customToken || accountInfo.type == 'BEP2') {
            accountInfo.logo = `logo_${accountInfo.type.toLowerCase()}`
        } else {
            accountInfo.logo = `logo_${accountInfo.symbol.toLowerCase()}`
        }

        if (accountInfo.type === 'coin') {
            accountInfo.logo = `logo_${accountInfo.name.toLowerCase()}`
        }

        var Logo = CoinIcon[accountInfo.logo] || CoinIcon['logo_888'];
        return (
            <View style={Styles.waperInfo}>
                <View style={Styles.group1}>
                    <View style={Styles.child1}>
                        <View>
                            <Logo></Logo>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={[Styles.textGarener, { fontSize: 14 }]}>{accountInfo.name.length <= 8 ? accountInfo.name : accountInfo.name.substring(0, 8) + '...'}</Text>
                            <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{accountInfo.symbol}</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{Utils.formatCurrency(accountInfo.balance)} {accountInfo.symbol}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{CURRENCY_SYMBOL[setting.currency.toUpperCase()]} {parseFloat(accountInfo.balance * accountInfo.marketData[setting.currency]).toFixed(2).toString()}</Text>
                    </View>
                </View>
                <View style={Styles.group2}>
                    <Text style={[Styles.textGarener, { fontSize: 12, marginRight: 10 }]}>{accountInfo.address}</Text>
                    <TouchableOpacity onPress={() => { Clipboard.setString(accountInfo.address) }}>
                        <IconCopy />
                    </TouchableOpacity>
                </View>
                {accountInfo.marketData.usd_24h_change.toFixed(2) >= 0 && <View style={{ position: 'relative' }}>
                    <ChartUp></ChartUp>
                    <View style={{ flexDirection: 'row', position: 'absolute', right: 10, bottom: 10, alignItems: 'center' }}>
                        <ArrowUp></ArrowUp>
                        <Text style={[Styles.textGarener, { fontSize: 14, color: '#6ae82d', marginLeft: 10 }]}>{`${accountInfo.marketData.usd_24h_change.toFixed(2)}%`}</Text>
                    </View>
                </View>}

                {accountInfo.marketData.usd_24h_change.toFixed(2) < 0 && <View style={{ position: 'relative' }}>
                    <ChartDown></ChartDown>
                    <View style={{ flexDirection: 'row', position: 'absolute', right: 10, bottom: 10, alignItems: 'center' }}>
                        <ArrowDown></ArrowDown>
                        <Text style={[Styles.textGarener, { fontSize: 14, color: '#EC0928', marginLeft: 10 }]}>{`${accountInfo.marketData.usd_24h_change.toFixed(2)}%`}</Text>
                    </View>
                </View>}
            </View>
        )

    }

    render() {
        const accountInfo = this.props.accountInfo[this.state.index]
        const setting = StorageService.setting;

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        {this.state.preRoute !== 'Search' && <Back preRoute='Home' navigation={this.props.navigation}></Back>}
                        {this.state.preRoute === 'Search' && <Back navigation={this.props.navigation}></Back>}
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Coin Detail</Text>
                    </View>
                    {this.renderInfo(accountInfo, setting)}
                    {accountInfo.name === 'EOS' && this.renderResourceEos(accountInfo)}
                    {accountInfo.name === 'TRON' && this.renderResourceTron(accountInfo)}
                    {this.renderTransactions()}
                </View>

                <View style={Styles.waperButton}>
                    <TouchableOpacity style={[Styles.button, { backgroundColor: '#f94f4f' }]} onPress={() => this.clickReceive(accountInfo)}>
                        <Text style={[Styles.textGarener, { fontSize: 17 }]}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.button, { backgroundColor: '#8e3ddf' }]} onPress={() => this.clickSend()}>
                        <Text style={[Styles.textGarener, { fontSize: 17 }]}>Send</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default connect(state => ({
    accountInfo: state.app.allAccountInfo
}), ({
}))(CoinDetail)