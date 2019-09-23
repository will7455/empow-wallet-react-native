import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
} from 'react-native'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Back from '../../../components/Back'

export default class Language extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Tiếng Việt',
                    isChecked: true,
                },
                {
                    name: 'English',
                    isChecked: false
                },
                {
                    name: '中文',
                    isChecked: false
                },
                {
                    name: '日本語',
                    isChecked: false
                },
            ]
        }
    }

    toggleCheckbox = (index) => {
        var data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            if (i === index) {
                data[i].isChecked = true;
            } else {
                data[i].isChecked = false
            }
        }

        this.setState({
            data
        })
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
                        <Text style={[Styles.textGarener, {marginLeft: 20}]}>Language</Text>
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