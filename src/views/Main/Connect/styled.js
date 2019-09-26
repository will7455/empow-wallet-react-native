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
        borderBottomWidth: 1,
        borderBottomColor: '#534e73',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },

    notify: {
        borderColor: '#f94f4f',
        borderWidth: 1,
        marginTop: 35,
        height: 60,
        padding: 10,
        marginBottom: 35,
        marginTop: 20
    }
});

export default styles;
