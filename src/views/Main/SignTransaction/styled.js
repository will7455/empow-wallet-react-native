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
        marginBottom: 20,
    },

    waperGroup: {
        backgroundColor: '#534e73',
        borderRadius: 8,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        marginTop: 10
    },

    child: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },

    waperPicker: {
        width: '100%',
        borderRadius: 8,
        height: 32,
        elevation: 4,
        overflow: 'hidden',
        marginTop: 15
    },

    waperCheckbox: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },

    waperButton: {
        width: '100%',
        height: 46,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        marginTop: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    }
});

export default styles;
