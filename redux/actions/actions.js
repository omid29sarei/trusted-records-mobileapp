import { VERIFICATION, VERIFICATION_FAILED } from './actionTypes';
import axios from "axios";


const BACKEND_URL = 'http://trustedrec.crabdance.com'

export const verification = (imageUri,it2) => dispatch => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const data = {
        "image": imageUri,
        "it2":it2
    }
    console.log(data,"VerificationData")
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
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                // console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }

            return dispatch({
                type: VERIFICATION_FAILED,
                payload: error.data
            })
        })
}

