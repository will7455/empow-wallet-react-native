import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
} from 'react-native'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Back from '../../../components/Back'
import StorageService from '../../../services/StorageService'

export default class Currency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'USD',
                    type: 'usd'
                },
                {
                    name: 'EURO',
                    type: 'eur'
                },
                {
                    name: 'POUND',
                    type: 'gbp'
                },
                {
                    name: 'YEN',
                    type: 'yen'
                },
            ],
        }
    }

    componentDidMount() {
        var data = this.state.data;
        var currency = StorageService.setting.currency;
        for (let i = 0; i < data.length; i++) {
            if (data[i].type.toLocaleLowerCase() === currency.toLocaleLowerCase()) {
                data[i].isChecked = true;
                break;
            }
        }

        this.setState({
            data
        })
    }

    toggleCheckbox = (index) => {
        var data = this.state.data;
        var value = '';
        for (let i = 0; i < data.length; i++) {
            if (i === index) {
                data[i].isChecked = true;
                value = data[i].type;
            } else {
                data[i].isChecked = false
            }
        }

        this.setState({
            data,
            value
        })

        StorageService.setting.currency = value;
        StorageService.save('setting');
        this.props.navigation.navigate('Unlock');
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={Styles.child}>
                <Text style={Styles.textGarener}>{item.name}</Text>
                <CircleCheckBox
                    checked={item.isChecked}
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
                        <Text style={[Styles.textGarener, { marginLeft: 20 }]}>Currency</Text>
                    </View>
                    <View style={Styles.waperList}>
                        <FlatList
                            data={this.state.data}
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