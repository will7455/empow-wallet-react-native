import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import Slider from "react-native-slider";
import WalletService from '../../../services/WalletService'

export default class Ram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChildMenu: 0,
            selectedValue: 0,
            accountInfo: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.accountInfo ? this.props.navigation.state.params.accountInfo : [],
            buyRamValueNumber: 0,
            buyRamValueString: '0',
            sellRamValueNumber: 0,
            sellRamValueString: '0',
            reclaimingEOS: '0',
            error: false,
        }
    }

    componentDidMount() {
        this.setState({
            avaiableEos: this.state.accountInfo.balance.toString(),
        })
    }

    onChangeSelect = (itemValue) => {
        this.setState({
            selectedValue: itemValue
        })
    }

    buyRam = async () => {
        const { buyRamValueString } = this.state;
        try {
            var result = await WalletService.buyRam(buyRamValueString)
            console.log(result)
            this.props.navigation.state.params.getTransactionHistories();
            this.props.navigation.goBack();
        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    sellRam = async () => {
        const { sellRamValueString } = this.state;
        try {
            var result = await WalletService.sellRam(sellRamValueString)
            console.log(result)
            this.props.navigation.state.params.getTransactionHistories();
            this.props.navigation.goBack();
        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    clickConfirm = () => {
        if (this.state.selectedChildMenu === 0) {
            this.buyRam()
        } else {
            this.sellRam()
        }
    }

    changeSlider = (value) => {

        const { ramPrice, balance } = this.state.accountInfo
        let avaiableEos = balance - (value * ramPrice)

        avaiableEos = avaiableEos.toFixed(2)


        this.setState({
            buyRamValueNumber: value,
            buyRamValueString: value.toString(),
            avaiableEos: avaiableEos.toString()
        })
    }

    onChangeBuyRam = (buyRamValue, maxBuy) => {
        this.setState({
            buyRamValueString: buyRamValue,
        })

        if (buyRamValue.length === 0) {
            this.setState({
                buyRamValueNumber: 0,
                avaiableEos: '0'
            })

            return;
        }

        buyRamValue = parseFloat(buyRamValue) || 0;

        const { ramPrice, balance } = this.state.accountInfo
        let avaiableEos = balance - (buyRamValue * ramPrice)

        avaiableEos = avaiableEos.toFixed(2)

        this.setState({
            buyRamValueNumber: buyRamValue > maxBuy ? maxBuy : buyRamValue,
            avaiableEos
        })
    }

    onChangeSellRam = (sellRamValue, maxSell) => {
        this.setState({
            sellRamValueString: sellRamValue,
        })

        if (sellRamValue.length === 0) {
            this.setState({
                sellRamValueNumber: 0,
                reclaimingEOS: '0'
            })

            return;
        }

        sellRamValue = parseFloat(sellRamValue);

        if (!sellRamValue) {
            this.setState({
                sellRamValueNumber: 0,
                reclaimingEOS: '0'
            })

            return;
        }

        const { ramPrice } = this.state.accountInfo
        let reclaimingEOS = sellRamValue * ramPrice

        if (sellRamValue > maxSell) {
            return;
        }

        reclaimingEOS = reclaimingEOS.toFixed(2)

        this.setState({
            sellRamValueNumber: sellRamValue,
            reclaimingEOS
        })
    }

    renderContentBuy() {
        const { avaiableEos, buyRamValueString, buyRamValueNumber } = this.state
        const { ramPrice, balance } = this.state.accountInfo

        const maxBuy = parseFloat((balance / ramPrice).toFixed(2));

        return (
            <View>
                <View style={Styles.waperContent}>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Buying</Text>
                        <TextInput keyboardType={'number-pad'}
                            style={Styles.input}
                            value={buyRamValueString}
                            onChangeText={(text) => this.onChangeBuyRam(text, maxBuy)}></TextInput>
                    </View>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Type</Text>
                        <View style={Styles.waperPicker}>
                            <Picker
                                selectedValue={this.state.selectedValue}
                                style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                                onValueChange={(itemValue, itemIndex) => this.onChangeSelect(itemValue)}
                            >
                                <Picker.Item label="Bytes" value={0} />
                                {/* <Picker.Item label="Kilo" value={1} />
                            <Picker.Item label="Mega" value={2} /> */}
                            </Picker>
                        </View>
                    </View>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Available EOS</Text>
                        <TextInput style={Styles.input} value={avaiableEos} editable={false}></TextInput>
                    </View>
                </View>

                <View style={Styles.waperSlider}>
                    <Text style={Styles.textGarener}>RAM</Text>
                    <Slider
                        style={{ flex: 1, marginLeft: 20 }}
                        trackStyle={Styles.track}
                        thumbStyle={Styles.thumb}
                        minimumTrackTintColor='#d14ba6'
                        value={buyRamValueNumber}
                        minimumValue={0}
                        maximumValue={maxBuy}
                        onValueChange={(value) => this.onChangeBuyRam(value.toString(), maxBuy)}
                    />
                </View>
            </View>

        )
    }

    renderContentSell() {
        const { sellRamValueString, sellRamValueNumber, reclaimingEOS } = this.state
        const { ramLimit, ramUsed } = this.state.accountInfo

        const maxSell = ramLimit - ramUsed

        return (
            <View>
                <View style={Styles.waperContent}>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Selling</Text>
                        <TextInput keyboardType={'number-pad'}
                            style={Styles.input}
                            value={sellRamValueString}
                            onChangeText={(text) => this.onChangeSellRam(text, maxSell)}></TextInput>
                    </View>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Type</Text>
                        <View style={Styles.waperPicker}>
                            <Picker
                                selectedValue={this.state.selectedValue}
                                style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                                onValueChange={(itemValue, itemIndex) => this.onChangeSelect(itemValue)}
                            >
                                <Picker.Item label="Bytes" value={0} />
                                {/* <Picker.Item label="Kilo" value={1} />
                            <Picker.Item label="Mega" value={2} /> */}
                            </Picker>
                        </View>
                    </View>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Reclaiming</Text>
                        <TextInput style={Styles.input} value={reclaimingEOS} editable={false}></TextInput>
                    </View>
                </View>

                <View style={Styles.waperSlider}>
                    <Text style={Styles.textGarener}>RAM</Text>
                    <Slider
                        style={{ flex: 1, marginLeft: 20 }}
                        trackStyle={Styles.track}
                        thumbStyle={Styles.thumb}
                        minimumTrackTintColor='#d14ba6'
                        value={sellRamValueNumber}
                        minimumValue={0}
                        maximumValue={maxSell}
                        onValueChange={(value) => this.onChangeSellRam(value.toString(), maxSell)}
                    />
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
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>RAM</Text>
                    </View>

                    <View style={Styles.menu}>
                        <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 0 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 0, error: false }) }}>
                            <Text style={[Styles.textGarener, { color: '#8f90a2' }, this.state.selectedChildMenu === 0 ? { color: '#ff6a7e' } : '']}>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 1 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 1, error: false }) }}>
                            <Text style={[Styles.textGarener, { color: '#8f90a2' }, this.state.selectedChildMenu === 1 ? { color: '#ff6a7e' } : '']}>Sell</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.selectedChildMenu === 0 && this.renderContentBuy()}
                    {this.state.selectedChildMenu === 1 && this.renderContentSell()}

                    {this.state.error && <View style={Styles.notify}>
                        <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>{this.state.error}</Text>
                    </View>}

                    <Button children="Confirm" onPress={() => this.clickConfirm()}></Button>

                </View>

            </View>
        )
    }
}