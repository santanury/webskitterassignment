import {combineReducers} from 'redux';
import UserCredentialReducer from './reducers/UserCredentialReducer';

import {configureStore} from '@reduxjs/toolkit';

const reducer = {
  userData: UserCredentialReducer,
};

export default configureStore({
  reducer,
});
