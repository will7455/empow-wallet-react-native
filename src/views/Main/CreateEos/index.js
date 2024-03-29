import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Picker,
    TextInput
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import WalletService from '../../../services/WalletService'
import Utils from '../../../utils/utils'

export default class CreateEos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            option: [{ label: 'TRX', value: 0 }, { label: 'ETH', value: 1 }, { label: 'USDT_TRC20', value: 3 }, { label: 'USDT_ERC20', value: 4 }, { label: 'EOS', value: 2 }],
            defaultValue: 0,
            accountName: '',
            price: false,
            error: false,
            publicKey: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.publicKey ? this.props.navigation.state.params.publicKey : '',
            index: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.index ? this.props.navigation.state.params.index : ''
        }
    }

    async componentDidMount() {
        var result = await WalletService.getPriceToCreateEos();
        result.eos = 0.8;

        this.setState({
            price: result
        })
    }

    generateAccount = () => {
        this.setState({
            accountName: Utils.generateEosAccount()
        })
    }

    clickCreate = async () => {
        this.setState({
            loading: true
        })

        const { accountName, defaultValue, publicKey, index, option } = this.state

        if (!accountName) {
            this.setState({ error: "Account name not blank", loading: false })
            return
        }
        if (accountName.length != 12) {
            this.setState({ error: "Account name must be 12 characters", loading: false })
            return
        }

        var data = option.find(x => x.value === defaultValue);

        if (defaultValue == 2) {
            this.props.navigation.navigate('Payment', {
                accountName,
                publicKey,
                index,
                payment
            });
        } else {
            setTimeout(async () => {
                try {
                    var checkEosAccount = await WalletService.checkEosAccount(accountName);

                    if (checkEosAccount) {

                        WalletService.createEosAccount(data.label, accountName, async (error) => {
                            if (error) {
                                this.setState({
                                    error: error.message ? error.message : error,
                                    loading: false
                                })
                                return;
                            }

                            await WalletService.getAllAccountInfo();
                            WalletService.startPool();

                            this.props.navigation.navigate('CoinDetail', {
                                index
                            });
                        })
                    }
                } catch (error) {
                    this.setState({
                        error: error.message,
                        loading: false
                    })
                }
            }, 1000);

        }
    }

    onChangeText = (text) => {
        this.setState({
            accountName: text
        })
    }

    onChangeSelect = (itemValue) => {
        this.setState({
            defaultValue: itemValue,
            error: false
        })
    }

    render() {
        const { accountName, defaultValue, price, error, option } = this.state
        var data = option.find(x => x.value === defaultValue);

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>CreateEos</Text>
                    </View>
                    <View style={Styles.waperContent}>
                        <View style={Styles.waperInput}>
                            <Text style={[Styles.textGarener, { color: '#8f90a2' }]}>Account Name</Text>
                            <TextInput
                                value={accountName}
                                style={[Styles.textGarener, Styles.input]}
                                onChangeText={(text) => this.onChangeText(text)} />
                        </View>
                        <Text style={[Styles.textGarener]}>The account address must have exactly 12 more characters. a-z, 1-5</Text>
                        <TouchableOpacity style={Styles.waperText} onPress={() => this.generateAccount()}>
                            <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>Generate account address</Text>
                        </TouchableOpacity>
                        <View style={Styles.waperGroup}>
                            <Text style={[Styles.textGarener]}>Choose payment method</Text>
                            <View style={Styles.waperPicker}>
                                <Picker
                                    selectedValue={defaultValue}
                                    style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                                    onValueChange={(itemValue, itemIndex) => this.onChangeSelect(itemValue)}
                                >
                                    <Picker.Item label="TRX" value={0} />
                                    <Picker.Item label="ETH" value={1} />
                                    <Picker.Item label="USDT_TRC20" value={3} />
                                    <Picker.Item label="USDT_ERC20" value={4} />
                                    <Picker.Item label="EOS" value={2} />
                                </Picker>
                            </View>
                        </View>
                        {(price && defaultValue !== 2) && <View style={{ width: '100%' }}>
                            <View style={Styles.child}>
                                <Text style={[Styles.textGarener]}>Price</Text>
                                <Text style={[Styles.textGarener]}>{price[data.label.split("_")[0].toLowerCase()]} {data.label.split("_")[0]}</Text>
                            </View>
                            <View style={Styles.child}>
                                <Text style={[Styles.textGarener]}>RAM</Text>
                                <Text style={[Styles.textGarener]}>4096 Bytes</Text>
                            </View>
                            <View style={Styles.child}>
                                <Text style={[Styles.textGarener]}>CPU & NET</Text>
                                <Text style={[Styles.textGarener]}>0.2 EOS</Text>
                            </View>
                        </View>}

                        {error && <View style={Styles.notify}>
                            <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>{error}</Text>
                        </View>}


                        <Button children="Create" onPress={() => this.clickCreate()} isLoading={this.state.loading}></Button>
                    </View>
                </View>
            </View>
        )
    }
}