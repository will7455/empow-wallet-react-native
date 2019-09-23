import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    FlatList,
    Dimensions,
    Image
} from 'react-native'
import Swiper from 'react-native-swiper'
import Styles from './styled'
import IconSearch from '../../../assets/images/icon-search.svg'
import Menu from '../../../components/Menu'
import Img from '../../../assets/images/img-dapp.png'
import AvaGame from '../../../assets/images/ava-game.png'

const screenWidth = Math.round(Dimensions.get('window').width);

export default class Dapp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listAds: [
                { img: Img },
                { img: Img },
                { img: Img },
                { img: Img },
                { img: Img },
                { img: Img }
            ],

            listMenu: [
                {
                    type: 'Game',
                    dapp: [
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
                },

                {
                    type: 'Finance',
                    dapp: [
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
                    ]
                },

                {
                    type: 'Market',
                    dapp: [
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
                        },
                    ]
                },

                {
                    type: 'Utilities',
                    dapp: [
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
                    ]
                }
            ]
        }
    }

    setupListDapp(listDapp) {
        var result = [];

        for (let index = 0; index < listDapp.length; index++) {
            if (index % 3 === 0) {
                var obj = [];
                for (let i = index; i < index + 3; i++) {
                    if (listDapp[i]) {
                        obj.push(listDapp[i])
                    }
                }
                result.push(obj);
            }
        }

        return result;
    }

    clickSeeAll = (type) => {
        this.props.navigation.navigate('SeeAllDapp', {
            type
        });
    }

    clickSearch = () => {
        this.props.navigation.navigate('SearchDapp')
    }

    clickDapp = (name) => {
        Alert.alert(
            "Thông báo",
            `Bạn sắp vào DApp của bên thứ ba:\n                "${name}"\n
            
Xin hay lưu ý Chính sách bảo mật có liên quan đến DApp này, bảo vệ sự an toàn cho tài sản của bạn. Tất cả các hành vi và tình trạng sử dụng trong DApp này của bạn, đều do nhà cung ứng DApp này phụ trách.`,
            [
                { text: "Later", onPress: () => console.log("later pressed") },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    };


    renderAds() {
        return (
            <View style={Styles.waperAds}>
                <Swiper
                    showsPagination={false}
                    loop={false}>
                    {this.state.listAds.map((value, index) => {
                        return (
                            <View style={Styles.waperImg}>
                                <Image resizeMode='contain' source={value.img} style={{ width: screenWidth }}></Image>
                            </View>
                        )
                    })}
                </Swiper>
            </View>
        )
    }

    renderItem = ({ item }) => {
        var listDapp = this.setupListDapp(item.dapp);
        return (
            <View style={Styles.waperMenu}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[Styles.textGarener, { fontSize: 18, fontWeight: '600' }]}>{item.type}</Text>
                    <Text style={Styles.textGarener} onPress={() => this.clickSeeAll(item.type)}>See all</Text>
                </View>

                <Swiper
                    paginationStyle={{ bottom: -15 }}
                    dot={<View style={{ backgroundColor: 'white', width: 5, height: 5, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}
                    activeDot={<View style={{ backgroundColor: '#FF6A7E', width: 5, height: 5, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}
                    loop={false}>
                    {listDapp.map((value, index) => {
                        return (
                            <View>
                                {value.map((valuee, indexx) => {
                                    return (
                                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }} onPress={() => this.clickDapp(valuee.name)}>
                                            <View>
                                                <Image source={valuee.ava}></Image>
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={Styles.textGarener}>{valuee.name}</Text>
                                                <Text style={[Styles.textGarener, { fontSize: 12, color: '#8e96b5' }]}>{valuee.content}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        )
                    })}
                </Swiper>
            </View>

        )
    }

    renderListMenu() {
        return (
            <View style={Styles.waperListMenu}>
                <FlatList
                    data={this.state.listMenu}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={true}
                    extraData={this.state}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <TouchableOpacity style={Styles.waperSearch} onPress={() => this.clickSearch()}>
                        <IconSearch fill="#aaaaaa"></IconSearch>
                        <Text style={[Styles.textGarener, { color: '#aaaaaa', marginLeft: 5 }]}>Search</Text>
                    </TouchableOpacity>

                    {this.renderAds()}
                    {this.renderListMenu()}

                </View>
                <Menu navigation={this.props.navigation}></Menu>
            </View>
        )
    }
}