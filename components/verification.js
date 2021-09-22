import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Overlay from '../assets/selfie-overlay.png';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { verification } from '../redux/actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
// import * as ec from 'react-native-ecc'
// import { Buffer } from 'buffer'

function Verification({ route, navigation }) {
    const finderWidth = 280;
    const finderHeight = 230;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const viewMinX = (width - finderWidth) / 2;
    const viewMinY = (height - finderHeight) / 2;
    const { originalData } = route.params;
    console.log(originalData,"originalData")
    // console.log(sortedData, 'data from verification')
    const [startCamera, setStartCamera] = React.useState(true);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.front);
    const isVerificationSuccessfull = false
    // useSelector(state => state.main?.verificationResponse?.success)
    console.log(isVerificationSuccessfull, 'isVerificationSuccessfullisVerificationSuccessfull')
    const dekKey = useSelector(state => state.main?.verificationResponse?.dek_key)
    // const failedVerification = useSelector(state => state.main?.verificationFailedResponse)


    let cameraText = "Take Photo";
    const dispatch = useDispatch();
    const goToVerification = () => {
        navigation.navigate('Verification')
    }
    let camera
    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync({
            base64: true
        })
        // dispatch(verification(photo?.base64, originalData))
        setCapturedImage(photo?.base64)

    }
    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            if (status === 'granted') {
                setStartCamera(true)
            } else {
                Alert.alert("Access denied")
            } Camera
        })();
    }, []);
    React.useEffect(() => {

        if (isVerificationSuccessfull == false) {
            navigation.navigate('Result Screen',{isVerificationSuccessfull})
        }
        if (isVerificationSuccessfull){
            navigation.navigate('Result Screen',{isVerificationSuccessfull})
        }
    }, [isVerificationSuccessfull, cameraText])
    return (
        <View style={styles.container}>
            {isVerificationSuccessfull ?
                (
                    <Spinner
                        visible={capturedImage ? true : false}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                ) :
                (
                    <ImageBackground style={{
                        width: "100%",
                        height: 120,
                        backgroundColor: '#000',
                        padding: 20,
                        paddingVertical: 40,
                        position: 'absolute',
                        bottom: 0
                    }} resizeMethod={'auto'} source={Overlay} style={styles.image}>
                        {startCamera ? (
                            <Camera
                                style={{ zIndex: -1, height: '100%', width: "100%" }}
                                ref={(r) => {
                                    camera = r
                                }}
                                type={type}
                            >
                            </Camera>
                        ) : Alert.alert("Access denied")}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={__takePicture}
                        >
                            {isVerificationSuccessfull == false ? <Text>The verification failed. Please Take another photo</Text> : null}
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>{cameraText}</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    button: {
        backgroundColor: '#00caf2',
        borderRadius: 30,
        width: '100%',
        position: 'absolute',
        bottom: 110,
        justifyContent: "center",
        alignItems: 'center'
    },
})

export default Verification;