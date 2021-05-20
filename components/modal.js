import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment_counter,
    decrement_counter
} from '../redux/actions/counter_actions';

function GeneralModal({ data, successScanned, setSuccessScanned }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const returnToScan = () => {
        toggleModal()
        // setSuccessScanned({
        //     is_scanned: false
        // })
    }
    React.useEffect(() => {
        if (successScanned?.is_scanned) {
            toggleModal()
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={isModalVisible} transparent={true}>
                <View style={{ flex: 1, padding: 60 }}>
                    {data ?
                        (<Text>{data}</Text>) :
                        (<Text>NO VALID DATA</Text>)
                    }
                    <Button
                        title="increase"
                        onPress={() => dispatch(increment_counter())}
                    />
                    <Text>{counter}</Text>
                    <Button
                        title="decrease"
                        onPress={() => dispatch(decrement_counter())}
                    />
                    <Button title="Continue" onPress={returnToScan} />
                </View>
            </Modal>
        </View>
    );
}

export default GeneralModal;