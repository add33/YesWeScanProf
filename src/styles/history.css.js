import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './colors';

let dim = Dimensions.get('window')

export const styleHistory = StyleSheet.create({
    product: {
        flex: 1,
        backgroundColor: Colors.platinum,
        padding: 10
    },
    img: {
        width: dim.width * 0.2
    },
    name: {
        fontSize: 24,
        color: Colors.tulip
    },
    subName: {
        fontSize: 16,
        color: Colors.taupe,
        marginBottom: 20
    },
    col: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    half: {
        width: dim.width * 0.4,
        flex: 0.4
    },
    center: {
        alignItems: "center"
    },
    label: {
        fontWeight: 'bold',
    },
    textInfo: {
        color: "#343434",
        marginBottom: 10,
        width: dim.width * 0.4
    },
    title: {
        height: 20,
        backgroundColor: Colors.orange,
        color: Colors.platinum,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10
    }
});