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
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    waperHeader: {
        width: '100%',
        height: 190,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    waperTitle: {
        alignItems: 'center',
        marginLeft: 20
    },
    waperSearch: {
        height: 28,
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#9f5ae4',
        elevation: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        width: 92,
        marginTop: 20
    },

    waperButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        top: -23
    },

    button: {
        height: 46,
        width: 175,
        borderRadius: 24,
        backgroundColor: '#534e73',
        elevation: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    notShow: {
        opacity: 0.7,
    },

    waperListCoin: {
        height: screenHeight/2
    },

    coin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        height: 76,
        width: '100%',
        backgroundColor: 'pink',
        marginBottom: 16,
        paddingLeft: 12,
        elevation: 8
    },

    waperChart: {
        position: 'relative',
        width: 86.5
    }
});

export default styles;