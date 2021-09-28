import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import FullStatusImg from '../assets/full-vaccinated-logo.png';
import Avatar from '../assets/avatar.png';
import PassImage from '../assets/pass.png';
import FailImage from '../assets/fail.png';
import QRCode from 'react-native-qrcode-svg';
import { useSelector,useDispatch } from 'react-redux';
import { resetStore } from '../redux/actions/actions';

function ResultScreen({ route, navigation }) {
    const { isVerificationSuccessfull,verificationFailedResponse,isVerificationSuccessfull_api_response } = route.params;
    const isVerificationSuccessfullMessage = useSelector(state => state.main?.verificationResponse?.message)
    console.log(verificationFailedResponse,'verificationFailedResponse from result')
    console.log(isVerificationSuccessfull,'isVerificationSuccessfull from result')
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <ScrollView>
            { !isVerificationSuccessfull ? 
                (<View>
                    <Text style={{ color:"red",paddingTop: 50, paddingLeft: 50, paddingRight: 50, paddingBottom: 50,textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{isVerificationSuccessfull_api_response}</Text>
                </View>):null
            }
            {verificationFailedResponse?.message?
                (<View>
                    <Text style={{ paddingTop: 50, paddingLeft: 50, paddingRight: 50, paddingBottom: 50, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>{verificationFailedResponse?.message}</Text>
                </View>):null
            }
                
                
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ paddingTop:30}}>
                        <Image style={{ width: 300, height: 300, resizeMode: 'cover', borderRadius: 20 }} source={isVerificationSuccessfull? PassImage:FailImage} />
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, marginBottom: 15, fontSize: 25 }}>Identity {isVerificationSuccessfull? "Match":"Not Match"}</Text>
                    <Text style={{ color: 'black', marginBottom: 45, textAlign: 'center', paddingLeft: 50, paddingRight: 50 }}>{isVerificationSuccessfullMessage}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            if(isVerificationSuccessfull_api_response){
                                navigation.navigate("Verification")
                            }
                            // navigation.popToTop()
                            navigation.reset({
                            index: 0,
                            routes: [{ name: 'QR Reader' }],
                              })
                            dispatch(resetStore())
                            
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, padding: 15, textAlign: 'center' }}>{isVerificationSuccessfull_api_response? "Take Selfie":"Scan New Ticket"}</Text>
                    </TouchableOpacity>
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

export default ResultScreen;