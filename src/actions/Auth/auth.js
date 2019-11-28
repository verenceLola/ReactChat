import { LOGGED_IN, USER_DETAILS, LOGIN_FAILED } from "./types";
import Axios from "axios-observable";

export const logIn = value => ({
    type: LOGGED_IN,
    value,
})

export const userDetails = details => ({
    type: USER_DETAILS,
    value: details,
})

export const userLoginFailed = errors => ({
    type: LOGIN_FAILED,
    errors,
})

export const loginUser = () => (dispatch, getState, { app }) => {
    Axios.post('http://localhost:8000/api/auth/login',{email: 'verence', password: 'Platyrhynchos90'})
        .subscribe(
            response => {
                dispatch(userDetails(response.data))
            },
            error => {
                dispatch(userLoginFailed(error))
            }
        )
}