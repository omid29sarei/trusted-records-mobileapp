import { VERIFICATION, VERIFICATION_FAILED,RESET_STORE } from '../actions/actionTypes';

const initialState = {
    verificationResponse: {},
    verificationFailedResponse: null
}
const verification_reducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFICATION:
            return { ...state, verificationResponse: action.payload, verificationFailedResponse: null }
        case VERIFICATION_FAILED:
            return { ...state, verificationFailedResponse: action.payload }
        case RESET_STORE:
            return initialState
        default:
            break;
    }
    return state
}
export default verification_reducer