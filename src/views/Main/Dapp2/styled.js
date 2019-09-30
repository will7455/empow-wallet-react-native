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
        height: screenHeight/3,
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
        width: '48%',
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
        height: screenHeight/2,
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
    },

    waperConnect: {
        position: 'absolute',
        width: '100%',
        bottom: -90,
        borderTopColor: '#413d5d',
        borderTopWidth: 1,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 4,
        backgroundColor: '#534e73',
        paddingTop: 8,
        paddingBottom: 15,
        zIndex: 10
    },
    childConnect: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
        marginBottom: 5
    },
    showListConnect: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    }
});

export default styles;