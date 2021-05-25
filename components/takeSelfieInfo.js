import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import FullStatusImg from '../assets/full-vaccinated-logo.png';
import Avatar from '../assets/avatar.png';
import QRCode from 'react-native-qrcode-svg';

function TakeSelfieInfo({ route, navigation }) {
    const { data, sortedData } = route.params;
    console.log(sortedData, 'sortedData from take selfie')
    const goToVerification = () => {
        navigation.navigate('Verification', { data: data, sortedData: sortedData })
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={{ paddingTop: 50, paddingLeft: 50, paddingRight: 50, paddingBottom: 50, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Identity Verification</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Image style={{ width: 300, height: 300, resizeMode: 'cover', borderRadius: 20 }} source={Avatar} />
                </View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, marginBottom: 15, fontSize: 25 }}>Capture Your Selfie</Text>
                <Text style={{ color: 'black', marginBottom: 45, textAlign: 'center', paddingLeft: 50, paddingRight: 50 }}>Keeping a neutral expression, Capture a photo with your face in the frame</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={goToVerification}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>Take Photo</Text>
                </TouchableOpacity>
            </View>
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
    button: {
        backgroundColor: '#00caf2',
        borderRadius: 30,
        width: '80%'

    },
    avatar: {
        flex: 1,
        // marginTop: 20,
        // height: 350,
        resizeMode: "cover",
        // justifyContent: "center"
    },
    qr: {
        padding: 30,
        alignItems: 'center'
    }
})

export default TakeSelfieInfo;