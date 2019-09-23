import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    container: {
        width: screenWidth - 20,
        paddingTop: 20
    },

    back: {
        width: '100%',
        textAlign: 'left'
    },

    textInput: {
        width: '100%',
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 12,
    },

    waperInput: {
        marginTop: 54,
        backgroundColor: '#534e73',
        borderRadius: 8
    },

    waperContent: {
        marginTop: 28,
        borderColor: 'white',
        borderWidth: 1,
        padding: 10
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
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