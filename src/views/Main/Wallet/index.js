import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
} from 'react-native'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Back from '../../../components/Back'
import ServerAPI from '../../../ServerAPI'
import Button from '../../../components/Button'
import FirebaseService from '../../../services/FirebaseService'

export default class Wallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUserAddress: [],
            loading: false
        }
    }

    async componentDidMount() {
        const idToken = await FirebaseService.getIdToken();
        var listUserAddress = await ServerAPI.getUserAddress("ethereum", idToken);
        this.setState({
            listUserAddress,
            idToken
        })
    }

    toggleCheckbox = (index) => {
        var listUserAddress = this.state.listUserAddress;
        var data = listUserAddress[index];

        if (data.selected) {
            return;
        }

        for (let i = 0; i < listUserAddress.length; i++) {
            listUserAddress[i].selected = false;
        }

        data.selected = true;
        var address = data.address;
        listUserAddress[index] = data;

        this.setState({
            listUserAddress,
            address
        })
    }

    onSave = async () => {
        if (!this.state.address) {
            return;
        }

        this.setState({
            loading: true
        })

        await ServerAPI.updateSelectedAddress(this.state.address, this.state.idToken);

        this.setState({
            loading: false
        })
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={Styles.child}>
                <Text style={[Styles.textGarener]}>{item.address.length <= 30 ? item.address : item.address.substring(0, 30) + '...'}</Text>
                <CircleCheckBox
                    checked={item.selected}
                    onToggle={() => this.toggleCheckbox(index)}
                    labelPosition={LABEL_POSITION.RIGHT}
                    outerSize={15}
                    innerSize={10}
                    outerColor='white'
                    innerColor='#EE4F5F'
                />
            </View>
        )
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Wallet</Text>
                    </View>
                    <View style={Styles.waperList}>
                        <FlatList
                            data={this.state.listUserAddress}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={true}
                            extraData={this.state}
                        />
                    </View>

                    <Button children="Save" onPress={() => this.onSave()} isLoading={this.state.loading}></Button>
                </View>
            </View>
        )
    }
}