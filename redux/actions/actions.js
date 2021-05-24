import { VERIFICATION } from './actionTypes';
import axios from "axios";
import mime from "mime";
// const axios = require('axios');
// axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const BACKEND_URL = 'http://127.0.0.1:8000'

export const verification = (imageUri) => dispatch => {
    // const URL = "http://127.0.0.1:8000/api/enroll/"
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', URL); // the address really doesnt matter the error occures before the network request is even made.
    // const data = new FormData();
    // data.append('image', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });

    // xhr.send(data);
    // xhr.onreadystatechange = e => {
    //     if (xhr.readyState !== 4) {
    //         return;
    //     }

    //     if (xhr.status === 200) {
    //         console.log('success', xhr.responseText);
    //     } else {
    //         console.log('error', xhr.responseText);
    //     }
    // };
    // console.log(imageUri, 'checking the imageUri')


    let axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
    const newImageUri = "file:///" + imageUri.split("file:/").join("");
    const formData = new FormData();
    formData.append('image', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
    });
    console.log(imageUri, 'checking the imageUri')
    axios.post('http://127.0.0.1:8000/api/enroll/', formData, axiosConfig)
        .then(response => {
            console.log(response.data, 'CHECKING THE RESPONSE')
            return dispatch({
                type: VERIFICATION,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}