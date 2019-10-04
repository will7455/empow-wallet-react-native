import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
} from 'react-native'
import Styles from './styled'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox'
import Back from '../../../components/Back'

export default class TermOfService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: '1.	Accept the Terms of Use',
                    content: `These Terms of Use will affect your rights and obligations when using the Empow wallet.\nBy creating a new wallet account and signing in to your Empow wallet, downloading & installing the Empow wallet mobile application, Empow wallet desktop application or Empow wallet extension, or accessing to our official website, you acknowledge that you have read, understood and agree to these Terms of Use.`,
                },
                {
                    title: '2.	Change of Terms of Use',
                    content: `We reserve the right to change the Terms of Use at any time. If we make significant changes, we will notify you of the changes before they take effect.\nBy continuing to use our service after the changes take effect, you agree to be bound by the revised policies.`,
                },
                {
                    title: '3.	Eligibility',
                    content: `To be eligible to use the Empow wallet, you must be at least 18 years old and have full civil act capacity to form legally binding contracts.\nYou may only use our service if the use is permitted by rules and laws of the country of residence or the country where you use our service.\nBy using the Empow wallet, we assume that you have accepted the full Terms of Use and met all the requirements we expect in this Terms of Use.`,
                },
                {
                    title: '4.	Rights of Service Providing',
                    content: `We may change, add or remove features of Empow wallet. We may pause or remove complete a feature altogether and we will notify you about the pause or removing in advance if possible.\nWe may release products, services or features that are still in testing or evaluating. We will label these products, services or features as previews, trials or any similar terms for you to recognize.\nWe reserve the right to restrict, suspend or terminate your account if we find you are violating these Terms of Use or are abusing any products and services we provide.\nWe will make every effort to ensure that our service is always available, but we cannot guarantee that it will be always uninterrupted. Our service may be interrupted for maintenance, repairs, upgrades, or network or equipment errors.`,
                },
                {
                    title: '5.	Empow Wallet’s Features',
                    content: `Features of Empow wallet: \n- Generate wallet addresses and encrypted private keys that you can use to send, receive and store cryptocurrencies and tokens; \n- Allow users to use decentralized applications (DApps) of third parties through using mobile application, desktop application, or extenstion version of Empow wallet;\n- Allow users to store cryptocurrency transaction data on Blockchain without downloading or installing any type of software.\n*Wallet address, private key and backup capability: An encrypted backup of the wallet address and the private key, linked to your wallet, can be stored on your own device. The private key is connected to the wallet address and together, they can be used to authorize cryptocurrency transfers. You are responsible for the confidentiality of your private key and memorized phrase. You must also keep the private key and the memorized phrase secure.\n*Cannot support the password retrieval: Empow wallet stores your wallet address but does not store the wallet password, encrypted private key, unencrypted private key or memorized phrase connected to your wallet. Therefore, we are unable to assist you in retrieving wallet password in case you lost the password. We also are unable to create a new password for your wallet. To regain access your wallet, you must remember the original password or your wallet.\n*Accuracy of information provided by users: You must guarantee that all personal information you provide when using Empow wallet is accurate and complete. You accept and acknowledge that we are not responsible for any errors or mistakes if the information you provide is incorrect.`,
                },
                {
                    title: '6.	Account Registration',
                    content: `You must create a wallet account and sign in to use your Empow wallet. When creating a new wallet account, you will be given a keystore file and a private key. You will be prompted to download and save up the keystore file. Your private key is encrypted with a password. You are responsible for the confidentiality of your private key and keystore file and all activities in your wallet account.\nYou agree to notify us immediately of any unauthorized use of your password, your wallet account or any other security breach. We will not be responsible for any loss or damage arising from your failure to comply with this term.\nWhen creating a new wallet account, you should take the necessary precautions to avoid losing the right to access to or control of your wallet. The proposed precautions include:\n- Create a strong password that you have not used for any other website or online service;\n- Use the backup function or protect your private key, the memorized phrase, and the password on an external hard drive;\n- Maintain the wallet security by protecting the private key and the memorized phrase connected to your wallet, for example, restricting access to your computer and wallet;\n- Promptly notify us if you discover or suspect any security breach related to your wallet.`,
                },
                {
                    title: '7.	Rights of Service Using',
                    content: `You must comply with usage policies, all applicable laws and legal requirements, including privacy and intellectual property laws in the use of Empow wallet.\nThe license to use Empow wallet we provide to you is applied worldwide, royalty-free, non-transferable, non-exclusive, and irrevocable. This license is used only for the purpose of allowing you to use Empow wallet and its benefits in accordance with our regulations.\nYour license to use the Empow wallet will be terminated if you fail to comply with these Terms or Use or other additional terms we offer from time to time.\nYou may not copy, modify, distribute, sell, rent, lend or exchange the right to access to your Empow wallet or any data or information on it.`,
                },
                {
                    title: '8.	Third Parties’ Services',
                    content: `When using our wallet, you may view the contents or use services provided by third parties or become users of DApps by using tokens/cryptocurremcies stored in the Empow wallet.\nWe do not control the contents and policies of any third party’s service. In any case, we will not be responsible for the accuracy or reliability of contents or policies of the services provided by any third party.\nUsers using third party’s services via Empow wallet also take responsibility to act in compliance with terms and policies of third parties. In any case, a description or reference to a third party's product or third party’s service is considered for the purpose of endorsing or promoting such third party’s product or service. We reserve the right to add, change or cancel the availability of any third party’s service.\nTo the extent permitted by Empow wallet, authorizing a third party to access or connect to your Empow wallet account means that you acknowledge that the authorizing is for the third party to specifically act on your behalf and without reducing any of your obligations under this agreement. You are responsible for any errors or mistakes of any third party granted the right to access to your Empow wallet account.`,
                },
                {
                    title: '9.	Feedback',
                    content: `We appreciate all your feedback on the services we offer and provide.\nAlso, you must agree that we are free to use, disclose, accept or modify any feedback (including any ideas, concepts, suggestions or comments) provided by you without any payment for you.`,
                },
                {
                    title: '10.	Restriction & Termination',
                    content: `These Terms of Use will be applied continuously until either you terminate your use of your wallet or we terminate your use of your wallet:\n- You can stop using the wallet at any time by deactivating your wallet account.\n- We reserve the right to suspend or terminate your access to the wallet if we detect: You are seriously violating these Terms of Use; you are using the Empow wallet in a way that could cause risk or loss to us, other users or the community. We are required to do so by the government or regulatory authority or as required by applicable laws.\nIn any of the above cases, we will notify you via the email address connected with your wallet account or in the next time if you attempt to access to your wallet account, unless we are prohibited by law to notify you.`,
                },
                {
                    title: '11. The Full Agreement',
                    content: `These Terms of Use constitute the entire agreement between any user and Empow team regarding the use of the Empow wallet.\nThese Terms of Use can replace any other agreements, promises, warranties, and understandings between any user and Empow team, whether written or oral, regarding the use of the Empow wallet.`,
                },
                {
                    title: '12.	Contact information',
                    content: `If you have any questions about these Terms of Service or any other policies, please contact us via email or send us a message via telegram, twitter, facebook page, etc.`,
                },
            ]
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={Styles.child}>
                <Text style={[Styles.textGarener, {fontWeight: 'bold'}]}>{item.title}</Text>
                <Text style={[Styles.textGarener, {fontSize: 12}]}>{item.content}</Text>
            </View>

        )
    }

    render() {
        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                        <Text style={[Styles.textGarener, {marginLeft: 20}]}>Term of Service</Text>
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