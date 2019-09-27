import React, { Component } from 'react'
import {
    View,
    Text,
    Linking,
    Platform
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import IconCirkle from '../../../components/IconCirkle'
import Address from '../../../assets/images/icon-address.svg'
import Phone from '../../../assets/images/icon-phone.svg'
import Time from '../../../assets/images/icon-time.svg'
import Button from '../../../components/Button'
import PopupCallPhone from '../../../components/PopupCallPhone'

export default class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            web: 'Empow.io',
            email: 'vanvan',
            address: 'Tầng 1, Văn phòng……',
            phone: '09866668888',
            time: 'Thứ 2 - Thứ 7: 8h30 - 18:00',
            modalVisible: false
        }
    }

    clickCall = () => {
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${this.state.phone}`;
        } else {
            phoneNumber = `telprompt:${this.state.phone}`;
        }

        Linking.openURL(phoneNumber);
    }

    
    setModalVisible() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    
    renderModel() {
        return (
            <PopupCallPhone onPress={() => this.setModalVisible()} modalVisible={this.state.modalVisible} call={this.clickCall} phone={this.state.phone}></PopupCallPhone>
        )
    }

    render() {
        const { web, email, address, phone, time } = this.state
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Contact us</Text>
                    </View>
                    <View>
                        <Text style={Styles.textGarener}>Website: {web}</Text>
                        <Text style={Styles.textGarener}>Email: {email}</Text>
                        <View style={{ borderBottomColor: '#534E73', borderBottomWidth: 1, marginBottom: 10 }}></View>
                        <Text style={Styles.textGarener}>Văn phòng Hà Nội</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <IconCirkle width={24} IconSource={Address}></IconCirkle>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={Styles.textGarener}>{address}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <IconCirkle width={24} IconSource={Phone}></IconCirkle>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={Styles.textGarener}>{phone}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <IconCirkle width={24} IconSource={Time}></IconCirkle>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={Styles.textGarener}>{time}</Text>
                            </View>
                        </View>
                    </View>

                    <Button children="Call us" onPress={() => this.setModalVisible()}></Button>

                    {this.renderModel()}
                </View>
            </View>
        )
    }
}