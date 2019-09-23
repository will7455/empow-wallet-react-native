import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#413D5D'
    },

    container: {
        width: screenWidth - 20,
        paddingTop: 20
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },

    textInput: {
        width: '100%',
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 12,
    },

    waperInput: {
        backgroundColor: '#534e73',
        borderRadius: 8
    },

    waperListCoin: {
        marginTop: 10,
        height: screenHeight/2
    },

    coin: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#534e73',
        borderRadius: 8,
        marginBottom: 8
    }

});

export default styles;
