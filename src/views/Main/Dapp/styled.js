import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#3c3854',
    },

    container: {
        width: screenWidth - 20,
        paddingTop: 20
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
        fontSize: 14
    },

    waperSearch: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        borderRadius: 8,
        paddingRight: 10,
        paddingLeft: 10,
        width: '100%'
    },

    waperAds: {
        width: '100%',
        height: (screenWidth - 20) * 182 / 402,
        marginTop: 20,
       
    },

    waperImg: {
        alignItems:'center',
        justifyContent: 'center'
    },

    waperListMenu: {
        width: '100%',
        height: screenHeight / 2.5,
    },

    waperMenu: {
        width: '100%',
        height: 190,
        marginTop: 20,
        borderTopColor: '#534e73',
        borderTopWidth: 1,
        paddingTop: 20,
    },
});

export default styles;
