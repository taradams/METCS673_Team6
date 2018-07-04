import { combineReducers } from 'redux';
import columns from './columns';
import authUser from './authUser';
import common from './common';
import messages from './messages';
import column from './column';
import sessionReducer from './session.js';
import userReducer from './users.js';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    columns,
    authUser,
    common,
    column,
    messages,
    sessionState: sessionReducer,
    userState: userReducer,
});
