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
        marginBottom: 50,
    },

    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    childMenu: {
        width: '47%',
        paddingBottom: 5,
        paddingTop: 5,
        alignItems: 'center'
    },

    selectedChildMenu: {
        borderBottomColor: '#ff6a7e',
        borderBottomWidth: 1
    },

    waperContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50
    },

    childContent: {
        alignItems: 'center'
    },

    input: {
        backgroundColor: '#534e73',
        borderRadius: 12,
        height: 28,
        width: 84,
        color: 'white',
        padding: 0,
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5
    },

    waperPicker: {
        height: 28, 
        width: 84, 
        borderRadius: 12, 
        overflow: 'hidden', 
        marginTop: 5
    },

    track: {
        height: 10,
        borderRadius: 4,
        backgroundColor: '#534e73',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.15,
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: '#f8a1d6',
        borderColor: '#a4126e',
        borderWidth: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },

    waperSlider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: screenWidth - 20,
        marginTop: 30,
        marginBottom: 50
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
