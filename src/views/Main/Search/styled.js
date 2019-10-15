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
        justifyContent: 'space-between',
        height: 32,
        width:'100%'
    },

    waperSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        borderRadius: 8,
        flex: 3,
        backgroundColor: 'white',
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 5
    },

    input: {
        marginLeft: 5,
        width: '90%',
        color: '#aaaaaa',
        height: '100%',
        padding: 0
    },

    waperListCoin: {
        marginTop: 60
    },

    coin: {
        flexDirection: 'row',
        paddingBottom: 12,
        paddingTop: 12,
        borderBottomColor: '#534e73',
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    }

});

export default styles;
