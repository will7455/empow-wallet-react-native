import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import ShowPass from '../../../assets/images/show-pass.svg'
import HidePass from '../../../assets/images/hiden-pass.svg'
import Button from '../../../components/Button'
import StorageService from '../../../services/StorageService'
import FirebaseService from '../../../services/FirebaseService'

export default class ChangePasswordLeft extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPass: false,
            isShowPassRepeat: false,
            isShowOldPass: false,
            loading: false
        }
    }

    togglePass = (index) => {
        if (index === 0) {
            this.setState({
                isShowOldPass: !this.state.isShowOldPass
            })
        }

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

    onChangeText = (text, index) => {
        if (index === 0) {
            this.setState({
                oldPassword: text
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

    clickSave = () => {

        const { oldPassword, password, repeatPassword } = this.state;
        this.setState({
            loading: true,
            error: false,
            sucess: false
        })

        if (!oldPassword || !password || !repeatPassword) {
            this.setState({
                error: 'Chưa nhập pass',
                loading: false
            })
            return
        }

        if (password !== repeatPassword) {
            this.setState({
                error: 'pas không khớp',
                loading: false
            })
            return
        }

        setTimeout(() => {
            FirebaseService.changePassword(oldPassword, password, (error) => {
                if (error) {
                    console.log(error)
                    this.setState({
                        error,
                        loading: false
                    })
                } else {
                    this.setState({
                        sucess: "Change pas okee",
                        loading: false
                    })
                    FirebaseService.logout();
                }
            })
        }, 1000);
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Change Password</Text>
                    </View>

                    <View style={Styles.waperInput}>
                        <Text style={[Styles.textGarener, Styles.text]}>Old password</Text>
                        <View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput secureTextEntry={!this.state.isShowOldPass} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 0)}></TextInput>
                            {this.state.isShowOldPass && <TouchableOpacity onPress={() => this.togglePass(0)}>
                                <HidePass style={Styles.iconPass} ></HidePass>
                            </TouchableOpacity>}
                            {!this.state.isShowOldPass && <TouchableOpacity onPress={() => this.togglePass(0)}>
                                <ShowPass style={Styles.iconPass} ></ShowPass>
                            </TouchableOpacity>}
                        </View>
                    </View>


                    <View style={[Styles.waperInput, { marginTop: 10 }]}>
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

                    <View style={[Styles.waperInput, { marginTop: 10 }]}>
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

                    {this.state.error && <View style={Styles.error}>
                        <Text style={[Styles.textGarener, { color: '#ff6a7e' }]}>{this.state.error}</Text>
                    </View>}

                    {this.state.sucess && <View style={Styles.sucess}>
                        <Text style={[Styles.textGarener, { color: '#6AE82D' }]}>{this.state.sucess}</Text>
                    </View>}

                    <Button children="Save" onPress={() => this.clickSave()} isLoading={this.state.loading}></Button>

                </View>

            </View>
        )
    }
}