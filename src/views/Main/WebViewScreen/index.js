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

    render() {
        console.log("vananh")
        console.log(this.state.link)
        const { link } = this.state
        let WebViewRef;

        return (
            <View style={Styles.waperContainer}>
                <View style={Styles.container}>
                    <View style={Styles.waperHeader}>
                        <Back navigation={this.props.navigation}></Back>
                    </View>
                </View>
                <View style={Styles.waperWebView}>
                    <WebView
                        ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
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
                        <TouchableOpacity onpress={() => { WebViewRef && WebViewRef.goBack(); }}>
                            <ArrowLeft fill='white'></ArrowLeft>
                        </TouchableOpacity>
                        <TouchableOpacity onpress={() => { WebViewRef && WebViewRef.goForward(); }}>
                            <ArrowRight fill='white'></ArrowRight>
                        </TouchableOpacity>
                        <TouchableOpacity onpress={() => { WebViewRef && WebViewRef.reload(); }}>
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