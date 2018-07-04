const initialState = {
    username: {},
    isAuth: false,
    first_name: {},
    last_name: {},
    email: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            }
        case 'SET_ACCOUNT':
	    return {
	        ...state,
	        account: action.account
	    }
        case 'SET_FIRSTNAME':
	    return {
		...state,
		firstName: action.firstName
	    }
	case 'SET_LASTNAME':
	    return {
		...state,
		lastName: action.lastName
	    }
	case 'SET_EMAIL':
	    return {
		...state,
		email: action.email
	    }
        default:
            return state;
    }
}
