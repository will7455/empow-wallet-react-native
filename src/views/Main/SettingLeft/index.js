import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Linking
} from 'react-native'
import Styles from './styled'
import TermOfService from '../../../assets/images/icon-term-of-service.svg'
import Arrow from '../../../assets/images/arrow-right.svg'
import Menu from '../../../components/Menu'
import IconCirkle from '../../../components/IconCirkle'
import Button from '../../../components/Button'
import ChangePasswork from '../../../assets/images/icon-change-password.svg'
import FirebaseService from '../../../services/FirebaseService'
import Back from '../../../components/Back'

export default class SettingLeft extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'TRX wallet connected',
                    logo: TermOfService,
                    route: 'Wallet'
                },
                {
                    name: 'Change Password',
                    logo: ChangePasswork,
                    route: 'ChangePasswordLeft'
                },
                {
                    name: 'Withdraw history',
                    logo: TermOfService,
                    route: 'WithdrawHistory'
                },
                {
                    name: 'Term of service',
                    logo: TermOfService,
                    route: 'TermOfService'
                },
            ],
            loading: false
        }
    }

    onPress = (route) => {

        if (!route) {
            this.props.navigation.navigate('Home');
            return;
        }

        if (route === 'TermOfService') {
            const website = 'https://empow.io/termsofservice'
            Linking.canOpenURL(website).then(supported => {
                if (supported) {
                    Linking.openURL(website);
                } else {
                    console.log("Don't know how to open URI: " + website);
                }
            });

            return;
        }

        this.props.navigation.navigate(route);
    }

    clickLogout = async () => {
        await FirebaseService.logout();
        this.props.navigation.navigate('SignIn')
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={Styles.container} onPress={() => this.onPress(item.route)}>
                <View style={Styles.child}>
                    <View style={{ flexDirection: 'row' }}>
                        <IconCirkle width={24} IconSource={item.logo}></IconCirkle>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={Styles.textGarener}>{item.name}</Text>
                        </View>
                    </View>

                    <View>
                        <Arrow fill="white"></Arrow>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.waperHeader}>
                    <Back navigation={this.props.navigation}></Back>
                    <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Setting</Text>
                </View>

                <View style={Styles.waperList}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={true}
                    />
                </View>
                <Button children="Log out" onPress={() => this.clickLogout()} isLoading={this.state.loading}></Button>
                <Menu navigation={this.props.navigation}></Menu>
            </View>
        )
    }
}