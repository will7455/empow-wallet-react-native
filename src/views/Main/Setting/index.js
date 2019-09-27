import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Linking
} from 'react-native'
import Styles from './styled'
import Language from '../../../assets/images/icon-language.svg'
import Currency from '../../../assets/images/icon-currency.svg'
import SwitchNote from '../../../assets/images/icon-switch-note.svg'
import ExportAccount from '../../../assets/images/icon-export-account.svg'
import ChangePasswork from '../../../assets/images/icon-change-password.svg'
import Introduce from '../../../assets/images/icon-introduce.svg'
import Feedback from '../../../assets/images/icon-feedback.svg'
import RateApp from '../../../assets/images/icon-rate-app.svg'
import TermOfService from '../../../assets/images/icon-term-of-service.svg'
import Arrow from '../../../assets/images/arrow-right.svg'
import Menu from '../../../components/Menu'
import IconCirkle from '../../../components/IconCirkle'
import Button from '../../../components/Button'
import Contact from '../../../assets/images/icon-conntact.svg'

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Language',
                    logo: Language,
                    route: 'Language'
                },
                {
                    name: 'Currency',
                    logo: Currency,
                    route: 'Currency'
                },
                {
                    name: 'Change network',
                    logo: SwitchNote,
                    route: 'SwitchNote'
                },
                {
                    name: 'Export account',
                    logo: ExportAccount,
                    route: 'UnlockAccount'
                },
                {
                    name: 'Change passwork',
                    logo: ChangePasswork,
                    route: 'ChangePassword'
                },
                {
                    name: 'Introduce',
                    logo: Introduce,
                    route: 'Introduce'
                },
                {
                    name: 'Contact us',
                    logo: Contact,
                    route: 'ContactUs'
                },
                {
                    name: 'Rate app',
                    logo: RateApp,
                    route: 'RateApp'
                },
                {
                    name: 'Term of service',
                    logo: TermOfService,
                    route: 'TermOfService'
                },
                {
                    name: 'TRX wallet connected',
                    logo: TermOfService,
                    route: 'Wallet'
                },
                {
                    name: 'Change Password Left',
                    logo: TermOfService,
                    route: 'ChangePasswordLeft'
                },
                {
                    name: 'Withdraw history',
                    logo: TermOfService,
                    route: 'TermOfService'
                }
            ],
            loading: false
        }
    }

    onPress = (route) => {

        if (!route) {
            this.props.navigation.navigate('Home');
            return;
        }

        if (route === 'RateApp') {
            const link = 'http://play.google.com/store/apps/details?id=com.google.android.apps.maps'
            Linking.canOpenURL(link).then(supported => {
                supported && Linking.openURL(link);
            }, (err) => console.log(err));

            return;
        }

        this.props.navigation.navigate(route);
    }

    clickLogout = () => {
        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.props.navigation.navigate('Unlock');
        }, 1000);
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