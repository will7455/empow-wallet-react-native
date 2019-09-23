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
        paddingTop: 20
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 13
    },

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },

    waperQr: {
        width: 252,
        height:252,
        borderColor: '#534e73',
        borderWidth: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden',
        backgroundColor: 'white'
    },

    waperAddress: {
        justifyContent:'space-between',
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#534e73',
        borderRadius: 8,
        width: '100%',
        padding: 10
    }
});

export default styles;
