const initialState = {
    messageId: {},
    author: {},
    createdDate: {},
    content: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
	case 'SET_MESSAGEID':
	    return {
		...state,
		messageId: action.messageId
	    }
	case 'SET_AUTHOR':
	    return {
		...state,
		author: action.author
	    }
	case 'SET_CREATEDDATE':
	    return {
		...state,
		createdDate: action.createdDate
	    }
	case 'SET_CONTENT':
	    return {
		...state,
		content: action.content
	    }
	default:
	    return state;
    }
}	
