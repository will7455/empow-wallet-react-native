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

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },

    text1: {
        fontSize: 15,
    },

    text2: {
        fontSize: 13,
        color: '#8f90a2'
    },

    waperInfo: {
        width: '100%',
        height: screenHeight / 5,
        borderRadius: 12,
        backgroundColor: '#44405f',
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },

    waperList: {
        height: screenHeight / 2
    },

    waperItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10, 
        paddingBottom: 10
    }
});

export default styles;
