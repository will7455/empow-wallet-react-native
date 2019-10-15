import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Clipboard
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import IconCopy from '../../../assets/images/icon-copy.svg'
import CoinIcon from '../../../components/CoinIcon'
import { connect } from 'react-redux';
import IconSearch from '../../../assets/images/icon-search.svg'

class ExportAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterResult: this.props.accountInfo
        }
    }

    onSearch = (text) => {
        const { accountInfo } = this.props
        let query = text
        query = query.trim().toLowerCase()

        let result = []

        if (query.trim() == '') {
            this.setState({
                filterResult: accountInfo
            })
        } else {
            accountInfo.map((value, index) => {
                if (value.name.toLowerCase().search(query) != -1 || value.symbol.toLowerCase().search(query) != -1) {
                    result.push(Object.assign(value, { index }))
                }
            })

            this.setState({
                filterResult: result
            })
        }
    }
    renderItem = ({ item, index }) => {
        if (item.customToken || item.type == 'BEP2') {
            item.logo = `logo_${item.type.toLowerCase()}`
        } else {
            item.logo = `logo_${item.symbol.toLowerCase()}`
        }

        if (item.customToken || item.type == 'BEP2') {
            item.logo = `logo_${item.type.toLowerCase()}`
        } else {
            item.logo = `logo_${item.symbol.toLowerCase()}`
        }

        if (item.type === 'coin') {
            item.logo = `logo_${item.name.toLowerCase()}`
        }

        var Logo = CoinIcon[item.logo] || CoinIcon['logo_888'];

        return (
            <View style={[Styles.coin, index === 0 ? { borderTopColor: '#534e73', borderTopWidth: 1 } : '']}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.7 }}>
                    <View>
                        <Logo></Logo>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[Styles.textGarener, { fontSize: 14 }]}>{item.name.length <= 8 ? item.name : item.name.substring(0, 8) + '...'}</Text>
                        <Text style={[Styles.textGarener, { fontSize: 12, color: '#8f90a2' }]}>{item.symbol}</Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    {item.publicKey && <View>
                        <Text style={[Styles.textGarener, { fontSize: 10, color: '#8f90a2' }]}>Public key</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>{item.publicKey.length <= 16 ? item.publicKey : item.publicKey.substring(0, 16) + '...'}</Text>
                            <TouchableOpacity onPress={() => { Clipboard.setString(item.publicKey) }}>
                                <IconCopy />
                            </TouchableOpacity>
                        </View>
                    </View>}
                    <View>
                        <Text style={[Styles.textGarener, { fontSize: 10, color: '#8f90a2' }]}>Private key</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>{item.privateKey.length <= 16 ? item.privateKey : item.privateKey.substring(0, 16) + '...'}</Text>
                            <TouchableOpacity onPress={() => { Clipboard.setString(item.privateKey) }}>
                                <IconCopy />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {item.ownerPublicKey && <View>
                        <Text style={[Styles.textGarener, { fontSize: 10, color: '#8f90a2' }]}>Owner Public Key</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>{item.ownerPublicKey.length <= 16 ? item.ownerPublicKey : item.ownerPublicKey.substring(0, 16) + '...'}</Text>
                            <TouchableOpacity onPress={() => { Clipboard.setString(item.ownerPublicKey) }}>
                                <IconCopy />
                            </TouchableOpacity>
                        </View>
                    </View>}

                    {item.ownerPublicKey && <View>
                        <Text style={[Styles.textGarener, { fontSize: 10, color: '#8f90a2' }]}>Owner Private Key</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <Text style={[Styles.textGarener, { fontSize: 13 }]}>{item.ownerPrivateKey.length <= 16 ? item.ownerPrivateKey : item.ownerPrivateKey.substring(0, 16) + '...'}</Text>
                            <TouchableOpacity onPress={() => { Clipboard.setString(item.ownerPrivateKey) }}>
                                <IconCopy />
                            </TouchableOpacity>
                        </View>
                    </View>}

                </View>
            </View>
        )
    }

    renderListCoin() {
        return (
            <View style={Styles.waperListCoin}>
                <FlatList
                    data={this.state.filterResult}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={true}
                    extraData={this.state}
                />
            </View>
        )
    }


    render() {
        const { accountInfo } = this.props

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation} preRoute='Setting'></Back>
                        <View style={Styles.waperSearch}>
                            <IconSearch fill="white"></IconSearch>
                            <TextInput style={Styles.input} onChangeText={(text) => this.onSearch(text)}></TextInput>
                        </View>
                    </View>
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            value={accountInfo[0].mnemonic}
                            style={[Styles.textInput, Styles.waperInput]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10 }} onPress={() => { accountInfo[0].mnemonic }}>
                            <IconCopy />
                        </TouchableOpacity>
                    </View>
                    {this.renderListCoin()}
                </View>
            </View>
        )
    }
}

export default connect(state => ({
    accountInfo: state.app.allAccountInfo
}), ({
}))(ExportAccount)