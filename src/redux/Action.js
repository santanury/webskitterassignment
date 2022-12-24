import {USER_CREDENTIAL} from './Constant';
export const setUserCredential = userId => {
  return {
    type: USER_CREDENTIAL,
    payload: userId,
  };
};
