import { VERIFICATION, VERIFICATION_FAILED } from './actionTypes';
import axios from "axios";
import mime from "mime";
import testPic from '../../assets/BG.png';

// const axios = require('axios');
// axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const BACKEND_URL = 'http://trustedrec.crabdance.com'

export const verification = (imageUri, testData) => dispatch => {

    let axiosConfig = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/json',
            // Accept: "application/x-www-form-urlencoded",
        }
    }
    // const base64ToBlob = async (encoded) => {
    //     let url = `data:image/jpg;base64,${encoded}`;
    //     let res = await fetch(url);
    //     let blob = await res?.blob();
    //     return blob;
    // }
    // let blob = base64ToBlob(imageUri);


    // var formData = new FormData();
    // formData.append("image", blob);
    // console.log(testData, 'datadatadatadatadatadata')
    const data = {
        "enc_dek": testData,
        "image": imageUri
    }

    // const newImageUri = "file:///" + imageUri.split("file:/").join("");
    // const formData = new FormData();
    // // console.log(mime.getType(newImageUri), 'CHECKING THE MIME')
    // formData.append('image', {
    //     uri: newImageUri,
    //     type: mime.getType(newImageUri),
    //     name: imageUri.split("/").pop()
    // });

    // console.log(imageUri, 'checking the imageUri')
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
            // return dispatch({
            //     type: VERIFICATION_FAILED,
            //     payload: response.data
            // })
        })
}