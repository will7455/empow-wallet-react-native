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
import BgHeader from '../../../assets/images/header-home-bg.png'
import LinearGradient from 'react-native-linear-gradient'
import Menu from '../../../components/Menu'
import CoinIcon from '../../../components/CoinIcon'
import { connect } from 'react-redux';
import ServerAPI from '../../../ServerAPI'
import WalletService from '../../../services/WalletService'
import FirebaseService from '../../../services/FirebaseService'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import PopupWithdraw from '../../../components/PopupWithdraw'
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
            modalVisible: false,
        }
    }

    async componentDidMount() {
        this.getLeftConnectInfo('tron')
        this.getLeftConnectInfo('ethereum', () => {
            this.setState({
                connectLoading: false
            })
        })

        const idToken = await FirebaseService.getIdToken();
        this.setState({
            idToken
        })

        ServerAPI.getUserPoint(idToken).then(point => {
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

    spin = (value, point) => {

        const _this = this;

        this.setState({
            spinValue: 0
        })

        let spinValue = 0;

        let interval = setInterval(() => {
            spinValue += 1
            if (spinValue == value) {
                clearInterval(interval)
                _this.setState({
                    point
                })
            }
            _this.setState({
                spinValue
            })
        }, 50)
    }

    connect = (type) => {

        this.setState({
            connectLoading: true,
            showListConnect: false
        })

        if (type === 'tron') {
            this.setState({
                connect_tron: !this.state.connect_tron
            })
        }

        if (type === 'ethereum') {
            this.setState({
                connect_ethereum: !this.state.connect_ethereum
            })
        }

        WalletService.spin(type, (error, point) => {
            if (error) {
                this.setState({
                    connectLoading: false,
                    error
                })
                return;
            } else {
                // this.popupResponse(messageUUID, point)
            }
        })

        let interval = setInterval(() => {
            ServerAPI.getUserPoint(this.state.idToken).then(point => {
                if (this.state.point != point) {
                    clearInterval(interval)
                    this.spin(point - this.state.point, point)
                    this.getLeftConnectInfo(type, () => {
                        this.setState({
                            connectLoading: false
                        })
                    })
                }
            })
        }, 5000)
    }

    onWithdraw = async () => {
        this.setState({
            error: false,
            address: false,
            modalVisible: false
        })

        if (this.state.point <= 0) {
            this.setState({
                error: "Your balance is zero",
            })
            return;
        }

        this.setState({
            isLoading: true
        })

        ServerAPI.createWithdrawPointPending(this.state.idToken)
            .then(res => {
                this.setState({
                    isLoading: false,
                    address: res.address,
                    point: 0,
                    modalVisible: true
                })
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    error: err.msg,
                    modalVisible: true
                })
            });
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

    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
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

    renderModel() {
        return (
            <PopupWithdraw onPress={() => this.setModalVisible()} modalVisible={this.state.modalVisible} error={this.state.error} address={this.state.address}></PopupWithdraw>
        )
    }


    render() {

        const { connect_tron, connect_ethereum } = this.state

        // const now = new Date().getTime()

        // const countdownSpan = ({ hours, minutes, seconds }) => {
        //     return (<span className="countdown">{hours}:{minutes}:{seconds}</span>)
        // }

        // let nextSpinTimeTron = 0

        // if (connect_tron) {
        //     nextSpinTimeTron = connect_tron.nextSpinTime * 1000
        // }

        // let nextSpinTimeEthereum = 0;

        // if (connect_ethereum) {
        //     nextSpinTimeEthereum = connect_ethereum.nextSpinTime * 1000
        // }

        return (
            <View style={Styles.waperContainer}>
                <ImageBackground source={BgHeader} style={Styles.waperHeader}>
                    <View style={[Styles.container, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={Styles.waperTitle}>
                            <Text style={[Styles.textGarener, { fontSize: 17 }]}>Total token mined</Text>
                            {this.state.point !== "loading" && <Text style={[Styles.textGarener, { fontSize: 17 }]}>{this.state.point} EM</Text>}
                            {this.state.point === "loading" && <View>
                                <ActivityIndicator color='white'></ActivityIndicator>
                            </View>}
                        </View>
                        <AnimatedCircularProgress
                            size={100}
                            width={10}
                            fill={this.state.spinValue}
                            tintColor="#857AFF"
                            backgroundColor="white">
                            {
                                (fill) => (
                                    <Text style={[Styles.textGarener, { fontSize: 13 }]}>
                                        +{this.state.spinValue} EM
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                </ImageBackground>

                <View style={Styles.container}>
                    <View style={Styles.waperButton}>
                        <TouchableOpacity style={[Styles.button, { flexDirection: 'row' }]} onPress={() => this.onWithdraw()}>
                            {this.state.isLoading && <ActivityIndicator color='white'></ActivityIndicator>}
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Withdraw</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'relative' }}>
                            <TouchableOpacity style={[Styles.button, this.state.showListConnect ? Styles.showListConnect : '']} onPress={() => this.setState({ showListConnect: !this.state.showListConnect })}>
                                <Text style={[Styles.textGarener, { fontSize: 13 }]}>Connect</Text>
                            </TouchableOpacity>

                            {this.state.showListConnect && <View style={Styles.waperConnect}>
                                <View style={Styles.childConnect}>
                                    <Text style={[Styles.textGarener, { fontSize: 13 }]}>TRX</Text>
                                    <CircleCheckBox
                                        checked={connect_tron}
                                        // onToggle={() => this.connect('tron')}
                                        labelPosition={LABEL_POSITION.RIGHT}
                                        outerSize={14}
                                        innerSize={10}
                                        outerColor='white'
                                        innerColor='#EE4F5F'
                                    />
                                </View>

                                <View style={Styles.childConnect}>
                                    <Text style={[Styles.textGarener, { fontSize: 13 }]}>ETH</Text>
                                    <CircleCheckBox
                                        checked={connect_ethereum}
                                        // onToggle={() => this.connect('ethereum')}
                                        labelPosition={LABEL_POSITION.RIGHT}
                                        outerSize={14}
                                        innerSize={10}
                                        outerColor='white'
                                        innerColor='#EE4F5F'
                                    />
                                </View>

                                <View style={Styles.childConnect}>
                                    <Text style={[Styles.textGarener, { fontSize: 13 }]}>EOS</Text>
                                    <CircleCheckBox
                                        checked={false}
                                        labelPosition={LABEL_POSITION.RIGHT}
                                        outerSize={14}
                                        innerSize={10}
                                        outerColor='white'
                                        innerColor='#EE4F5F'
                                    />
                                </View>
                            </View>}
                        </TouchableOpacity>
                    </View>
                </View>


                {this.renderListDapp()}
                {this.renderModel()}

                <Menu navigation={this.props.navigation}></Menu>
            </View>
        )
    }
}

export default connect(state => ({
}), ({
}))(Dapp2)