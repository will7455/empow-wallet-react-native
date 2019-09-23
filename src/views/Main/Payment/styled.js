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

    waperContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    notify: {
        borderColor: '#f94f4f',
        borderWidth: 1,
        marginTop: 10,
        height: 50,
        padding: 10,
        marginBottom: 10,
        width: '100%'
    },

    waperInfo: {
        backgroundColor: '#534e73',
        height: 180, 
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        padding: 20
    },

    waperInput: {
        backgroundColor: '#3c3854',
        borderRadius: 12,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
});

export default styles;
