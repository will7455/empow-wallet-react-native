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
        fontSize: 14
    },

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },

    waperMenu: {
        backgroundColor: '#534e73',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10
    },

    menu: {
        borderBottomColor: '#3c3854',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    notify: {
        borderColor: '#f94f4f',
        borderWidth: 1,
        marginTop: 35,
        height: 60,
        padding: 10,
        marginBottom: 35
    }
});

export default styles;
