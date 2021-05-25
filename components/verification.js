import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Overlay from '../assets/selfie-overlay.png';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { verification } from '../redux/actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';

function Verification({ route, navigation }) {
    const { data, sortedData } = route.params;
    console.log(sortedData, 'data from verification')
    const [startCamera, setStartCamera] = React.useState(true)
    const [capturedImage, setCapturedImage] = React.useState(null)
    const [type, setType] = React.useState(Camera.Constants.Type.front);
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
        // console.log(photo?.uri)
        // setCapturedImage(photo?.uri)
        // console.log(photo, 'PHOTO OBJECT')
        navigation.navigate('QR Pass', { data: data, sortedData: sortedData })
        dispatch(verification(photo?.base64, sortedData?.vaccinationStatus))

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
    return (
        <View style={styles.container}>
            {capturedImage ?
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
                                style={{ zIndex: -1, height: 700, width: "100%" }}
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
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>Take Photo</Text>
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
        flexDirection: "column"
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