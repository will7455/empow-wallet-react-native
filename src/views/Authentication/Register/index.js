import React, { Component } from 'react'
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	TextInput
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import Logo from '../../../assets/images/logo-empow.svg'
import ShowPass from '../../../assets/images/show-pass.svg'
import HidePass from '../../../assets/images/hiden-pass.svg'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import StorageService from '../../../services/StorageService'

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowPass: false,
			isShowPassRepeat: false,
			checked: true,
			error: false,
			loading: false
		}
	}

	togglePass = (index) => {
		if (index === 1) {
			this.setState({
				isShowPass: !this.state.isShowPass
			})
		}

		if (index === 2) {
			this.setState({
				isShowPassRepeat: !this.state.isShowPassRepeat
			})
		}
	}

	toggleCheckbox = () => {
		this.setState({
			checked: !this.state.checked
		})
	}

	clickContinue = () => {
		this.setState({
			loading: true
		})

		if (!this.state.password || !this.state.repeatPassword) {
			this.setState({
				error: 'Chưa nhập pass',
				loading: false
			})
			return
		}

		if (this.state.password !== this.state.repeatPassword) {
			this.setState({
				error: 'pas không khớp',
				loading: false
			})
			return
		}

		StorageService.init(this.state.password);
		this.props.navigation.navigate('CreateWallet');
	}
	
	onChangeText = (text, index) => {
		if (index === 1) {
			this.setState({
				password: text
			})
		}

		if (index === 2) {
			this.setState({
				repeatPassword: text
			})
		}
	}

	render() {
		return (
			<ImageBackground source={BG} style={Styles.waperContainer}>
				<Logo style={Styles.logo} />
				{this.state.error && <View style={Styles.error}>
					<Text style={[Styles.textGarener, {color: '#ff6a7e'}]}>{this.state.error}</Text>
				</View>}
				<View style={Styles.waperInput}>
					<Text style={[Styles.textGarener, Styles.text]}>Password</Text>
					<View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
						<TextInput secureTextEntry={!this.state.isShowPass} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 1)}></TextInput>
						{this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass(1)}>
							<HidePass style={Styles.iconPass} ></HidePass>
						</TouchableOpacity>}
						{!this.state.isShowPass && <TouchableOpacity onPress={() => this.togglePass(1)}>
							<ShowPass style={Styles.iconPass} ></ShowPass>
						</TouchableOpacity>}
					</View>
				</View>

				<View style={[Styles.waperInput, { marginTop: 10 }]}>
					<Text style={[Styles.textGarener, Styles.text]}>Repeat password</Text>
					<View style={{ marginLeft: -20, flexDirection: 'row', justifyContent: 'space-between' }}>
						<TextInput secureTextEntry={!this.state.isShowPassRepeat} style={[Styles.textGarener, Styles.input]} onChangeText={(text) => this.onChangeText(text, 2)}></TextInput>
						{this.state.isShowPassRepeat && <TouchableOpacity onPress={() => this.togglePass(2)}>
							<HidePass style={Styles.iconPass} ></HidePass>
						</TouchableOpacity>}
						{!this.state.isShowPassRepeat && <TouchableOpacity onPress={() => this.togglePass(2)}>
							<ShowPass style={Styles.iconPass} ></ShowPass>
						</TouchableOpacity>}
					</View>
				</View>

				<View style={Styles.waperCheckbox}>
					<CircleCheckBox
						checked={this.state.checked}
						onToggle={this.toggleCheckbox}
						labelPosition={LABEL_POSITION.RIGHT}
						outerSize={15}
						innerSize={10}
						outerColor='white'
						innerColor='#EE4F5F'
					/>
					<Text style={[Styles.textGarener, { marginLeft: 5, fontSize: 12 }]} >I agree to the <Text style={{ color: '#ff6a7e' }}>terms of service</Text></Text>
				</View>

				<Button children="Continue" onPress={() => this.clickContinue()} isLoading={this.state.loading}></Button>
			</ImageBackground>
		)
	}
}

export default connect(state => ({
}), ({
}))(Register)