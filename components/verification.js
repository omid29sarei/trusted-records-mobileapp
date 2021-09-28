import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Overlay from '../assets/selfie-overlay.png';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { verification } from '../redux/actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform} from 'react-native'

function Verification({ route, navigation }) {
    const finderWidth = 280;
    const finderHeight = 230;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const viewMinX = (width - finderWidth) / 2;
    const viewMinY = (height - finderHeight) / 2;
    const { originalData,mockIT2 } = route.params;
    const [startCamera, setStartCamera] = React.useState(true);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [ratio, setRatio] = React.useState('4:3');
    const [type, setType] = React.useState(Camera.Constants.Type.front);
    const [androidRatio,setAndroidRatio] = React.useState(null)
    const [photosubmitted, SetPhotosubmitted] = React.useState(null);
    const isVerificationSuccessfull = useSelector(state => state.main?.verificationResponse?.success)
    const isVerificationSuccessfull_api_response = useSelector(state => state.main?.verificationResponse?.message)
    const verificationFailedResponse = useSelector(state => state.main?.verificationFailedResponse)

    let cameraText = "Take Photo";
    const dispatch = useDispatch();

    let camera
    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        let resizedPhoto = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ resize: { width: 350 } }],
            { compress: 1, format: "png", base64: false }
        );
        dispatch(verification(resizedPhoto?.uri, originalData))
        setCapturedImage(photo)
        SetPhotosubmitted(true)

    }
    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            if (Platform.OS === 'android'){
                const ratios = await camera.getSupportedRatiosAsync();
                console.log(ratios,'ratios')
                const wantedRatio = height/width
                var bestRatio = 0;
                var bestRatioError = 100000;
                for (let i in ratios) {
                    console.log(i,'CHECKING ALL THE RATIOS')
                    const r = ratios[i].split(":")
                    caculatedRatio =  parseInt(r[0])/parseInt(r[1])
                    if (Math.abs(wantedRatio - caculatedRatio) < bestRatioError) {
                        bestRatioError = Math.abs(wantedRatio - caculatedRatio)
                        bestRatio = ratios[i]
                    }
                }
                console.log(bestRatio,"bestRatio")
                setAndroidRatio({bestRatio})
    
            }
            if (status === 'granted') {
                setStartCamera(true)
            } else {
                Alert.alert("Access denied")
            } Camera
        })();    
    }, []);
    React.useEffect(() => {

        if (isVerificationSuccessfull == false) {
            navigation.navigate('Result Screen',{isVerificationSuccessfull,verificationFailedResponse,isVerificationSuccessfull_api_response})
            SetPhotosubmitted(null)
        }
        if (isVerificationSuccessfull){
            navigation.navigate('Result Screen',{isVerificationSuccessfull})
            SetPhotosubmitted(null)
        }
    }, [isVerificationSuccessfull,verificationFailedResponse, cameraText])
    return (
        <View style={styles.container}>
            {photosubmitted ?
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
                                ratio={Platform.OS == "android" ? "16:9":ratio}
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