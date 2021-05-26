import { VERIFICATION, VERIFICATION_FAILED } from '../actions/actionTypes';

const initialState = {
    verificationResponse: {},
    verificationFailedResponse: {}
}
const verification_reducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFICATION:
            return { ...state, verificationResponse: action.payload }
        // case VERIFICATION_FAILED:
        //     return { ...state, verificationFailedResponse: action.payload }
        default:
            break;
    }
    return state
}
export default verification_reducer