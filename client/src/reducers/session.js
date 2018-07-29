import {GET_USER} from '../actions/types';

const INITIAL_STATE = {
};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      console.log(action)
      return action.payload;
    default: return state
  }
}

