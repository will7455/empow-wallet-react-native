import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Clipboard,
    StyleSheet,
    TextInput
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import IconCopy from '../../../assets/images/icon-copy.svg'
//import QRCode from 'react-native-qrcode';

import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

export default class Receive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.address ? this.props.navigation.state.params.address : ''
        }
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Deposit address</Text>
                    </View>


                    <View style={{ alignItems: 'center' }}>
                        <View style={Styles.waperQr}>
                            <QRCode
                                value={this.state.address}
                                size={200}
                            />
                        </View>

                    </View>

                    <View style={Styles.waperAddress}>
                        <Text style={Styles.textGarener}>{this.state.address}</Text>
                        <TouchableOpacity onPress={() => { Clipboard.setString(this.state.address) }}>
                            <IconCopy />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}