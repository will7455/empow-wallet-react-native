import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const screenWidth = Math.round(Dimensions.get('window').width);

export default props => {
    const { children, onPress, btnStyle, txtStyle } = props

    return (
        <TouchableOpacity  onPress={onPress}>
            <LinearGradient
                {...props}
                colors={['#f94f4f', '#8e3ddf']}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
                <Text style={[styles.textGarener, styles.textButton]}>
                    {children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    linearGradient: {
        width: screenWidth - 20,
        height: 46,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        marginTop: 15,
        justifyContent: 'center'
    },

    textButton: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Poppins-Black',
    }
})
