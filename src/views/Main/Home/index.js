import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    ActivityIndicator 
} from 'react-native'
import Styles from './styled'
import Arrow from '../../../assets/images/icon-down-arrow.svg'
import BgHeader from '../../../assets/images/header-home-bg.png'
import ChartDown from '../../../assets/images/icon-chart-down.svg'
import ChartUp from '../../../assets/images/icon-chart-up.svg'
import LinearGradient from 'react-native-linear-gradient'
import Menu from '../../../components/Menu'
import Utils from '../../../utils/utils'
import { CURRENCY_SYMBOL } from '../../../constants/index'
import StorageService from '../../../services/StorageService'
import CoinIcon from '../../../components/CoinIcon'
import { connect } from 'react-redux';

console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowCoin: true,
            isShowToken: true,
            totalBalance: 0,
            totalBalanceBtc: 0
        }
    }

    calcTotalBalance(accountInfo) {
        let totalBalance = 0;
        let totalBalanceBtc = 0;
        const setting = StorageService.setting;

        accountInfo.map(value => {
            if (value && value.balance && typeof value.marketData[setting.currency] == 'number') {
                const balance = parseFloat(value.balance)
                totalBalance += parseFloat(balance * value.marketData[setting.currency]);
            }
        })

        if (accountInfo[0] && accountInfo[0].marketData)
            totalBalanceBtc = parseFloat(totalBalance / accountInfo[0].marketData[setting.currency])
        return {
            totalBalance: totalBalance.toFixed(2),
            totalBalanceBtc: totalBalanceBtc.toFixed(8)
        }
    }


    clickSearch = () => {
        this.props.navigation.navigate('Search');
    }

    clickCoinDetail = (index) => {
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
                    index
                });
            }
        }
    }

    renderItem = ({ item, index }) => {
        const { isShowCoin, isShowToken } = this.state
        const setting = StorageService.setting;

        if (!item) return;
        if (item.type == 'coin' && !isShowCoin) return;
        if ((item.type == 'ERC20' || item.type == 'TRC10' || item.type == 'TRC20' || item.type == 'EOSTOKEN' || item.type == 'BEP2') && !isShowToken) return;
        if (!setting.showZeroBalance && (item.balance == 0 || !item.balance)) return;
        if (setting.listCoinDisabled.hasOwnProperty(item.symbol.toLowerCase()) && setting.listCoinDisabled[item.symbol.toLowerCase()]) return;


        if (item.customToken || item.type == 'BEP2') {
            item.logo = `logo_${item.type.toLowerCase()}`
        } else {
            item.logo = `logo_${item.symbol.toLowerCase()}`
        }

        if (item.type === 'coin') {
            item.logo = `logo_${item.name.toLowerCase()}`
        }

        var Logo = CoinIcon[item.logo] || CoinIcon['logo_888'];
        var Chart = item.marketData.usd_24h_change > 0 ? ChartUp : ChartDown;

        return (
            <TouchableOpacity onPress={() => this.clickCoinDetail(index)}>
                <LinearGradient style={Styles.coin}
                    colors={['#46527e', '#383c6e', '#1b1464']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View>
                        <Logo></Logo>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.name.length <= 8 ? item.name : item.name.substring(0, 7) + '...'}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.symbol}</Text>
                    </View>
                    {item.balance ?
                        <View style={{ flex: 0.5 }}>
                            <Text style={[Styles.textGarener, { fontSize: 14 }]}>{Utils.formatCurrency(item.balance)} {item.symbol}</Text>
                            {item.marketData && <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{CURRENCY_SYMBOL[setting.currency.toUpperCase()]} {parseFloat(item.balance * item.marketData[setting.currency]).toFixed(2).toString()}</Text>}
                        </View>
                        :
                        <View style={{ flex: 0.5 }}>
                            <Text style={[Styles.textGarener, { fontSize: 14 }]}>0 {item.symbol}</Text>
                            <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{CURRENCY_SYMBOL[setting.currency.toUpperCase()]} 0</Text>
                        </View>
                    }
                    <View style={Styles.waperChart}>
                        <Text style={[Styles.textGarener, { fontSize: 12, paddingTop: 25, left: 10 }]}>{`${item.marketData.usd_24h_change.toFixed(2)}%`}</Text>
                        <View style={{ position: 'absolute', top: -2 }}>
                            <Chart></Chart>
                        </View>

                    </View>
                </LinearGradient>
            </TouchableOpacity>

        )
    }

    renderListCoin() {
        return (
            <View style={Styles.container}>
                <View style={Styles.waperListCoin}>
                    <FlatList
                        data={this.props.accountInfo}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={true}
                        extraData={this.state}
                    />
                </View>
            </View>
        )
    }


    render() {
        const { totalBalance, totalBalanceBtc } = this.state;
        const setting = StorageService.setting;
        setTimeout(() => {
            const { totalBalance, totalBalanceBtc } = this.calcTotalBalance(this.props.accountInfo);
            if (totalBalance !== this.state.totalBalance || totalBalanceBtc !== this.state.totalBalanceBtc) {
                this.setState({
                    totalBalance,
                    totalBalanceBtc
                })
            }

        }, 1000);

        return (
            <View style={Styles.waperContainer}>
                <ImageBackground source={BgHeader} style={Styles.waperHeader}>
                    <View style={[Styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View style={Styles.waperTitle}>
                            <Text style={[Styles.textGarener, { fontSize: 17 }]}>Your total balance</Text>
                            <Text style={[Styles.textGarener, { fontSize: 31, fontWeight: '500' }]}>{CURRENCY_SYMBOL[setting.currency.toUpperCase()]} {Utils.formatCurrency(totalBalance, 2)}</Text>
                            <Text style={[Styles.textGarener, { fontSize: 17 }]}>~{totalBalanceBtc} BTC</Text>
                        </View>

                        <TouchableOpacity style={Styles.waperSearch} onPress={() => this.clickSearch()}>
                            <Text style={[Styles.textGarener, { fontSize: 12 }]}>Search</Text>
                            <Arrow fill="white"></Arrow>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={Styles.container}>
                    <View style={Styles.waperButton}>
                        {this.state.isShowCoin && <TouchableOpacity style={[Styles.button]} onPress={() => this.setState({ isShowCoin: !this.state.isShowCoin })}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Coin</Text>
                        </TouchableOpacity>}

                        {!this.state.isShowCoin && <TouchableOpacity style={[Styles.button, Styles.notShow]} onPress={() => this.setState({ isShowCoin: !this.state.isShowCoin })}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Coin</Text>
                        </TouchableOpacity>}


                        {this.state.isShowToken && <TouchableOpacity style={[Styles.button]} onPress={() => this.setState({ isShowToken: !this.state.isShowToken })}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Token</Text>
                        </TouchableOpacity>}

                        {!this.state.isShowToken && <TouchableOpacity style={[Styles.button, Styles.notShow]} onPress={() => this.setState({ isShowToken: !this.state.isShowToken })}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Token</Text>
                        </TouchableOpacity>}
                    </View>
                </View>


                {this.renderListCoin()}
            </View>
        )
    }
}

export default connect(state => ({
    accountInfo: state.app.allAccountInfo
}), ({
}))(Home)