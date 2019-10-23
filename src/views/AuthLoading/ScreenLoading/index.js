import React, { Component } from 'react'
import { Text, ImageBackground, TouchableOpacity } from 'react-native'
import Logo from '../../../assets/images/logo-empow.svg'
import Img1 from '../../../assets/images/img-loading-1.svg'
import Img2 from '../../../assets/images/img-loading-2.svg'
import Img3 from '../../../assets/images/img-loading-3.svg'
import BG from '../../../assets/images/bg-loading.png'
import Styles from './styled'

export default class ScreenLoading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    title: 'EMPOW',
                    bg: BG,
                    img: Logo
                },
                {
                    title: 'Chuỗi sinh thái hoàn hảo',
                    content: 'Hỗ trợ nhận các loại tiền',
                    img: Img1
                },
                {
                    title: 'Chọn Dapp tốt nhất',
                    content: 'Trải nghiệm ứng dung Blockchain đa dạng',
                    img: Img2
                },
                {
                    title: 'Bảo mật tuyệt đối',
                    content: 'Tính năng bảo mật tuyệt vời',
                    img: Img3
                }
            ]
        };
    };


    clickSkip = () => {
        this.props.navigation.navigate('Auth');
    }

    render() {

        var Img = this.state.data[this.props.index].img;
        return (
            <ImageBackground source={this.state.data[this.props.index].bg ? this.state.data[this.props.index].bg : ''} style={Styles.waperContainer}>
                <Img></Img>
                <Text style={[Styles.textGarener, Styles.title]}>
                    {this.state.data[this.props.index].title}
                </Text>
                <Text style={[Styles.textGarener, Styles.content]}>
                    {this.state.data[this.props.index].content}
                </Text>
                <TouchableOpacity style={Styles.button} onPress={() => this.clickSkip()}>
                    <Text style={[Styles.textGarener, Styles.text]}>Skip</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}