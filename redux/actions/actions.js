import { RESET_STORE, VERIFICATION, VERIFICATION_FAILED } from './actionTypes';
import axios from "axios";
const mime = require('mime');


const BACKEND_URL = 'https://trustedrecords-hague.uk.truststamp.net'

export const resetStore = ()=>dispatch=>{
  return dispatch({
    type:RESET_STORE,
    payload: {}
  })
}

export const verification = (imageURI,it2) => dispatch => {

    var formData = new FormData();
    formData.append("image", {
      uri:imageURI,
      type:mime.getType(imageURI),
      name: imageURI.split('/').pop(),});
    formData.append("it2",it2)
    let axiosConfig = {
        headers: {
            'Content-type': 'multipart/form-data'
          },
    }
    console.log(formData,'form data checking on aciton')
    axios.post(`${BACKEND_URL}/it2photomatch/match_photo/`, formData, axiosConfig)
        .then(response => {
            console.log(response.data, 'CHECKING THE RESPONSE')
            return dispatch({
                type: VERIFICATION,
                payload: response.data
            })
        })
        .catch(error => { 
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
                payload: error
            })
        })
}

