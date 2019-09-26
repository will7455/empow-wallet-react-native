import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Back from '../../../components/Back'
import CountDown from 'react-native-countdown-component';
import WalletService from '../../../services/WalletService'
import ServerAPI from '../../../ServerAPI'

export default class Connect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'TRX',
                    type: 'tron',
                },
                {
                    name: 'ETH',
                    type: 'ethereum'
                },
                {
                    name: 'EOS',
                    type: false
                }
            ],
            isLoading: false,
            success: false,
            error: false,
            connect_tron: false,
            connect_ethereum: false,
            point: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.point ? this.props.navigation.state.params.point : 0,
            idToken: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.idToken ? this.props.navigation.state.params.idToken : 0,
        }
    }

    async componentDidMount() {
        this.getLeftConnectInfo('tron')
        this.getLeftConnectInfo('ethereum')
    }

    getLeftConnectInfo(type) {
        WalletService.getLeftConnectInfo(type, connectInfo => {
            this.setState({
                [`connect_${type}`]: connectInfo
            })
        })
    }

    connect = (type, nextSpinTime, index) => {

        if (!type || nextSpinTime > 0 || this.state.connectLoading) {
            return;
        }
        this.setState({
            connectLoading: true,
            index
        })

        WalletService.spin(type, (error, point) => {
            if (error) {
                console.log(error)
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
                    this.props.navigation.state.params.spin(point - this.state.point, point);
                    this.getLeftConnectInfo(type)
                }
                this.setState({
                    connectLoading: false,
                })
            })
        }, 5000)
    }

    renderItem = (item, index, nextSpinTimeTron, nextSpinTimeEthereum) => {
        const now = new Date().getTime();
        const nextSpinTime = item.type === 'tron' ? nextSpinTimeTron : item.type === 'ethereum' ? nextSpinTimeEthereum : 0;

        const value = (nextSpinTime - now) / 1000;
        return (
            <View style={Styles.child}>
                <Text style={Styles.textGarener}>{item.name}</Text>
                {nextSpinTime > now && <CountDown
                    size={10}
                    until={value}
                    digitStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    separatorStyle={{ color: 'black' }}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                />}
                {(this.state.connectLoading && this.state.index === index) &&
                    < ActivityIndicator color='white'></ActivityIndicator>
                }
                <CircleCheckBox
                    checked={false}
                    onToggle={() => this.connect(item.type, nextSpinTime, index)}
                    labelPosition={LABEL_POSITION.RIGHT}
                    outerSize={14}
                    innerSize={9}
                    outerColor='white'
                    innerColor='#EE4F5F'
                />
            </View >

        )
    }

    render() {
        const { connect_tron, connect_ethereum } = this.state

        let nextSpinTimeTron = 0

        if (connect_tron) {
            nextSpinTimeTron = connect_tron.nextSpinTime * 1000
        }

        let nextSpinTimeEthereum = 0;

        if (connect_ethereum) {
            nextSpinTimeEthereum = connect_ethereum.nextSpinTime * 1000
        }

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        {!this.state.connectLoading && <Back navigation={this.props.navigation}></Back>}
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Connect</Text>
                    </View>
                    <View style={Styles.waperList}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => this.renderItem(item, index, nextSpinTimeTron, nextSpinTimeEthereum)}
                            showsVerticalScrollIndicator={true}
                            extraData={this.state}
                        />
                    </View>

                    {this.state.error && <View style={Styles.notify}>
                        <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>{this.state.error}</Text>
                    </View>}
                </View>

            </View>
        )
    }
}