import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Clipboard
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import Styles from './styled'
import Back from '../../../components/Back'
import Button from '../../../components/Button'
import IconCopy from '../../../assets/images/icon-copy.svg'
import WalletService from '../../../services/WalletService'

export default class CreateNewWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonic: '',
            error: false,
            loading: false
        }
    }

    componentDidMount() {
        try {
            var mnemonic = WalletService.generateMnemonic();
            this.setState({
                mnemonic
            })
        } catch (error) {
            this.setState({
                error: error.message || "Error"
            })
        }
    }

    clickContinue = async () => {
        this.setState({
            loading: true
        })
        try {
            setTimeout( async () => {
                await WalletService.restoreWallet(this.state.mnemonic);

                WalletService.init(null);
                WalletService.updateServiceAddress();
                await WalletService.getAllAccountInfo();
                WalletService.startPool();

                this.props.navigation.navigate('Main');
            }, 1000);

        } catch (error) {
            this.setState({
                error: error.message || "Error",
                loading: false
            })
        }
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
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            editable={false}
                            multiline={true}
                            numberOfLines={6}
                            value={this.state.mnemonic}
                            style={[Styles.textInput, Styles.waperInput]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10 }} onPress={() => { Clipboard.setString(this.state.mnemonic) }}>
                            <IconCopy />
                        </TouchableOpacity>

                    </View>

                    <View>
                        <Text style={[Styles.textInput, Styles.waperContent]}>Please write down a 12-word Backup Phrase and keep the copy in a secure place</Text>
                    </View>

                    <Button children="Continue" onPress={() => this.clickContinue()} isLoading={this.state.loading}></Button>
                </View>

            </ImageBackground>
        )
    }
}