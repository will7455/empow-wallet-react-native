import React, { Component } from 'react'
import { Text, ImageBackground, TouchableOpacity, View, TextInput } from 'react-native'
import Styles from './styled'
import { connect } from 'react-redux'
import Back from '../../../components/Back'

import ArrowLeft from '../../../assets/images/arrow-left.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import IconRefresh from '../../../assets/images/icon-restore.svg'

import { WebView } from 'react-native-webview';
import injectScript from '../../../injectScript.json'
import WalletService from '../../../services/WalletService'
import StorageService from '../../../services/StorageService'
import PopupSignTransaction from '../../../components/PopupSignTransaction'

class WebViewScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.link ? this.props.navigation.state.params.link : 'https://www.google.com',
            modalVisible: false,
            transaction: false
        };

        WalletService.updateEthereumCallback(this.ethereumCallback.bind(this))
    };

    webView = {
        ref: null,
    }

    webViewResponse = (messageUUID, data = null) => {

        let injectScript = `
            window.postMessage({
                name: "contentScript",
                to: "injectScript",
                action: "RequestReply",
                messageUUID: "${messageUUID}",
                data: ${JSON.stringify(data)}
            })
        `
        console.log(injectScript);

        this.webView.ref.injectJavaScript(injectScript)
    }

    ethereumCallback = (messageUUID,data,result) => {
        this.ethereumJsonRpcRepsonse(messageUUID,data,result)
    }

    ethereumJsonRpcRepsonse = (messageUUID,data,result) => {
        let response = {
            id: data.id,
            jsonrpc: data.jsonrpc,
            result
        }

        this.webViewResponse(messageUUID, response)
    }

    ethreumPersonalSign = (messageUUID, rpcData, transaction) => {
        WalletService.ethereumTransaction('sign',messageUUID, rpcData, transaction, (error) => {
            if(error) {
                this.ethereumJsonRpcRepsonse(messageUUID, rpcData, error)
            } else {
                // show modal
                this.setState({
                    modalVisible: true,
                    transaction: WalletService.transactionQueue.transaction
                })
            }
        }, (messageUUID,rpcData,result) => {
            this.ethereumJsonRpcRepsonse(messageUUID, rpcData, result)
        })
    }

    ethereumSendTransaction = (messageUUID, rpcData, transaction) => {
        WalletService.ethereumTransaction('send',messageUUID, rpcData, transaction, (error) => {
            if(error) {
                this.ethereumJsonRpcRepsonse(messageUUID, rpcData, error)
            } else {
                // show modal
                this.setState({
                    modalVisible: true,
                    transaction: WalletService.transactionQueue.transaction
                })
            }
        }, (messageUUID,rpcData,result) => {
            this.ethereumJsonRpcRepsonse(messageUUID, rpcData, result)
        })
    }

    onGoBack = () => {
        if(this.webView.ref) this.webView.ref.goBack();
    }

    onGoForward = () => {
        if(this.webView.ref) this.webView.ref.goForward();
    }

    onReload = () => {
        if(this.webView.ref) this.webView.ref.reload();
    }

    onMessage = (event) => {
        let json = JSON.parse(event.nativeEvent.data)

        console.log(json);
        
        if(json.event == 'getWalletInfo') {
            this.webViewResponse(json.messageUUID, WalletService.getAddress())
        }

        if(json.event == 'getNetwork') {
            this.webViewResponse(json.messageUUID, WalletService.getNetwork())
        }
        
        if(json.event == 'connectEthereumWallet') {
            this.webViewResponse(json.messageUUID, [StorageService.accounts.ethereum.address])
        }

        if(json.event == 'connectEosWallet') {
            if(StorageService.accounts.eosActive.address == StorageService.accounts.eosActive.publicKey) {
                this.webViewResponse(json.messageUUID, {
                    error: 'Your EOS account is not active'
                })
            } else {
                this.webViewResponse(json.messageUUID, {
                    address: StorageService.accounts.eosActive.address,
                    permission: 'active'
                })
            }
        }
        
        if(json.event == 'ethereumJsonRpc') {
            let method = json.data.method

            switch (method) {
                case 'eth_accounts':
                    this.ethereumJsonRpcRepsonse(json.messageUUID,json.data,WalletService.getAddress('ethereum'))
                    break
                case 'eth_coinbase':
                    let ethAccount = WalletService.getAddress('ethereum')
                    this.ethereumJsonRpcRepsonse(json.messageUUID,json.data,ethAccount.length > 0 ? ethAccount[0] : null)
                    break
                case 'net_version':
                    this.ethereumJsonRpcRepsonse(json.messageUUID,json.data,WalletService.getEthereumNetworkID())
                    break
                case 'personal_sign':
                    this.ethreumPersonalSign(json.messageUUID, json.data, json.data.params)
                    break
                case 'eth_sign':
                    this.ethreumPersonalSign(json.messageUUID, json.data, json.data.params)
                    break
                case 'eth_sendTransaction':
                    this.ethereumSendTransaction(json.messageUUID, json.data, json.data.params)
                    break
                default:
                    WalletService.callEthereum(json.messageUUID,json.data,json.data.params)
                    break
            }
        }

        if(json.event == 'tronSignTransaction') {
            WalletService.tronTransaction(json.messageUUID, json.data, () => {
                // show modal
                this.setState({
                    modalVisible: true,
                    transaction: WalletService.transactionQueue.transaction
                })
            }, (messageUUID,result) => {
                this.webViewResponse(messageUUID, result)
            })
        }
    }

    onReject = () => {
        this.setState({
            modalVisible: false,
        })

        WalletService.rejectTransaction(this.webViewResponse)
    }

    onAccept = () => {
        this.setState({
            modalVisible: false
        })

        WalletService.acceptTransaction()
    }

    setModalVisible() {
        this.setState({
            modalVisible: false
        });
    }

    renderModal () {
        return (
            <PopupSignTransaction onPress={() => this.setModalVisible()} modalVisible={this.state.modalVisible} transaction={this.state.transaction} onReject={this.onReject} onAccept={this.onAccept}></PopupSignTransaction>
        )
    }

    render() {
        const { link } = this.state

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                    </View>
                </View>
                <View style={Styles.waperWebView}>
                    <WebView
                        ref={(ref) => { this.webView.ref = ref; }}
                        source={{ uri: link }}
                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        scalesPageToFit={true}
                        mixedContentMode='always'
                        onMessage={this.onMessage}
                        onLoadStart={() => this.webView.ref.injectJavaScript(injectScript.inject)}
                    />
                </View>
                <View style={Styles.container}>
                    <View style={Styles.waperFooder}>
                        <TouchableOpacity onPress={() => this.onGoBack()}>
                            <ArrowLeft fill='white'></ArrowLeft>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onGoForward()}>
                            <ArrowRight fill='white'></ArrowRight>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onReload()}>
                            <IconRefresh fill='white'></IconRefresh>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.renderModal()}
            </View>
        )
    }
}

export default connect(state => ({
}), ({
}))(WebViewScreen)