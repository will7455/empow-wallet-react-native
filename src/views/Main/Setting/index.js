import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
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

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Language',
                    logo: Language
                },
                {
                    name: 'Currency',
                    logo: Currency
                },
                {
                    name: 'Change network',
                    logo: SwitchNote
                },
                {
                    name: 'Export account',
                    logo: ExportAccount
                },
                {
                    name: 'Change passwork',
                    logo: ChangePasswork
                },
                {
                    name: 'Introduce',
                    logo: Introduce
                },
                {
                    name: 'Feedback',
                    logo: Feedback
                },
                {
                    name: 'Rate app',
                    logo: RateApp
                },

                {
                    name: 'Term of service',
                    logo: TermOfService
                }
            ],
            loading: false
        }
    }

    onPress = (index) => {
        if (index === 0) {
            this.props.navigation.navigate('Language');
        }

        if (index === 1) {
            this.props.navigation.navigate('Currency');
        }

        if (index === 2) {
            this.props.navigation.navigate('SwitchNote');
        }

        if (index === 3) {
            this.props.navigation.navigate('UnlockAccount');
        }

        if (index === 4) {
            this.props.navigation.navigate('ChangePassword');
        }

        if (index === 5) {
            // this.props.navigation.navigate('Introduce');
        }

        if (index === 6) {
            // this.props.navigation.navigate('Feedback');
        }

        if (index === 7) {
            // this.props.navigation.navigate('RateApp');
        }

        if (index === 8) {
            // this.props.navigation.navigate('TermOfService');
        }
    }

    clickLogout = () => {
        this.setState({
            loading: true
        })

        this.props.navigation.navigate('Unlock');
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={Styles.container} onPress={()=>this.onPress(index)}>
                <View style={Styles.child}>
                    <View style={{flexDirection:'row'}}>
                        <IconCirkle width={24} IconSource={item.logo}></IconCirkle>
                        <View style={{marginLeft: 10}}>
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