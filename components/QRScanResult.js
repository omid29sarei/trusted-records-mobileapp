import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import FullStatusImg from '../assets/full-vaccinated-logo.png';
import digitallySigned from '../assets/signed.gif';
import digitallySignedFailed from '../assets/signFailed.png';
import QRBG from '../assets/BG.png';
import QRCode from 'react-native-qrcode-svg';
import { verification } from '../redux/actions/actions';

function QRScanResult({ route, navigation }) {
    const {originalData } = route.params;
    console.log("verifySignature from QR Scan Result: ", verifySignature)
    // console.log(sortedData, 'sortedData from qr result')
    const goToTakeSelfiePage = () => {
        if (verifySignature) {
            navigation.navigate('Take Selfie Info', { data: data, sortedData: sortedData, originalData: originalData })
        }
        else {
            navigation.navigate('QR Reader')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {verifySignature ?
                    (
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
                    ) :
                    null
                }

                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
                    <Image source={verifySignature ? digitallySigned : digitallySignedFailed} />
                    <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>STATUS</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 15, fontSize: 25 }}>{verifySignature ? "Digitally Signed" : "Verification Failed"} </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={goToTakeSelfiePage}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>{verifySignature ? "Decrypt Expanded Record" : "Scan a Valid QR Code"}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ImageBackground source={QRBG} style={styles.image}>
                        <View style={styles.qr}>
                            {verifySignature ?
                                (
                                    <QRCode
                                        size={250}
                                        value={data}
                                        quietZone={10}
                                    />
                                ) : null
                            }

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