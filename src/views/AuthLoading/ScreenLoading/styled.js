import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        resizeMode: 'cover',
        backgroundColor: '#413D5D',
        justifyContent: 'center'
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    title: {
        marginTop: 44,
        fontWeight: 'bold',
        fontSize: 24
    },

    content: {
        color: '#8f90a2',
        fontSize: 14,
    },

    button: {
        position: 'absolute',
        width: 66,
        height: 25,
        borderRadius: 12,
        backgroundColor: '#ff6a7e',
        alignItems: 'center',
        justifyContent: 'center',
        top: screenHeight - 70,
        left: screenWidth - 100
    },

    text: {
        fontSize: 12
    }
    
});

export default styles;