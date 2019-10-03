import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#3c3854'
    },

    container: {
        width: screenWidth - 20,
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 14
    },

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },

    waperWebView: {
        width: '100%',
        height: screenHeight - 120
    },

    waperFooder: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default styles;
