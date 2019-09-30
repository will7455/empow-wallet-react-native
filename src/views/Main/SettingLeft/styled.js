import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#3C3854'
    },

    container: {
        width: screenWidth - 20,
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    waperList: {
        width:'100%',
        backgroundColor: '#534e73',
        alignItems: 'center',
        marginBottom: 20,
    },

    child: {
        borderBottomWidth: 1,
        borderBottomColor: '#3C3854',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default styles;
