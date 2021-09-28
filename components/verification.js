import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Overlay from '../assets/selfie-overlay.png';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { verification } from '../redux/actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform} from 'react-native';
import * as FaceDetector from 'expo-face-detector';


function Verification({ route, navigation }) {
    const finderWidth = 280;
    const finderHeight = 230;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const screenRatio = height / width;
    const viewMinX = (width - finderWidth) / 2;
    const viewMinY = (height - finderHeight) / 2;
    const { originalData,mockIT2 } = route.params;
    const [startCamera, setStartCamera] = React.useState(true);
    const [imagePadding, setImagePadding] = React.useState(0)
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [ratio, setRatio] = React.useState('4:3');
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [androidRatio,setAndroidRatio] = React.useState(null)
    const [faceDetected,setFaceDetected] = React.useState(null)
    const [isDistancedFace,setSsDistancedFace] = React.useState(null)
    
    const [photosubmitted, SetPhotosubmitted] = React.useState(null);
    const isVerificationSuccessfull = useSelector(state => state.main?.verificationResponse?.success)
    const isVerificationSuccessfull_api_response = useSelector(state => state.main?.verificationResponse?.message)
    const verificationFailedResponse = useSelector(state => state.main?.verificationFailedResponse)

    let cameraText = "Take Photo";
    const dispatch = useDispatch();

    let camera
    const handleFacesDetected = async(e)=>{
        let condition = e.faces.length > 0 && e.faces[0]?.bounds?.size?.height > 200
        let DistancedFace = e.faces[0]?.bounds?.size?.height < 200
        if(e.faces.length == 0 ){
            setFaceDetected(false)
        }
        else{
            setFaceDetected(true)
            if(DistancedFace){
                setSsDistancedFace(true)
            }
            else{
                setSsDistancedFace(false)
                if(condition && !isVerificationSuccessfull || verificationFailedResponse){
                    // setTimeout(async()=>{
                    // },3000)
                    // if(faceDetected && !isDistancedFace)
                    const photo = await camera.takePictureAsync()
                    let resizedPhoto = await ImageManipulator.manipulateAsync(
                        photo.uri,
                        [{ resize: { width: 350 } }],
                        { compress: 1, format: "png", base64: false }
                    );
                    await dispatch(verification(resizedPhoto?.uri, originalData))
                    setCapturedImage(photo)
                    SetPhotosubmitted(true)
                }
            }
        }
    }
    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            if (Platform.OS === 'android'){
                const ratios = await camera.getSupportedRatiosAsync();
                console.log(ratios,'ratios')
                // const wantedRatio = height/width
                // var bestRatio = 0;
                // var bestRatioError = 100000;let desiredRatio = '4:3'
                let desiredRatio = '4:3'
                let distances = {}
                let realRatios = {}
                let minDistance = null
                for (let i in ratios) {
                    const parts = i.split(':')
                    const ratioHeight = parseInt(parts[0])
                    const ratioWidth = parseInt(parts[1])
                    const realRatio = ratioHeight / ratioWidth
                    realRatios[i] = realRatio
                    // i can't be taller than screen, so we don't want an abs()
                    const distance = screenRatio - realRatio
                    distances[i] = realRatio
                    if (minDistance == null) {
                        minDistance = i
                    } else {
                        if (distance >= 0 && distance < distances[minDistance]) {
                            minDistance = i
                        }
                    }
                }
                desiredRatio = minDistance
                console.log(minDistance,"minDistance")
                const remainder = Math.floor(
                    (height - realRatios[desiredRatio] * width) / 2
                )
                // set the preview padding and preview ratio
                setImagePadding(remainder / 2)
                console.log(`okay look ${remainder / 2}`)
                setAndroidRatio(desiredRatio)
                // Set a flag so we don't do this
                // calculation each time the screen refreshes
    
            }
            if (status === 'granted') {
                setStartCamera(true)
            } else {
                Alert.alert("Access denied")
            } Camera
        })();    
    }, []);
    console.log(androidRatio,'"androidRatio')
    React.useEffect(() => {

        if (isVerificationSuccessfull == false) {
            navigation.navigate('Result Screen',{isVerificationSuccessfull,verificationFailedResponse,isVerificationSuccessfull_api_response})
            SetPhotosubmitted(null)
        }
        if (isVerificationSuccessfull){
            navigation.navigate('Result Screen',{isVerificationSuccessfull})
            SetPhotosubmitted(null)
        }
    }, [isVerificationSuccessfull,verificationFailedResponse, cameraText,photosubmitted])
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
                                style={{ zIndex: -1, flex: 1 }}
                                ref={(r) => {
                                    camera = r
                                }}
                                onFacesDetected={handleFacesDetected}
                                faceDetectorSettings={{
                                    mode: FaceDetector.Constants.Mode.fast,
                                    detectLandmarks: FaceDetector.Constants.Landmarks.none,
                                    runClassifications: FaceDetector.Constants.Classifications.none,
                                    // minDetectionInterval: 1000,
                                  }}
                                ratio={Platform.OS == "android" ? androidRatio:ratio}
                                type={type}
                                autoFocus="on"
                            >
                            </Camera>
                        ) : Alert.alert("Access denied")}
                        <View style={{position:'absolute',bottom:120,justifyContent:'center',textAlign:'center',width:"100%",alignItems:'center'}}>
                        {
                            !faceDetected ? <Text style={styles.warningText}>{"No Face Detected"}</Text>:null
                        }
                        {isDistancedFace?
                            <Text style={styles.warningText}>{"Please Move Closer"}</Text>:null
                        }
                        {faceDetected && !isDistancedFace? <Text style={styles.successText}>{"Ready To Go"}</Text>:null}
                        </View>
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
    warningText: {
        color: '#f0ad4e',
        width: '100%',
        fontSize:24,
        fontWeight: "bold",
        textAlign:'center',
    },
    successText:{
        color: '#5cb85c',
        width: '100%',
        fontSize:24,
        fontWeight: "bold",
        textAlign:'center',
    }
})

export default Verification;


// <TouchableOpacity
//     style={styles.button}
//     onPress={__takePicture}
// >
//     {isVerificationSuccessfull == false ? <Text>The verification failed. Please Take another photo</Text> : null}
//     <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>{cameraText}</Text>
// </TouchableOpacity>