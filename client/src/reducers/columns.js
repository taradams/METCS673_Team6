const initialState = {
    columns: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_COLUMNS':
        return {
            ...state,
            columns: action.columns
        }
        default:
        return state
    }
}