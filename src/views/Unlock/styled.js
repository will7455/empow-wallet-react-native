import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#413D5D',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    waperInput: {
        width: screenWidth - 20,
        borderRadius: 8,
        backgroundColor: '#534e73',
        paddingTop: 13,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },

    text: {
        fontSize: 12,
        color: '#8f90a2'
    },

    iconPass: {
        marginTop: 10,
    },

    input: {
        width: screenWidth - 60,
        paddingLeft: 20,
    },

    error: {
        borderWidth: 1, 
        borderColor: '#ff6a7e', 
        width: screenWidth - 20,
        padding: 10,
        marginTop: 20
    }
});

export default styles;