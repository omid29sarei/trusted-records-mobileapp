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

function QRPass({ route, navigation }) {
    const { data, sortedData, originalData, dekKey } = route.params;
    console.log(sortedData, 'sortedData from qr pass')
    // const goToVerification = () => {
    //     navigation.navigate('')
    // }
    const decrypted = CryptoES.AES.decrypt(sortedData?.enc_qrData, dekKey, { mode: CryptoES.mode.CFB, iv: sortedData?.iv });
    console.log(decrypted, 'decrypted after dek key')
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

    const mockData = [
        { name: "COVID BOOSTER", expiry: '10 September 2021' },
        { name: "COVID BOOSTER-2", expiry: '10 June 2021' }
    ]
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
                {/* HEADER SECTION */}
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
                {/* VACCINATION STATUS AND LOGO */}
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
                            <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>DIGITALLY SIGNED</Text>
                            <Text style={{ fontWeight: 'bold' }}>Healthcare Entity Name</Text>
                        </View>
                    </View>
                </View>
                {/* SHOWING THE VACCINATION RECORDS */}
                <View style={{ color: 'black', width: '100%', alignItems: 'center', padding: 20 }}>
                    {
                        mockData?.map((item, key) => {
                            // TODO: CHANGE THE DATE FORMAT
                            return (
                                <View key={key} style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, justifyContent: 'space-between', backgroundColor: '#f2f2f2', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <Text style={{ fontWeight: 'bold', padding: 10 }}>{item?.name}</Text>
                                    <Text style={{ padding: 10 }}>{item?.expiry}</Text>
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