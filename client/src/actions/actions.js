import { GET_USER, DROP_USER } from './types';

export function getUser(user) {  
    return dispatch => {
        dispatch(getUserAsync(user));
    }
}

export function dropUser() {
    return dispatch => {
        dispatch(dropUserAsync());
    }
}

function getUserAsync(user){  
  console.log(user)
  return {
    type: GET_USER,
    payload: user
  };
}
function dropUserAsync(){
  return {
    type: DROP_USER,
    payload: null
  };
}
