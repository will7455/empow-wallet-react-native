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

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 13,
        flex: 1,
        paddingLeft: 20
    },

    waperMenu: {
        borderRadius: 8,
        backgroundColor: '#534e73',
        width: screenWidth - 20,
        paddingRight: 18,
        paddingLeft: 18
    },

    menu: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    }
});

export default styles;