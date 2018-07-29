import { GET_USER } from './types';
import axios from 'axios';


export default function getUser() {  
  const res = axios.get('/api/user/')
  console.log(res)
      return dispatch => {
        dispatch(getUserAsync(res.data));
  }
}

function getUserAsync(user){  
  return {
    type: GET_USER,
    payload: user
  };
}
