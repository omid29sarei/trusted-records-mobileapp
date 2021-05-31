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