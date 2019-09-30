import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Linking
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import ServerAPI from '../../../ServerAPI'
import FirebaseService from '../../../services/FirebaseService'
import EmpowLogo from '../../../assets/images/empow-logo.svg'
import Utils from '../../../utils/utils'
import { TX_API } from '../../../constants/index'

export default class WithdrawHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            point: 0,
            histories: [],
            priceEmpow: 0
        }
    }

    async componentDidMount() {
        const idToken = await FirebaseService.getIdToken();
        var point = await ServerAPI.getUserPoint(idToken);
        var histories = await ServerAPI.getWithdrawPointHistories(idToken);
        var priceEmpow = await ServerAPI.getPriceEmpow();

        histories = histories.reverse()

        this.setState({
            point,
            histories,
            priceEmpow: priceEmpow.value
        })
    }

    clickTransaction = (txid) => {
        if (!txid) {
            return;
        }

        const website = TX_API.ETHEREUM + txid
        Linking.canOpenURL(website).then(supported => {
            if (supported) {
                Linking.openURL(website);
            } else {
                console.log("Don't know how to open URI: " + website);
            }
        });
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.clickTransaction(item.txid)} style={Styles.waperItem}>
                <View>
                    <Text style={[Styles.textGarener]}>{item.address.length <= 25 ? item.address : item.address.substring(0, 25) + '...'}</Text>
                    <Text style={[Styles.textGarener, Styles.text2]}>{Utils.formatTime(new Date(item.created_at).getTime() / 1000)}</Text>
                </View>
                <View>
                    <Text style={[Styles.textGarener, { color: '#e74c3c' }]}>-{item.value}</Text>
                    <Text style={[Styles.textGarener, Styles.text2]}>EM</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderListTransactions() {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={[Styles.textGarener , {fontWeight: 'bold'}]}>Transactions</Text>
                </View>
                <View style={Styles.waperList}>
                    <FlatList
                        data={this.state.histories}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={true}
                        extraData={this.state}
                    />
                </View>
            </View>
        )
    }


    render() {
        const { point, priceEmpow } = this.state;
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Withdraw History</Text>
                    </View>
                    <View style={Styles.waperInfo}>
                        <View>
                            <EmpowLogo></EmpowLogo>
                        </View>
                        <View style={{ flex: 0.4, marginLeft: 10 }}>
                            <Text style={[Styles.textGarener, Styles.text1]}>EMPOW</Text>
                            <Text style={[Styles.textGarener, Styles.text2]}>USD</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={[Styles.textGarener, Styles.text1]}>{point} EM</Text>
                            <Text style={[Styles.textGarener, Styles.text2]}>$ {priceEmpow * point}</Text>
                        </View>
                    </View>

                    {this.renderListTransactions()}
                </View>
            </View>
        )
    }
}