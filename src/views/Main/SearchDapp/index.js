import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native'
import Styles from './styled'
import IconSearch from '../../../assets/images/icon-search.svg'
import AvaGame from '../../../assets/images/ava-game.png'

export default class SearchDapp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDapp: [
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame
                },
                {
                    name: 'Imperial Throne',
                    content: 'Redefining War Gaming',
                    ava: AvaGame
                }
            ]
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }} >
                <Image source={item.ava} style={{ width: 50, height: 50 }}></Image>
                <Text style={Styles.textGarener}>{item.name.substr(0,8) + '...'}</Text>
            </View>
        )
    }

    renderListDapp() {
        return (
            <FlatList
                contentContainerStyle={Styles.waperListDapp}
                data={this.state.listDapp}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={true}
                extraData={this.state}
            />
        )
    }


    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <View style={Styles.waperSearch}>
                            <IconSearch fill="#aaaaaa"></IconSearch>
                            <TextInput style={Styles.input}></TextInput>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={[Styles.textGarener]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[Styles.textGarener, {fontSize: 16, fontWeight: 'bold'}]}>Propose</Text>
                    {this.renderListDapp()}
                </View>
            </View>
        )
    }
}