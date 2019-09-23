import React, { Component } from 'react'
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
} from 'react-native'
import BG from '../../../assets/images/bg-loading.png'
import Styles from './styled'
import IconCreate from '../../../assets/images/icon-create.svg'
import IconRestore from '../../../assets/images/icon-restore.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import IconCirkle from '../../../components/IconCirkle'
import StorageService from '../../../services/StorageService'
import WalletService from '../../../services/WalletService'

export default class CreateWallet extends Component {

	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		const accounts = StorageService.accounts;
		
		if (accounts) {
			WalletService.init(null);
			WalletService.updateServiceAddress();
			await WalletService.getAllAccountInfo();
			WalletService.startPool();

			this.props.navigation.navigate('Main');
		}
	}

	onClickCreate = () => {
		this.props.navigation.navigate('CreateNewWallet');
	}

	onClickRestore() {
		this.props.navigation.navigate('RestoreWallet');
	}
	
	render() {
		return (
			<ImageBackground source={BG} style={Styles.waperContainer}>
				<View style={Styles.waperMenu}>
                    <TouchableOpacity style={[Styles.menu, {borderBottomColor: '#44405f', borderBottomWidth: 2}]} onPress={() => this.onClickRestore()}>
                        <IconCirkle width={28} IconSource={IconRestore}></IconCirkle>
                        <Text style={Styles.textGarener}>Restore wallet</Text>
                        <ArrowRight fill="white"></ArrowRight>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.menu} onPress={() => this.onClickCreate()}>
                        <IconCirkle width={28} IconSource={IconCreate}></IconCirkle>
                        <Text  style={Styles.textGarener}>Create a new wallet</Text>
                        <ArrowRight fill="white"></ArrowRight>
                    </TouchableOpacity>
                </View>
			</ImageBackground>
		)
	}
}