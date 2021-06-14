import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import CryptoES from 'crypto-es';
var KeyEncoder = require('react-native-key-encoder'),
    keyEncoder = new KeyEncoder('secp256k1')
var base64 = require('base-64');
var sha256 = require('sha256')
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
import binascii from 'binascii';
var ba = require('binascii');
var Buffer = require('buffer/').Buffer


function GeneralModal({ navigation, data, successScanned, setSuccessScanned }) {
    const [verificationError, setVerificationError] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    //PUBLIC KEY VARIABLE AND CONVERTION TO HEX REPRESENTATION
    let pub_pem = `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEj56hamXUE8ZaHzuLI4bAMR+epHK0+2x9
zT3sHweW1LsFdosBwAylkyvIOiuPKE5ol0DUXt//RJiCUcFDZzFFGA==
-----END PUBLIC KEY-----`;
    var public_key_hex = keyEncoder.encodePublic(pub_pem, 'pem', 'raw')
    var key = ec.keyFromPublic(public_key_hex, 'hex');

    const convertData = (qrData) => {
        let splittedData = qrData.split('\n')
        console.log(splittedData, 'splittedData')
        let name = splittedData[0].split(',')[0]
        let surname = splittedData[0].split(',')[1]
        let vaccinationStatus = splittedData[0].split(',')[2]
        const enc_dek = splittedData[1]
        const digitalSignature = splittedData[4]
        const iv = splittedData[3]
        const enc_qrData = splittedData[2]

        const sortedData = {
            name,
            surname,
            vaccinationStatus,
            enc_dek,
            digitalSignature,
            iv,
            enc_qrData
        }
        return sortedData
    }
    let sortedData = convertData(data)
    // console.log('sortedData: ', sortedData)


    const validateSignature = (sortedData) => {
        try {
            // THIS IS ONLY FOR TESTING THE VERIFICATION FAIL FLOW
            // const failedQRData = "HW424ABCfc1zXscl/ae8ep7Xh9uo46gwyqwNjuPc5BrHfFGyWylEHokIbitGjDmLUYizjxkCZey7J3hj"
            // const failedSignature = "aaaCIHij4xVkjYk2WIa6+oaveFbCUEMq2pJEhicSw2IehiKoAiEAjNjYYbEuMUkkqjZWHQXyTkh11rpu/N0/ZopS4dG/qJ8="
            // var buf = new Buffer.from(failedQRData, 'base64');
            // let qrDataHashed = sha256(buf);
            // const decodedSignature = base64.decode(failedSignature)
            // const hexDecodedSignature = ba.hexlify(decodedSignature)

            var buf = new Buffer.from(sortedData?.enc_qrData, 'base64');
            let qrDataHashed = sha256(buf);
            console.log("qrData Hashed: ", qrDataHashed);
            const decodedSignature = base64.decode(sortedData?.digitalSignature)
            const hexDecodedSignature = ba.hexlify(decodedSignature)
            console.log("Hex Decoded Signature: ", hexDecodedSignature)
            const verifySignature = key.verify(qrDataHashed, hexDecodedSignature)
            return verifySignature
        } catch (error) {
            console.log(error, 'ERROR')
            return false


        }
    }
    const verifySignatureResult = validateSignature(sortedData)


    const returnToScan = () => {
        toggleModal()
        setSuccessScanned({
            is_scanned: false
        })
    }
    const goToResultPage = () => {
        toggleModal()
        navigation.navigate('QR Scan Result', { data: data, sortedData: sortedData, originalData: data, verifySignature: verifySignatureResult })
        // navigation.navigate('QR Pass')
        setSuccessScanned({
            is_scanned: false
        })
    }
    React.useEffect(() => {
        if (successScanned?.is_scanned) {
            toggleModal()
        }
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={isModalVisible} transparent={true}>
                <View style={styles.container}>
                    <View style={{ height: 200, width: '100%', textAlign: 'center' }}>
                        {data ?
                            (
                                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', textAlign: 'center', marginBottom: 150 }}>{data}</Text>
                                    <QRCode
                                        size={250}
                                        value={data}
                                    />
                                </View>)
                            :
                            (<Text>NO VALID DATA</Text>)
                        }
                    </View>
                    {data ?
                        (<View style={{ height: 60, borderRadius: 10, justifyContent: 'center', backgroundColor: '#23a672', width: '100%', textAlign: 'center' }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={goToResultPage}
                            >
                                <Text style={{ color: '#fff', textAlign: 'center' }} onPress={goToResultPage}>Successfully Scanned</Text>
                            </TouchableOpacity>
                        </View>) :
                        (<View style={{ height: 60, borderRadius: 10, justifyContent: 'center', backgroundColor: '#E94809', width: '100%', textAlign: 'center' }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={returnToScan}
                            >
                                <Text style={{ color: '#fff' }} onPress={returnToScan}>QR Code Not Recognized</Text>
                            </TouchableOpacity>
                        </View>)}
                </View>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        // padding: 60,
        backgroundColor: '#404040',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    button: {
        backgroundColor: '#23a672',
        borderRadius: 30,
        width: '100%'

    },
})

export default GeneralModal;