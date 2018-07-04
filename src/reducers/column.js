const initialState = {
    tasks: [],
    columnId: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
	case 'GET_TASKS':
	    return {
		...state,
		tasks: action.tasks
	    }
	case 'GET_COLUMNID':
	    return {
		...state,
		columnId: action.columnId
	    }
	default:
	    return state;
    }
}
