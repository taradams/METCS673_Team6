const inititalState = {
    taskId: {},
    description: {},
    columnId: {},
    taskType: {},
    details: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_TASKID':
	    return {
		...state,
		taskId: action.taskId
	    }
	case 'SET_DESCRIPTION':
	    return {
		...state,
		description: action.description
	    }
	case 'SET_COLUMNID':
	    return {
		...state,
		columnId: action.columnId
	    }
	case 'SET_TASKTYPE':
	    return {
		...state,
		taskType: action.taskType
	    }
	case 'SET_DETAILS':
	    return {
		...state,
		details: action.details
	    }
	default:
	    return state;
	}
    }
}
