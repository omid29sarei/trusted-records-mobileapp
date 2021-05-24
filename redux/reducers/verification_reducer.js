import { VERIFICATION } from '../actions/actionTypes';

const initialState = {
    verificationResponse: {}
}
const verification_reducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFICATION:
            return { ...state, verificationResponse: action.payload }
        default:
            break;
    }
    return state
}
export default verification_reducer