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

    child: {
        flexDirection: 'row',
        paddingBottom: 12,
        paddingTop: 12,
        borderBottomColor: '#534e73',
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },

    button: {
        backgroundColor: '#b8c',
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
    },

    vanvan: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#532860',
        justifyContent: 'center',
    },
});

export default styles;
