import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import FullStatusImg from '../assets/full-vaccinated-logo.png';
import Avatar from '../assets/avatar.png';
import FullyVaccinatedLogo from '../assets/full-vaccinated-logo.png';
import QRBG from '../assets/BG.png';
import QRCode from 'react-native-qrcode-svg';

function QRPass({ route, navigation }) {
    // const { data } = route.params;
    // const goToVerification = () => {
    //     navigation.navigate('')
    // }
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
        { name: "COVID BOOSTER-2", expiry: '10 June 2021' },
        { name: "COVID BOOSTER-3", expiry: '10 July 2021' },

    ]
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* HEADER SECTION */}
                <View style={{ backgroundColor: '#efefef', height: 70, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <View>
                        <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>NAME</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>John Doe</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>VACCINATION RECORD</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>SARS-COV-2 Vaccine</Text>
                    </View>
                </View>
                {/* VACCINATION STATUS AND LOGO */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <View>
                        <Image source={FullyVaccinatedLogo} />
                    </View>
                    <View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ color: '#aaaaaa', fontWeight: 'bold', marginBottom: 5 }}>STATUS</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5, fontSize: 25 }}>Fully Vaccinated</Text>
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
                                    value={'dajhgkjgkjgjkhgjkhgkjhgjkhgjkhgkjhgjhgjkhgkhgkjhta'}
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