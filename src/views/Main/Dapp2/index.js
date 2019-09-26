import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Linking,
    Image
} from 'react-native'
import Styles from './styled'
import BgHeader from '../../../assets/images/header-home-bg.png'
import LinearGradient from 'react-native-linear-gradient'
import Menu from '../../../components/Menu'
import { connect } from 'react-redux';
import ServerAPI from '../../../ServerAPI'
import FirebaseService from '../../../services/FirebaseService'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PopupWithdraw from '../../../components/PopupWithdraw'
import IconRefresh from '../../../assets/images/icon-restore.svg'
import { API_ENDPOINT } from '../../../constants/index'

class Dapp2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: 'loading',
            listDApp: [],
            spinValue: 0,
            isLoading: false,
            success: false,
            error: false,
            connect_tron: false,
            connect_ethereum: false,
            modalVisible: false,
        }
    }

    async componentDidMount() {
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

    refreshBalance = () => {
        this.setState({
            point: 'loading'
        })

        ServerAPI.getUserPoint(this.state.idToken).then(point => {
            this.setState({
                point
            })
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


    onConnect = () => {
        this.props.navigation.navigate('Connect', {
            point: this.state.point,
            idToken: this.state.idToken,
            spin: this.spin
        });
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

        return (
            <TouchableOpacity onPress={() => this.clickDapp(item.website)}>
                <LinearGradient style={Styles.coin}
                    colors={['#46527e', '#383c6e', '#1b1464']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flex: 0.2 }}>
                        {/* <Logo></Logo> */}
                        <Image source={{ uri: `${API_ENDPOINT}/image/${item.logo_url}` }}
                            style={{ width: 50, height: 50 }}></Image>
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
        return (
            <View style={Styles.waperContainer}>
                <ImageBackground source={BgHeader} style={Styles.waperHeader}>
                    <View style={[Styles.container, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={Styles.waperTitle}>
                            <Text style={[Styles.textGarener, { fontSize: 17 }]}>Total token mined</Text>
                            {this.state.point !== "loading" &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[Styles.textGarener, { fontSize: 20, marginRight: 5 }]}>{this.state.point} EM</Text>
                                    <TouchableOpacity onPress={this.refreshBalance}>
                                        <IconRefresh fill="white"></IconRefresh>
                                    </TouchableOpacity>
                                </View>}
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

                        <TouchableOpacity style={[Styles.button]} onPress={() => this.onConnect()}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>Connect</Text>
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