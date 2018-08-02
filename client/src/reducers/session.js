import {GET_USER, DROP_USER} from '../actions/types';

const INITIAL_STATE = null;

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      console.log(action)
      return action.payload;
    case DROP_USER:
      console.log(action)
      return action.payload;
    default: return state
  }
}

