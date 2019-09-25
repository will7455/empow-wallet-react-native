import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import Styles from './styled'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import Back from '../../../components/Back'
import Menu from '../../../components/Menu'
import FirebaseService from '../../../services/FirebaseService'

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            success: false
        }
    }

    clickReset = () => {
        this.setState({
            loading: true,
            error: false,
            success: false
        })

        const { email } = this.state

        setTimeout(() => {
            FirebaseService.forgot(
                email,
                (error) => {
                    if (error) {
                        this.setState({
                            loading: false,
                            error,
                            success: false
                        })
                    } else {
                        this.setState({
                            loading: false,
                            error: false,
                            success: 'We sent you an email to forgot password. Please check your email'
                        })
                    }

                }
            )
        }, 1000);

    }

    onChangeText = (text) => {
        this.setState({
            email: text
        })
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

                {this.state.success && <View style={Styles.success}>
                    <Text style={[Styles.textGarener, { color: '#6AE82D' }]}>{this.state.success}</Text>
                </View>}

                <View style={Styles.waperInput}>
                    <Text style={[Styles.textGarener, Styles.text]}>Email</Text>
                    <View style={{ marginLeft: -20 }}>
                        <TextInput style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text)}></TextInput>
                    </View>
                </View>

                <Button children="Reset password" onPress={() => this.clickReset()} isLoading={this.state.loading}></Button>

                <Menu navigation={this.props.navigation}></Menu>
            </ImageBackground>
        )
    }
}

export default connect(state => ({
}), ({
}))(ForgotPassword)