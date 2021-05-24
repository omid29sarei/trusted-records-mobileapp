import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';


function GeneralModal({ navigation, data, successScanned, setSuccessScanned }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const counter = useSelector(state => state.counter);
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
        navigation.navigate('QR Scan Result', { data: data })
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

                    {/* <Button
                        title="increase"
                        onPress={() => dispatch(increment_counter())}
                    />
                    <Text>{counter}</Text>
                    <Button
                        title="decrease"
                        onPress={() => dispatch(decrement_counter())}
                    /> */}
                    {/* <Button title="Continue" onPress={returnToScan} /> */}
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