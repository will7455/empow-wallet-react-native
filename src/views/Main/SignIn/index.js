import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import ShowPass from '../../../assets/images/show-pass.svg'
import HidePass from '../../../assets/images/hiden-pass.svg'
import Styles from './styled'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import FirebaseService from '../../../services/FirebaseService'
import Menu from '../../../components/Menu'

console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

const screenWidth = Math.round(Dimensions.get('window').width);

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPass: false,
            error: false,
            loading: false,
            loadingScreen: true
        }
    }

    componentWillMount() {
        if (FirebaseService.user) {
            this.props.navigation.navigate('Dapp2');
        } else {
            this.setState({
                loadingScreen: false,
            })
        }

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        })
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener.remove()
        }
    }

    onFocusFunction = () => {
        // do some stuff on every screen focus
        this.setState({
            loading: false,
            email: '',
            password: ''
        })
    }

    togglePass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    clickSignIn = () => {
        this.setState({
            loading: true,
            error: false
        })

        const { email, password } = this.state

        setTimeout(() => {
            FirebaseService.login(email, password, (error) => {
                if (error) {
                    this.setState({
                        error,
                        loading: false
                    })
                } else {
                    this.props.navigation.navigate('Dapp2')
                }
            })
        }, 1000);
    }

    clickSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    clickForgot = () => {
        this.props.navigation.navigate('ForgotPassword')
    }

    onChangeText = (text, index) => {
        if (index === 1) {
            this.setState({
                email: text
            })
        }

        if (index === 2) {
            this.setState({
                password: text
            })
        }

    }

    renderSignIn() {
        return (
            <ImageBackground source={BG} style={Styles.waperContainer}>
                <Text style={[Styles.textGarener, { fontSize: 14, fontWeight: 'bold', marginBottom: 20 }]}>Login to get EMPOW Token free</Text>
                {this.state.error && <View style={Styles.error}>
                    <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>{this.state.error}</Text>
                </View>}

                <View style={Styles.waperInput}>
                    <Text style={[Styles.textGarener, Styles.text]}>Email</Text>
                    <View style={{ marginLeft: -20 }}>
                        <TextInput defaultValue={this.state.email} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 1)}></TextInput>
                    </View>
                </View>

                <View style={Styles.waperInput}>
                    <Text style={[Styles.textGarener, Styles.text]}>Password</Text>
                    <View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput defaultValue={this.state.password} secureTextEntry={!this.state.isShowPass} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 2)}></TextInput>
                        {this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass()}>
                            <HidePass style={Styles.iconPass} ></HidePass>
                        </TouchableOpacity>}
                        {!this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass()}>
                            <ShowPass style={Styles.iconPass} ></ShowPass>
                        </TouchableOpacity>}
                    </View>
                </View>

                <TouchableOpacity style={{ width: screenWidth - 20, alignItems: 'flex-end' }} onPress={() => this.clickForgot()}>
                    <Text style={[Styles.textGarener, Styles.text2]}>Forgot password?</Text>
                </TouchableOpacity>

                <Button children="Sign in" onPress={() => this.clickSignIn()} isLoading={this.state.loading}></Button>

                <TouchableOpacity onPress={() => this.clickSignUp()}>
                    <Text style={[Styles.textGarener, Styles.text3]}>Sign up</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    renderLoading() {
        return (
            <View style={{ backgroundColor: '#534e73', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <ActivityIndicator color='white'></ActivityIndicator>
            </View>
        )
    }

    render() {
        if (FirebaseService.user) {
            this.props.navigation.navigate('Dapp2');
        }

        if (this.state.loadingScreen) {
            return this.renderLoading();
        }
        return this.renderSignIn()
    }
}

export default connect(state => ({
}), ({
}))(SignIn)