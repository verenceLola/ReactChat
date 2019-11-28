import { LOGGED_IN, USER_DETAILS, LOGIN_FAILED } from "../actions/Auth/types";

const INITIAL_STATE = {
    loggedIn: true,
    details: {},
    errors: {}
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {...state, loggedIn: action.value}
        case USER_DETAILS:
            return {...state, details: action.value}
        case LOGIN_FAILED:
            return {...state, errors: action.value}
        default:
            return state
    }
}