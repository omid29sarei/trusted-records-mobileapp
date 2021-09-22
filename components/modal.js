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
    // const [verificationError, setVerificationError] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const returnToScan = () => {
        toggleModal()
        setSuccessScanned({
            is_scanned: false
        })
    }
    const goToResultPage = () => {
        toggleModal()
        navigation.navigate('Take Selfie Info', { originalData: data})
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