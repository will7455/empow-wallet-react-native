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

    waperInput: {
        backgroundColor: '#534e73',
        borderRadius: 8,
        width: '100%',
        height: 67,
        padding: 10,
        marginBottom: 27
    },

    input: {

    },

    waperGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    waperPicker: {
        height: 28,
        width: 84,
        borderRadius: 12,
        overflow: 'hidden',
    },

    child: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },

    waperText: {
        borderBottomColor: '#ff6a7e',
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20
    }
});

export default styles;
