import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Keyboard,
    TextInput
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import Styles from './styled'
import Button from '../../../components/Button'
import Back from '../../../components/Back'
import WalletService from '../../../services/WalletService'

export default class RestoreWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonic: '',
            error: false
        }
    }

    clickContinue = async () => {
        try {
            await WalletService.restoreWallet(this.state.mnemonic);

            WalletService.init(null);
            WalletService.updateServiceAddress();
            await WalletService.getAllAccountInfo();
            WalletService.startPool();

            this.props.navigation.navigate('Main');
        } catch (error) {
            this.setState({
                error: error.message || "Error" 
            })
        }
    }

    onChangeText = (text) => {
        this.setState({
            mnemonic: text
        })
    }

    render() {
        return (
            <ImageBackground source={BG} style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.back}>
                        <Back navigation={this.props.navigation}></Back>
                    </View>
                    {this.state.error && <View style={Styles.error}>
                        <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>{this.state.error}</Text>
                    </View>}
                    <TextInput
                        multiline={true}
                        numberOfLines={6}
                        style={[Styles.textInput, Styles.waperInput]}
                        onChangeText={(text) => this.onChangeText(text)} />
                    <View>
                        <Text style={[Styles.textInput, Styles.waperContent]}>Please enter your mnemonic phrase below. This will either be 12 words in length (separated by spaces)</Text>
                    </View>

                    <Button children="Continue" onPress={() => this.clickContinue()}></Button>
                </View>

            </ImageBackground>
        )
    }
}