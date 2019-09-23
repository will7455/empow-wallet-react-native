import React, { Component } from 'react'
import { Text, ImageBackground, TouchableOpacity, View, TextInput } from 'react-native'
import Logo from '../../../assets/images/logo-empow'
import BG from '../../../assets/images/bg-loading.png'
import Styles from './styled'
import ShowPass from '../../../assets/images/show-pass.svg'
import HidePass from '../../../assets/images/hiden-pass.svg'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import Back from '../../../components/Back'
import StorageService from '../../../services/StorageService'

class UnlockAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowPass: false,
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
        if (!this.state.password) {
            this.setState({
                error: 'Chưa nhập pass'
            })
            return
        }

        if (StorageService.password !== this.state.password) {
            this.setState({
                error: 'Password not correct'
            })
        } else {
            this.props.navigation.navigate('ExportAccount');
        }
    }

    render() {
        return (
            <ImageBackground source={BG} style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View>
                        <Back navigation={this.props.navigation}></Back>
                    </View>
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
                    <Button children="Continue" onPress={() => this.clickContinue()}></Button>
                </View>
            </ImageBackground>
        )
    }
}

export default connect(state => ({
}), ({
}))(UnlockAccount)