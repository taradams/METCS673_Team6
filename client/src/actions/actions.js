import { GET_USER } from './types';
import axios from 'axios';


export default function getUser(user) {  
    return dispatch => {
        dispatch(getUserAsync(user));
    }
}

function getUserAsync(user){  
  console.log(user)
  return {
    type: GET_USER,
    payload: user
  };
}
