import React, { Component } from 'react'
import { Text, ImageBackground, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native'
import Logo from '../../assets/images/logo-empow.svg'
import BG from '../../assets/images/bg-loading.png'
import Styles from './styled'
import ShowPass from '../../assets/images/show-pass.svg'
import HidePass from '../../assets/images/hiden-pass.svg'
import Button from '../../components/Button'
import { connect } from 'react-redux'
import StorageService from '../../services/StorageService'
import WalletService from '../../services/WalletService'

class Unlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowPass: false,
            loading: false
        };
    };

    onChangeText = (text) => {
        this.setState({
            password: text
        })
    }

    togglePass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    clickContinue = () => {
        this.setState({
            loading: true
        })

        if (!this.state.password) {
            this.setState({
                error: 'Chưa nhập pass',
                loading: false
            })
            return
        }

        setTimeout(async () => {
            StorageService.unlock(this.state.password).then(async () => {
                const accounts = StorageService.accounts;
                if (accounts) {
                    WalletService.init(null);
                    WalletService.updateServiceAddress();
                    await WalletService.getAllAccountInfo();
                    WalletService.startPool();
                    this.props.navigation.navigate('Main');
                } else {
                    this.props.navigation.navigate('CreateWallet');
                }
            }).catch(error => {
                this.setState({
                    error: error,
                    loading: false
                })
            })
        }, 1000);

    }

    render() {
        return (
            <ImageBackground source={BG} style={Styles.waperContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                    <Logo></Logo>
                </View>

                {this.state.error && <View style={Styles.error}>
                    <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>{this.state.error}</Text>
                </View>}
                <View style={Styles.waperInput}>
                    <Text style={[Styles.textGarener, Styles.text]}>Unlock your wallet</Text>
                    <View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput secureTextEntry={!this.state.isShowPass} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text)}></TextInput>
                        {this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass()}>
                            <HidePass style={Styles.iconPass} ></HidePass>
                        </TouchableOpacity>}
                        {!this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass()}>
                            <ShowPass style={Styles.iconPass} ></ShowPass>
                        </TouchableOpacity>}
                    </View>
                </View>
                <Button children="Continue" onPress={() => this.clickContinue()} isLoading={this.state.loading}></Button>
            </ImageBackground>
        )
    }
}

export default connect(state => ({
}), ({
}))(Unlock)