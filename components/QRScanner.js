import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import GeneralModal from './modal';

//TESTING STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';


function QRReader({ route, navigation }) {
    const mockIT2 = "[69, 25, 28, 47, -32, -82, -6, 28, 19, 40, -63, -66, 6, 22, 5, -43, 29, 29, -72, 16, 34, 3, 33, -7, 34, -36, -8, -22, 42, -100, -18, 67, 69, 18, -68, -9, -31, -16, -47, -121, 40, 20, -29, 9, -25, -33, 18, 27, -26, -34, -20, -28, -37, -50, 28, -20, -26, 5, 43, 43, -26, -4, 13, 23, -39, 12, 38, -7, -86, -51, -19, 6, -44, -42, 27, -53, 56, 85, -80, 18, 26, -77, 6, -25, -27, -41, -11, -90, 12, -33, 32, 92, -69, -35, -3, 42, -15, 104, 15, -6, -23, 24, -34, -20, 39, -59, 73, 48, -38, 43, -79, 0, -60, 14, 86, 31, 6, -48, -127, -104, -11, 31, -2, -89, 127, -57, 1, -6]"
    const omidsIT2 = "[63,27,21,40,-22,-85,-6,19,17,43,-54,-56,7,19,9,-39,47,19,-79,11,36,3,31,-5,31,-33,-12,-21,42,-97,-15,71,58,13,-58,-14,-25,-16,-52,-127,34,14,-43,12,-21,-17,21,23,-38,-34,-19,-26,-37,-42,28,-26,-30,6,46,46,-32,-6,14,24,-42,3,41,-9,-84,-51,-12,-3,-42,-38,37,-54,71,90,-71,20,23,-77,4,-38,-18,-41,-10,-86,11,-34,31,94,-70,-40,0,40,-21,95,16,-13,-16,25,-33,-30,42,-60,77,44,-32,30,-89,4,-63,14,84,27,11,-46,-127,-104,-14,28,-12,-92,127,-56,-2,-5]"
    const finderWidth = 280;
    const finderHeight = 230;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const viewMinX = (width - finderWidth) / 2;
    const viewMinY = (height - finderHeight) / 2;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.front);
    const [scanned, setScanned] = useState(false);
    const [successScanned, setSuccessScanned] = useState({ is_scanned: false, data: {} });
    useEffect(() => {
        (async () => {
            try {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            }
            catch (e) {
                console.log(e)
            }
        })();
    }, []);
    useEffect(() => {
    }, [successScanned?.is_scanned])
    useEffect(() => {

    }, [scanned])
    const handleBarCodeScanned = (scanningResult) => {
        if (!scanned) {
            const { type, data, bounds: { origin } = {} } = scanningResult;
            const { x, y } = origin;
            if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                setScanned(true);
                // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
                // navigation.navigate("QR Scan Result")
            }
            if (data) {
                console.log(data,"CHECKING QR DATA")
                setSuccessScanned({
                    is_scanned: true,
                    data: data
                })
                
                navigation.navigate('Take Selfie Info', { originalData: data,mockIT2})
            }
        }
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    // <Button style={styles.button} title="Scan Again" onPress={() => setScanned(false)}/>
    return (
        <View style={styles.container}>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}
                style={styles.QRContainer}>
                <BarcodeMask edgeColor="#62B1F6" showAnimatedLine edgeRadius={10} outerMaskOpacity={0.7} />
                {scanned?undefined:<Button style={styles.button} title="Scan Again" onPress={() => setScanned(false)}/>}
                <Text style={styles.text} >Scan Your Ticket</Text>
            </BarCodeScanner>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    QRContainer: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'relative'
        // width: '70%'
    },
    text: {
        // flex: 1,
        padding: 80,
        // backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        flex: 1,
        marginBottom: 40,
        // backgroundColor: 'white',
        // flexDirection: 'column',
        // justifyContent:'space-between',
        zIndex: 100,
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    buttomText: {
        flex: 1,
        // marginTop: 90,
        // backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default QRReader