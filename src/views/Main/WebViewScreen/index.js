import React, { Component } from 'react'
import { Text, ImageBackground, TouchableOpacity, View, TextInput } from 'react-native'
import Styles from './styled'
import { connect } from 'react-redux'
import Back from '../../../components/Back'

import ArrowLeft from '../../../assets/images/arrow-left.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import IconRefresh from '../../../assets/images/icon-restore.svg'

import { WebView } from 'react-native-webview';

class WebViewScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.link ? this.props.navigation.state.params.link : 'https://www.google.com',
        };
    };

    webView = {
        ref: null,
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
                        ref={(webView) => { this.webView.ref = webView; }}
                        source={{ uri: link }}
                        style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        scalesPageToFit={true}
                        mixedContentMode='always'
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
            </View>
        )
    }
}

export default connect(state => ({
}), ({
}))(WebViewScreen)