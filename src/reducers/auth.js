import { LOGGED_IN, USER_DETAILS, LOGIN_FAILED, LOGIN_SUCCESS, FETCH_USER_DETAILS_FAILED, LOADING, SIGNUP_SUCCESS, SIGNUP_FAILED, PASSWORD_RESET_FAILED, PASSWORD_RESET_SUCCESS } from "../actions/Auth/types";

const INITIAL_STATE = {
    loggedIn: false,
    details: {},
    errors: {
        login: {},
        signup: {},
        reset: {}
    },
    loginMessage: '',
    loading: false,
    signedUp: false,
    message: {
        login: '',
        signup: '',
        reset: ''
    },
    passwordReset: false,
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {...state, loggedIn: action.value}
        case USER_DETAILS:
            return {...state, details: action.value}
        case LOGIN_FAILED:
            return {...state, errors: {...state.errors, login: action.errors}, message: {...state.message, login: action.message}}
        case LOGIN_SUCCESS:
            return {...state, loginMessage: action.message}
        case FETCH_USER_DETAILS_FAILED:
            return {...state, fetchUserDetails: action.message}
        case LOADING:
            return {...state, loading: action.value}
        case SIGNUP_SUCCESS:
            return {...state, signedUp: action.value}
        case SIGNUP_FAILED:
            return {...state, errors: {...state.errors, signup: action.errors}, message: {...state.message, signup: action.message}}
        case PASSWORD_RESET_FAILED:
            return {...state, errors: {...state.errors, reset: {...state.errors.reset, error: action.error}}, message: {...state.message, reset: action.message}}
        case PASSWORD_RESET_SUCCESS:
            return {...state, passwordReset: action.value}
        default:
            return state
    }
}