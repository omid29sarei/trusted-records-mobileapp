import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import FullStatusImg from '../assets/full-vaccinated-logo.png';
import digitallySigned from '../assets/signed.gif';
import QRBG from '../assets/BG.png';
import QRCode from 'react-native-qrcode-svg';

function QRScanResult({ route, navigation }) {
    const { data, sortedData } = route.params;
    console.log(sortedData, 'sortedData from qr result')
    const goToTakeSelfiePage = () => {
        navigation.navigate('Take Selfie Info', { data: data, sortedData: sortedData })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ backgroundColor: '#efefef', height: 70, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <View>
                        <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>NAME</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{sortedData?.name}{' '}{sortedData?.surname}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>VACCINATION RECORD</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>SARS-COV-2 Vaccine</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
                    <Image source={digitallySigned} />
                    <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>STATUS</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 15, fontSize: 25 }}>Digitally Signed</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={goToTakeSelfiePage}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>Decrypt Expanded Record</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ImageBackground source={QRBG} style={styles.image}>
                        <View style={styles.qr}>
                            <QRCode
                                size={250}
                                value={data}
                                quietZone={10}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'column',
        // justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#00caf2',
        borderRadius: 30,
        width: '80%'

    },
    image: {
        flex: 1,
        marginTop: 20,
        height: 350,
        resizeMode: "contain",
        // justifyContent: "center"
    },
    qr: {
        padding: 30,
        alignItems: 'center'
    }
})

export default QRScanResult;