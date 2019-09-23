import React from 'react'
import { StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


export default props => {
    const { IconSource, width } = props


    return (
        <LinearGradient
            {...props}
            style={[styles.linearGradient, { width: width, borderRadius: width, height: width }]}
            colors={['#f94f4f', '#8e3ddf']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
            <IconSource fill="white"/>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
