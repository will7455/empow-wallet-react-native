import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import Slider from "react-native-slider";
import WalletService from '../../../services/WalletService'

export default class CpuOrNet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedChildMenu: 0,
            selectedValue: 0,
            accountInfo: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.accountInfo ? this.props.navigation.state.params.accountInfo : [],
            title: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.title ? this.props.navigation.state.params.title : '',
            error: false,
            stakeCpuValueString: '0',
            stakeCpuValueNumber: 0,
            stakeNetValueString: '0',
            stakeNetValueNumber: 0,
            avaiableEos: '0',
            unstakeCpuValueString: '0',
            unstakeCpuValueNumber: 0,
            unstakeNetValueString: '0',
            unstakeNetValueNumber: 0,
            reclaimingEOS: '0'
        }
    }

    onChangeSelect = (itemValue) => {
        this.setState({
            selectedValue: itemValue
        })
    }

    onStake = async () => {
        const { stakeCpuValueString, stakeNetValueString } = this.state

        try {
            var result = await WalletService.stake(stakeCpuValueString, stakeNetValueString)
            console.log(result)
            this.props.navigation.state.params.getTransactionHistories();
            this.props.navigation.goBack();
        } catch (error) {
            this.setState({
                error: error.message,
                loading: false
            })
        }
    }

    onUnstake = async () => {
        const { unstakeCpuValueString, unstakeNetValueString } = this.state
        try {
            var result = await WalletService.unstake(unstakeCpuValueString, unstakeNetValueString)
            console.log(result)
            this.props.navigation.state.params.getTransactionHistories();
            this.props.navigation.goBack();
        } catch (error) {
            this.setState({
                error: error.message,
                loading: false
            })
        }
    }

    clickConfirm = () => {
        this.setState({
            loading: true
        })
        if (this.state.selectedChildMenu === 0) {
            this.onStake()
        } else {
            this.onUnstake()
        }
    }

    onChangeStake = (stakeCpuValue, stakeNetValue, maxStakeCpu, maxStakeNet) => {
        this.setState({
            stakeCpuValueString: stakeCpuValue,
            stakeNetValueString: stakeNetValue
        })

        if (stakeCpuValue.length === 0) {
            this.setState({
                stakeCpuValueNumber: 0,
            })

            return;
        }

        if (stakeNetValue.length === 0) {
            this.setState({
                stakeNetValueNumber: 0,
            })

            return;
        }

        stakeCpuValue = parseFloat(stakeCpuValue) || 0;
        stakeNetValue = parseFloat(stakeNetValue) || 0;

        const { balance } = this.state.accountInfo

        let avaiableEos = balance - (stakeCpuValue + stakeNetValue)
        avaiableEos = avaiableEos.toFixed(2)

        this.setState({
            stakeCpuValueNumber: stakeCpuValue > maxStakeCpu ? maxStakeCpu : stakeCpuValue,
            stakeNetValueNumber: stakeNetValue > maxStakeNet ? maxStakeNet : stakeNetValue,
            avaiableEos
        })
    }

    onChangeUnstake = (unstakeCpuValue, unstakeNetValue, maxUnstakeCpu, maxUnstakeNet) => {
        this.setState({
            unstakeCpuValueString: unstakeCpuValue,
            unstakeNetValueString: unstakeNetValue
        })

        if (unstakeCpuValue.length === 0) {
            this.setState({
                unstakeCpuValueNumber: 0,
            })

            return;
        }

        if (unstakeNetValue.length === 0) {
            this.setState({
                unstakeNetValueNumber: 0,
            })

            return;
        }

        unstakeCpuValue = parseFloat(unstakeCpuValue) || 0;
        unstakeNetValue = parseFloat(unstakeNetValue) || 0;

        let reclaimingEOS = unstakeCpuValue + unstakeNetValue;
        reclaimingEOS = reclaimingEOS.toFixed(2)

        this.setState({
            unstakeCpuValueNumber: unstakeCpuValue > maxUnstakeCpu ? maxUnstakeCpu : unstakeCpuValue,
            unstakeNetValueNumber: unstakeNetValue > maxUnstakeNet ? maxUnstakeNet : unstakeNetValue,
            reclaimingEOS
        })
    }

    renderContentStake() {
        const { stakeCpuValueString, stakeCpuValueNumber, stakeNetValueString, stakeNetValueNumber, avaiableEos, accountInfo } = this.state

        const maxStakeCpu = parseFloat((accountInfo.balance - stakeNetValueNumber).toFixed(2))
        const maxStakeNet = parseFloat((accountInfo.balance - stakeCpuValueNumber).toFixed(2))

        return (
            <View>
                <View style={Styles.waperContent}>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>CPU</Text>
                        <TextInput keyboardType={'number-pad'}
                            style={Styles.input}
                            value={stakeCpuValueString}
                            onChangeText={(text) => this.onChangeStake(text, stakeNetValueString, maxStakeCpu, maxStakeNet)}></TextInput>
                    </View>

                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>NET</Text>
                        <TextInput keyboardType={'number-pad'}
                            style={Styles.input}
                            value={stakeNetValueString}
                            onChangeText={(text) => this.onChangeStake(stakeCpuValueString, text, maxStakeCpu, maxStakeNet)}></TextInput>
                    </View>

                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Available EOS</Text>
                        <TextInput style={Styles.input} editable={false} value={avaiableEos}></TextInput>
                    </View>
                </View>

                <View style={Styles.waperSlider}>
                    <Text style={Styles.textGarener}>CPU</Text>
                    <Slider
                        style={{ flex: 1, marginLeft: 20 }}
                        trackStyle={Styles.track}
                        thumbStyle={Styles.thumb}
                        minimumTrackTintColor='#d14ba6'
                        minimumValue={0}
                        maximumValue={maxStakeCpu}
                        value={stakeCpuValueNumber}
                        onValueChange={(value) => this.onChangeStake(value.toString(), stakeNetValueString, maxStakeCpu, maxStakeNet)}
                    />
                </View>

                <View style={[Styles.waperSlider]}>
                    <Text style={Styles.textGarener}>NET</Text>
                    <Slider
                        style={{ flex: 1, marginLeft: 20 }}
                        trackStyle={Styles.track}
                        thumbStyle={Styles.thumb}
                        minimumTrackTintColor='#d14ba6'
                        minimumValue={0}
                        maximumValue={maxStakeNet}
                        value={stakeNetValueNumber}
                        onValueChange={(value) => this.onChangeStake(stakeCpuValueString, value.toString(), maxStakeCpu, maxStakeNet)}
                    />
                </View>

            </View>

        )
    }

    renderContentUnstake() {
        const { unstakeCpuValueString, unstakeCpuValueNumber, unstakeNetValueString, unstakeNetValueNumber, reclaimingEOS, accountInfo } = this.state
        const maxUnstakeCpu = accountInfo.cpuStaked
        const maxUnstakeNet = accountInfo.netStaked

        return (
            <View>
                <View style={Styles.waperContent}>
                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>CPU</Text>
                        <TextInput keyboardType={'number-pad'}
                            style={Styles.input}
                            value={unstakeCpuValueString}
                            onChangeText={(text) => this.onChangeUnstake(text, unstakeNetValueString, maxUnstakeCpu, maxUnstakeNet)}></TextInput>
                    </View>

                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>NET</Text>
                        <TextInput keyboardType={'number-pad'}
                            style={Styles.input}
                            value={unstakeNetValueString}
                            onChangeText={(text) => this.onChangeUnstake(unstakeCpuValueString, text, maxUnstakeCpu, maxUnstakeNet)}></TextInput>
                    </View>

                    <View style={Styles.childContent}>
                        <Text style={Styles.textGarener}>Reclaiming</Text>
                        <TextInput style={Styles.input} editable={false} value={reclaimingEOS}></TextInput>
                    </View>
                </View>

                <View style={Styles.waperSlider}>
                    <Text style={Styles.textGarener}>CPU</Text>
                    <Slider
                        style={{ flex: 1, marginLeft: 20 }}
                        trackStyle={Styles.track}
                        thumbStyle={Styles.thumb}
                        minimumTrackTintColor='#d14ba6'
                        minimumValue={0}
                        maximumValue={maxUnstakeCpu}
                        value={unstakeCpuValueNumber}
                        onValueChange={(value) => this.onChangeUnstake(value.toString(), unstakeNetValueString, maxUnstakeCpu, maxUnstakeNet)}
                    />
                </View>

                <View style={[Styles.waperSlider]}>
                    <Text style={Styles.textGarener}>NET</Text>
                    <Slider
                        style={{ flex: 1, marginLeft: 20 }}
                        trackStyle={Styles.track}
                        thumbStyle={Styles.thumb}
                        minimumTrackTintColor='#d14ba6'
                        minimumValue={0}
                        maximumValue={maxUnstakeNet}
                        value={unstakeNetValueNumber}
                        onValueChange={(value) => this.onChangeUnstake(unstakeCpuValueString, value.toString(), maxUnstakeCpu, maxUnstakeNet)}
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
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>{this.state.title}</Text>
                    </View>

                    <View style={Styles.menu}>
                        <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 0 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 0, error: false }) }}>
                            <Text style={[Styles.textGarener, { color: '#8f90a2' }, this.state.selectedChildMenu === 0 ? { color: '#ff6a7e' } : '']}>Stake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Styles.childMenu, this.state.selectedChildMenu === 1 ? Styles.selectedChildMenu : '']} onPress={() => { this.setState({ selectedChildMenu: 1, error: false }) }}>
                            <Text style={[Styles.textGarener, { color: '#8f90a2' }, this.state.selectedChildMenu === 1 ? { color: '#ff6a7e' } : '']}>Unstake</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.selectedChildMenu === 0 && this.renderContentStake()}
                    {this.state.selectedChildMenu === 1 && this.renderContentUnstake()}

                    {this.state.error && <View style={Styles.notify}>
                        <Text style={[Styles.textGarener, { color: '#f94f4f' }]}>{this.state.error}</Text>
                    </View>}

                    <View style={{ marginTop: 20 }}>
                        <Button children="Confirm" onPress={() => this.clickConfirm()} isLoading={this.state.loading}></Button>
                    </View>

                </View>

            </View>
        )
    }
}