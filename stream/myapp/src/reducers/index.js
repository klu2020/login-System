import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import streamInfo from './stream';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    stream: streamInfo
});