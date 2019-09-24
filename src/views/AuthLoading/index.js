import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import ScreenLoading from './ScreenLoading'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage';
import StorageService from '../../services/StorageService'
import FirebaseService from '../../services/FirebaseService'

class AuthLoading extends Component {

	async componentDidMount() {

		FirebaseService.init(this.loginCallback.bind(this))

		//await AsyncStorage.clear();
		const { navigation } = this.props

		const dataExists = await StorageService.dataExists();

		if (dataExists) {
			navigation.navigate('Unlock')
		}
	};

	async loginCallback(user) {
        if(user) {
            FirebaseService.user = user
        }
    }

	render() {
		return (
			<Swiper
				dot={<View style={{ backgroundColor: 'white', width: 7, height: 7, borderRadius: 7, marginLeft: 7, marginRight: 7 }} />}
				activeDot={<View style={{ backgroundColor: '#FF6A7E', width: 7, height: 7, borderRadius: 7, marginLeft: 7, marginRight: 7 }} />}
				loop={false}>
				<View>
					<ScreenLoading index={0} navigation={this.props.navigation}></ScreenLoading>
				</View>
				<View>
					<ScreenLoading index={1} navigation={this.props.navigation}></ScreenLoading>
				</View>
				<View>
					<ScreenLoading index={2} navigation={this.props.navigation}></ScreenLoading>
				</View>
				<View>
					<ScreenLoading index={3} navigation={this.props.navigation}></ScreenLoading>
				</View>
			</Swiper>
		)
	}
}

export default connect(state => ({
}), ({
}))(AuthLoading)