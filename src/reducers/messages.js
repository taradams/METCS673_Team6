const initialState = {
    messages: []
}

export default (state = initialState, action) => {
    switch(action.type) {
	case 'GET_MESSAGES':
	    return {
		...state,
		messages: action.messages
	    }
	default:
	    return state;
    }
}

