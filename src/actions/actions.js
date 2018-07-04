// src/redux/actions/actions.js
/** */
import axios from 'axios'
//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function getColumns () {
    return (dispatch) => {
        axios.get(`${url}columns`)
        .then((res) => {
            let columns = res.data
            dispatch({type:'LOAD_COLUMNS', columns})
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function getTasks (column_id) {
    return (dispatch) => {
	axios.get(`${url}tasks/{column_id}`).then((res) => {
	    let tasks = res.data
	    dispatch({type:'GET_TASKS', tasks})
	}).catch((err) => {
	    console.log(err)
	})
    }
}

export function getMessages () {
    return (dispatch) => {
	axios.get(`${url}chat`).then((res) => {
	    let messages = res.data
	    dispatch({type:'GET_MESSAGES', messages})
	}).catch((err) => {
	    console.log(err)
	})
    }
}

export function setTask (task_id, task) {
    return (dispatch) => {
	axios.put(`${url}tasks/{task_id}`).then((res) => {
	}).catch((err) => {
	    console.log(err)
	})
    }
}

export function setColumn (column_id, column) {
    return (dispatch) => {
	axios.put(`${url}columns/{column_id}`).then((res) => {
	}).catch((err) => {
	    console.log(err)
	})
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})        
    }    
}
