import verification_reducer from './verification_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    main: verification_reducer
})

export default rootReducer