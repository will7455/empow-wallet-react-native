import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import ShowPass from '../../../assets/images/show-pass.svg'
import HidePass from '../../../assets/images/hiden-pass.svg'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import Back from '../../../components/Back'
import Menu from '../../../components/Menu'
import FirebaseService from '../../../services/FirebaseService'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPass: false,
            isShowPassRepeat: false,
            checked: true,
            error: false,
            loading: false,
        }
    }

    togglePass = (index) => {
        if (index === 1) {
            this.setState({
                isShowPass: !this.state.isShowPass
            })
        }

        if (index === 2) {
            this.setState({
                isShowPassRepeat: !this.state.isShowPassRepeat
            })
        }
    }

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    clickSignUp = () => {
        this.setState({
            loading: true,
            error: false
        })

        const { email, password, repeatPassword, checked } = this.state;

        if (!email || !password || !repeatPassword || email === '' || password === '' || repeatPassword === '') {
            this.setState({
                error: 'Please enter full information',
                loading: false
            })
            return
        }

        if (password !== repeatPassword) {
            this.setState({
                error: 'Repeat password is not same password',
                loading: false
            })
            return
        }

        if (!checked) {
            this.setState({
                error: 'Please agree our Terms of service',
                loading: false
            })
            return
        }

        setTimeout(() => {
            FirebaseService.register(
                email,
                password,
                async (error) => {
                    if (error) {
                        this.setState({
                            error,
                            loading: false,
                        })
                    } else {
                        this.props.navigation.navigate('Dapp2')
                    }
                }
            )
        }, 1000);
    }

    onChangeText = (text, index) => {
        if (index === 0) {
            this.setState({
                email: text
            })
        }


        if (index === 1) {
            this.setState({
                password: text
            })
        }

        if (index === 2) {
            this.setState({
                repeatPassword: text
            })
        }
    }

    render() {
        return (
            <ImageBackground source={BG} style={Styles.waperContainer}>
                <View style={Styles.waperHeader}>
                    <Back navigation={this.props.navigation}></Back>
                </View>


                {this.state.error && <View style={Styles.error}>
                    <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>{this.state.error}</Text>
                </View>}

                <View style={Styles.waperInput}>
                    <Text style={[Styles.textGarener, Styles.text]}>Email</Text>
                    <View style={{ marginLeft: -20 }}>
                        <TextInput style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 0)}></TextInput>
                    </View>
                </View>

                <View style={Styles.waperInput}>
                    <Text style={[Styles.textGarener, Styles.text]}>Password</Text>
                    <View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput secureTextEntry={!this.state.isShowPass} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 1)}></TextInput>
                        {this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass(1)}>
                            <HidePass style={Styles.iconPass} ></HidePass>
                        </TouchableOpacity>}
                        {!this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass(1)}>
                            <ShowPass style={Styles.iconPass} ></ShowPass>
                        </TouchableOpacity>}
                    </View>
                </View>

                <View style={[Styles.waperInput]}>
                    <Text style={[Styles.textGarener, Styles.text]}>Repeat password</Text>
                    <View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput secureTextEntry={!this.state.isShowPassRepeat} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 2)}></TextInput>
                        {this.state.isShowPassRepeat && <TouchableOpacity onPress={() => this.togglePass(2)}>
                            <HidePass style={Styles.iconPass} ></HidePass>
                        </TouchableOpacity>}
                        {!this.state.isShowPassRepeat && <TouchableOpacity onPress={() => this.togglePass(2)}>
                            <ShowPass style={Styles.iconPass} ></ShowPass>
                        </TouchableOpacity>}
                    </View>
                </View>

                <View style={Styles.waperCheckbox}>
                    <CircleCheckBox
                        checked={this.state.checked}
                        onToggle={this.toggleCheckbox}
                        labelPosition={LABEL_POSITION.RIGHT}
                        outerSize={15}
                        innerSize={10}
                        outerColor='white'
                        innerColor='#EE4F5F'
                    />
                    <Text style={[Styles.textGarener, { marginLeft: 5, fontSize: 12 }]} >I agree to the <Text style={{ color: '#ff6a7e' }}>terms of service</Text></Text>
                </View>

                <Button children="Sign up" onPress={() => this.clickSignUp()} isLoading={this.state.loading}></Button>

                <Menu navigation={this.props.navigation}></Menu>
            </ImageBackground>
        )
    }
}

export default connect(state => ({
}), ({
}))(SignUp)