import {USER_CREDENTIAL} from '../Constant';

const initialState = {userId: 0};
const countReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_CREDENTIAL:
      return {
        userId: payload,
      };
    default:
      return state;
  }
};
export default countReducer;
