import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import GeneralModal from './modal';

//TESTING STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';


function QRReader({ route, navigation }) {
    // const storeData = async (value) => {
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         await AsyncStorage.setItem('qrData', jsonValue)
    //     } catch (e) {
    //         // saving error
    //         console.log(e, 'Error while saving data')
    //     }
    // }

    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('qrData')
    //         return jsonValue != null ? JSON.parse(jsonValue) : null;
    //     } catch (e) {
    //         // error reading value
    //     }
    // }
    // let savedQRData = getData()
    // console.log(savedQRData, 'check load function')
    const finderWidth = 280;
    const finderHeight = 230;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const viewMinX = (width - finderWidth) / 2;
    const viewMinY = (height - finderHeight) / 2;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const [successScanned, setSuccessScanned] = useState({ is_scanned: false, data: {} });
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log(status, 'status of the permision')
            setHasPermission(status === 'granted');
        })();
    }, []);
    useEffect(() => {
    }, [successScanned?.is_scanned])

    // useEffect(() => {
    //     if (savedQRData) {
    //         navigation.navigate('QR Scan Result')
    //     }
    // }, [savedQRData])



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
                console.log(data, 'QR data')
                // storeData(data)
                setSuccessScanned({
                    is_scanned: true,
                    data: data
                })
            }
        }
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const Test = () => {
        navigation.navigate("Success Screen", { data: successScanned?.data })
    }

    return (
        <View style={styles.container}>
            {successScanned?.is_scanned ?
                (
                    <GeneralModal navigation={navigation} data={successScanned?.data} successScanned={successScanned} setSuccessScanned={setSuccessScanned} />
                ) :
                (
                    <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}
                        style={styles.QRContainer}>
                        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine edgeRadius={10} outerMaskOpacity={0.7} />
                        <Text style={styles.text} >Vaccination Records</Text>
                        {scanned && <Button style={styles.button} title="Scan Again" onPress={() => setScanned(false)} />}
                        {console.log(successScanned)}
                    </BarCodeScanner>
                )
            }
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