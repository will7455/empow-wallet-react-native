import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Linking
} from 'react-native'
import Styles from './styled'
import Arrow from '../../../assets/images/icon-down-arrow.svg'
import BgHeader from '../../../assets/images/header-home-bg.png'
import LinearGradient from 'react-native-linear-gradient'
import Menu from '../../../components/Menu'
import Utils from '../../../utils/utils'
import StorageService from '../../../services/StorageService'
import CoinIcon from '../../../components/CoinIcon'
import { connect } from 'react-redux';
import ServerAPI from '../../../ServerAPI'
import WalletService from '../../../services/WalletService'

console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;
class Dapp2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showListConnect: false,
            route: null,
            point: 'loading',
            listDApp: [],
            addressSelected: '',
            spinValue: 0,
            connectLoading: true,
            isLoading: false,
            success: false,
            error: false,
            tronReady: false,
            connect_tron: false,
            connect_ethereum: false,
        }
    }

    componentDidMount() {
        this.getLeftConnectInfo('tron')
        this.getLeftConnectInfo('ethereum', () => {
            this.setState({
                connectLoading: false
            })
        })

        ServerAPI.getUserPoint(this.props.accountInfo.idToken).then(point => {
            this.setState({
                point
            })
        })

        ServerAPI.getDApp().then(listDApp => {
            this.setState({
                listDApp
            })
        })
    }

    getLeftConnectInfo(type, callback = false) {
        WalletService.getLeftConnectInfo(type, connectInfo => {
            this.setState({
                [`connect_${type}`]: connectInfo
            })

            if (callback) callback()
        })
    }

    clickDapp = (website) => {
        Linking.canOpenURL(website).then(supported => {
            if (supported) {
                Linking.openURL(website);
            } else {
                console.log("Don't know how to open URI: " + website);
            }
        });
    }

    renderItem = ({ item, index }) => {

        var Logo = CoinIcon['logo_888'];

        return (
            <TouchableOpacity onPress={() => this.clickDapp(item.website)}>
                <LinearGradient style={Styles.coin}
                    colors={['#46527e', '#383c6e', '#1b1464']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flex: 0.2 }}>
                        <Logo></Logo>
                    </View>
                    <View style={{ flex: 0.7 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.fullname.length <= 24 ? item.fullname : item.fullname.substring(0, 24) + '...'}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.description.length <= 24 ? item.description : item.description.substring(0, 24) + '...'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 0.2 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>+{item.amount_reward}</Text>
                        {item.bonus_amount > 0 && <Text style={[Styles.textGarener, { fontSize: 14, color: '#ff881b' }]}> +{item.bonus_amount}</Text>}
                    </View>
                </LinearGradient>
            </TouchableOpacity>

        )
    }

    renderListDapp() {
        return (
            <View style={Styles.container}>
                <View style={Styles.waperListCoin}>
                    <FlatList
                        data={this.state.listDApp}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={true}
                        extraData={this.state}
                    />
                </View>
            </View>
        )
    }


    render() {

        return (
            <View style={Styles.waperContainer}>
                <ImageBackground source={BgHeader} style={Styles.waperHeader}>
                    <View style={[Styles.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View style={Styles.waperTitle}>
                            <Text style={[Styles.textGarener, { fontSize: 17 }]}>Total token mined</Text>
                            {/* {this.state.point !== "loading" && <Text style={[Styles.textGarener, { fontSize: 17 }]}>{this.state.point} EM</Text>} */}
                            {/* {this.state.point === "loading" && <View>
                                <ActivityIndicator color='white'></ActivityIndicator>
                                <Text style={[Styles.textGarener, { fontSize: 17 }]}> EM</Text>
                            </View>} */}

                            <Text style={[Styles.textGarener, { fontSize: 17 }]}>{this.state.point} EM</Text>
                        </View>

                        <TouchableOpacity style={Styles.waperSearch} onPress={() => this.clickSearch()}>
                            <Text style={[Styles.textGarener, { fontSize: 12 }]}>Search</Text>
                            <Arrow fill="white"></Arrow>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={Styles.container}>
                    <View style={Styles.waperButton}>
                        <TouchableOpacity style={[Styles.button]} onPress={() => this.setState({ isShowCoin: !this.state.isShowCoin })}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Withdraw</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Styles.button]} onPress={() => this.setState({ isShowToken: !this.state.isShowToken })}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Connect</Text>
                        </TouchableOpacity>

                    </View>
                </View>


                {this.renderListDapp()}

                <Menu navigation={this.props.navigation}></Menu>
            </View>
        )
    }
}

export default connect(state => ({
    accountInfo: state.app.allAccountInfo
}), ({
}))(Dapp2)