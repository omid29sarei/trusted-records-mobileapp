import { VERIFICATION, VERIFICATION_FAILED } from './actionTypes';
import axios from "axios";


const BACKEND_URL = 'http://trustedrec.crabdance.com'

export const verification = (imageUri, testData, encData, iv) => dispatch => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const data = {
        "image": imageUri,
        "enc_dek": testData,
        "enc_qr": encData,
        "iv": iv
    }
    axios.post(`${BACKEND_URL}/in/decode/`, data, axiosConfig)
        .then(response => {
            console.log(response.data, 'CHECKING THE RESPONSE')
            return dispatch({
                type: VERIFICATION,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
            return dispatch({
                type: VERIFICATION_FAILED,
                payload: error.data
            })
        })
}

// export const signatureVerification = ()=>dispatch=>{
//     const SIGN_VERIFICATION_KEY='-----BEGIN PUBLIC KEY-----
//     MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEOqt1Bl1y3zpRlQN92Kx1CC1Qus0Q
//     jwk3Dod3X8pmI27Ei53wbUles04T1/EtUj+WZ3b/Lc7Aiu4JewB0TT1NOw==
//     -----END PUBLIC KEY-----'
//     return dispatch({
//         type: SIGNATURE_VERIFICATION,
//         payload: SIGN_VERIFICATION_KEY
//     })
// }