import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import FullStatusImg from '../assets/full-vaccinated-logo.png';
import Avatar from '../assets/avatar.png';
import FullyVaccinatedLogo from '../assets/full-vaccinated-logo.png';
import PartialVaccinatedLogo from '../assets/partial-vaccinated-logo.png';
import NotVaccinatedLogo from '../assets/not-vaccinated-logo.png';
import QRBG from '../assets/BG.png';
import QRCode from 'react-native-qrcode-svg';
import CryptoES from 'crypto-es';
import base64 from 'react-native-base64';
const binascii = require('binascii');

function QRPass({ route, navigation }) {
    const { data, sortedData, originalData, dekKey } = route.params;
    // const goToVerification = () => {
    //     navigation.navigate('')
    // }
    // console.log("KEY: ", dekKey)

    const iv = base64.decode(sortedData?.iv)
    // console.log("IV: ", iv)
    const key = base64.decode(dekKey)
    // console.log("KEY: ", key)
    const ct = base64.decode(sortedData?.enc_qrData)
    // console.log("CT: ", ct)
    let hex_enc_test = binascii.hexlify(ct)
    // console.log(hex_enc_test, 'hex_enc_test')
    let hex_key = binascii.hexlify(key)
    // console.log(hex_key, 'hex_key')
    let hex_iv = binascii.hexlify(iv)
    // console.log(hex_iv, 'hex_iv')

    const cipherParams = CryptoES.lib.CipherParams.create({
        ciphertext: CryptoES.enc.Hex.parse(hex_enc_test),
        key: key,
        iv: iv
    })
    // console.log(cipherParams, 'cipherParams')
    const decrypted = CryptoES.AES.decrypt(cipherParams, CryptoES.enc.Hex.parse(hex_key), { mode: CryptoES.mode.CBC, padding: CryptoES.pad.Pkcs7, iv: CryptoES.enc.Hex.parse(hex_iv) });
    // console.log(decrypted, "decrypted")
    var result2 = CryptoES.enc.Utf8.stringify(decrypted);
    // console.log(result2, 'check result2X')

    const decDataHandler = (data) => {
        const arr = data.split('\n')
        console.log(arr)
        const email = arr[0]
        const govermentIdentity = arr[1]
        let tempArr = []
        for (let index = 2; index < arr.length; index++) {
            let vaccineRecord = arr[index].split(',')
            const expiryDate = vaccineRecord[0]
            const vaccineName = vaccineRecord[1]
            const manufacturer = vaccineRecord[2]
            if (vaccineName == undefined) {
                tempArr = []
            }
            else {
                tempArr.push({
                    name: vaccineName,
                    expiry: expiryDate
                })
            }
        }
        const finalData = {
            email: email,
            govermentIdentity: govermentIdentity,
            vaccines: tempArr
        }
        console.log(finalData)
        return finalData
    }
    const decryptedData = decDataHandler(result2)
    // console.log(decryptedData, 'decryptedData')
    const monthLookup = (month) => {
        switch (month) {
            case "01":
                return "January"
            case "02":
                return "February"
            case "03":
                return "March"
            case "04":
                return "April"
            case "05":
                return "May"
            case "06":
                return "June"
            case "07":
                return "July"
            case "08":
                return "August"
            case "09":
                return "September"
            case "10":
                return "October"
            case "11":
                return "November"
            case "12":
                return "December"
            default:
                break;
        }
    }
    const imagePicker = () => {
        switch (sortedData?.vaccinationStatus) {
            case "F":
                return FullyVaccinatedLogo
            case "P":
                return PartialVaccinatedLogo
            case "N":
                return NotVaccinatedLogo
            default:
                break;
        }
    }
    let imageSource = imagePicker()
    const labelPicker = () => {
        switch (sortedData?.vaccinationStatus) {
            case "F":
                return "Fully Vaccinated"
            case "P":
                return "Partially Vaccinated"
            case "N":
                return "Not Vaccinated"
            default:
                break;
        }
    }
    let vaccinationStatusLabel = labelPicker()
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

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <View>
                        <Image style={styles.logo} source={imageSource} />
                    </View>
                    <View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>STATUS</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5, fontSize: 25 }}>{vaccinationStatusLabel}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>DIGITALLY SIGNED By</Text>
                            <Text style={{ fontWeight: 'bold' }}>Mater Dei</Text>
                        </View>
                    </View>
                </View>

                <View style={{ color: 'black', width: '100%', alignItems: 'center', padding: 20 }}>
                    {
                        decryptedData?.vaccines?.map((item, key) => {
                            // TODO: CHANGE THE DATE FORMAT
                            let expiryMonth = ''
                            let convertedMonth = ''
                            let fullDate = ''
                            if (item.expiry) {
                                expiryMonth = item.expiry.split('-')
                                convertedMonth = monthLookup(expiryMonth[1])
                                fullDate = `${expiryMonth[2]} / ${convertedMonth} / ${expiryMonth[0]}`
                            }
                            return (
                                <View key={key} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, justifyContent: 'space-between', backgroundColor: '#f2f2f2', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <Text style={{ fontWeight: 'bold', padding: 10 }}>{item?.name}</Text>
                                    <Text style={{ padding: 10 }}>{fullDate}</Text>
                                </View>
                            )
                        })
                    }
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground source={QRBG} style={styles.image}>
                            <View style={styles.qr}>
                                <QRCode
                                    size={250}
                                    value={originalData}
                                    quietZone={10}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </ScrollView>

        </View >
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
    logo: {
        width: 150,
        height: 150
    },
    image: {
        flex: 1,
        marginTop: 5,
        width: 350,
        // width: '100%',
        height: 350,
        resizeMode: "contain",
        // justifyContent: "center"
    },
    qr: {
        padding: 20,
        alignItems: 'center'
    }
})

export default QRPass;