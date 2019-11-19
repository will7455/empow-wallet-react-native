import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    waperContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#413d5d'
    },

    container: {
        width: screenWidth - 20,
        paddingTop: 20
    },

    textGarener: {
        color: 'white',
        fontFamily: 'Poppins-Black',
    },

    waperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    waperInfo: {
        borderRadius: 8,
        backgroundColor: '#44405f',
        elevation: 6,
        overflow: 'hidden',
        paddingTop: 5
    },

    group1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5
    },

    group2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },

    child1: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    defaultChild2: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%'
    },

    selectedChild2: {
        backgroundColor: '#7055e9',
    },

    waperTransaction: {
        marginTop: 5
    },

    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    childMenu: {
        width: '30%',
        paddingBottom: 5,
        paddingTop: 5,
        alignItems: 'center'
    },

    selectedChildMenu: {
        borderBottomColor: '#ff6a7e',
        borderBottomWidth: 1
    },

    waperList: {
        marginTop: 5,
    },

    waperItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    waperButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:  screenWidth - 20,
        paddingTop: 10,
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0,
    },

    button: {
        width: '48%',
        alignItems: 'center',
        borderRadius: 26,
        elevation: 4,
        height: 40,
        justifyContent: 'center'
    },

    waperResource: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },

    resource: {
        backgroundColor: '#534e73',
        borderRadius: 8,
        elevation: 4,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        position: 'relative',
        overflow: 'hidden'
    },

    percent: {
        backgroundColor: '#726E8E',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%'
    }
});

export default styles;
