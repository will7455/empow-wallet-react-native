import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    Image
} from 'react-native'
import Styles from './styled'
import Back from '../../../components/Back'
import AvaGame from '../../../assets/images/ava-game.png'
import Tron from '../../../assets/images/tron-dapp.svg'
import Ethereum from '../../../assets/images/ethereum-dapp.svg'
import Iost from '../../../assets/images/iost-dapp.svg'

export default class SeeAllDapp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dapp: [
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'tron'
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'tron'
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'ethereum'
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'ethereum'
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'iost'
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'iost'
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame,
                    type: 'iost'
                }
            ],
            type: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.type ? this.props.navigation.state.params.type : ''
        }
    }

    renderItem = ({ item, index }) => {
        var Img = item.type === 'tron' ? Tron : item.type === 'iost' ? Iost : Ethereum
        return (
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View>
                    <Image source={item.ava} style={{width: 80, height: 80}}></Image>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={Styles.textGarener}>{item.name}</Text>
                    <Text style={[Styles.textGarener, { fontSize: 12, color: '#8e96b5', marginBottom: 15 }]}>{item.content}</Text>
                    <Img></Img>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>{this.state.type}</Text>
                    </View>
                    <View style={Styles.waperList}>
                        <FlatList
                            data={this.state.dapp}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={true}
                            extraData={this.state}
                        />
                    </View>
                </View>

            </View>
        )
    }
}