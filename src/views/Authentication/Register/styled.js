import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    waperInput: {
        width: screenWidth - 20,
        borderRadius: 8,
        backgroundColor: '#534e73',
        paddingTop: 13,
        paddingLeft: 20,
        paddingRight: 20
    },

    logo: {
        marginBottom: 50
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    text: {
        fontSize: 12,
        color: '#8f90a2'
    },

    input: {
        width: screenWidth - 60,
        paddingLeft: 20
    },

    iconPass: {
        marginTop: 10,
    },

    waperCheckbox: {
        width: screenWidth - 20,
        flexDirection: 'row',
        marginTop: 10
    },

    error: {
        borderWidth: 1, 
        borderColor: '#ff6a7e', 
        width: screenWidth - 20,
        padding: 10,
        marginBottom: 10
    }
});

export default styles;