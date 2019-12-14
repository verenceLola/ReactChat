import Axios from "axios-observable";
import Cookies from "js-cookie";

import {
  FETCH_USER_DETAILS_FAILED,
  LOADING,
  LOGGED_IN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  USER_DETAILS,
} from "./types";

const logIn = value => ({
  type: LOGGED_IN,
  value,
});

const loginSuccess = message => ({
  type: LOGIN_SUCCESS,
  message,
});

const userDetails = details => ({
  type: USER_DETAILS,
  value: details,
});

const fetchUserDetailsFailed = error => ({
  type: FETCH_USER_DETAILS_FAILED,
  message: error,
});

const userLoginFailed = (message, errors) => ({
  type: LOGIN_FAILED,
  message,
  errors,
});

const loading = value => ({
  type: LOADING,
  value,
});

const signUpSuccess = value => ({
  type: SIGNUP_SUCCESS,
  value,
});

const signUpFailed = (message, errors) => ({
  type: SIGNUP_FAILED,
  message,
  errors,
});

const passwordResetSuccess = value => ({
  type: PASSWORD_RESET_SUCCESS,
  value,
});

const passwordResetFailed = (message, error) => ({
  type: PASSWORD_RESET_FAILED,
  message,
  error,
});

const logoutUser = () => dispatch => {
  dispatch(loading(true));
  Cookies.remove("jwt-token");
  dispatch(logIn(false));
  dispatch(loading(false));
};

const loginUser = ({
  email: { value: email },
  password: { value: password },
}) => dispatch => {
  dispatch(loading(true));
  Axios.post("http://localhost:8000/api/auth/login", { email, password })
    .delay(30)
    .subscribe(
      response => {
        const {
          data: {
            message,
            meta: { token },
          },
        } = response;
        dispatch(loginSuccess(message));
        Cookies.set("jwt-token", `Bearer ${token}`); // save jwt token
      },
      error => {
        const {
          response: {
            data: { message, errors },
          },
        } = error;
        dispatch(userLoginFailed(message, errors));
        dispatch(loading(false));
      },
      () => {
        Axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: Cookies.get("jwt-token"),
          },
        }).subscribe(
          response => {
            dispatch(userDetails(response.data));
            dispatch(logIn(true));
            dispatch(loading(false));
          },
          error => {
            dispatch(fetchUserDetailsFailed(error.response.data));
            dispatch(loading(false));
          },
        );
      },
    ); // login user and fetch details
};

const signUpUser = ({
  email: { value: email },
  password: { value: password },
  username: { value: username },
}) => dispatch => {
  dispatch(loading(true));
  Axios.post("http://localhost:8000/api/auth/register", {
    email,
    password,
    username,
  })
    .delay(30)
    .subscribe(
      () => {
        dispatch(signUpSuccess(true));
        dispatch(loading(false));
      },
      error => {
        const {
          response: {
            data: { message, errors },
          },
        } = error;
        dispatch(signUpFailed(message, errors));
        dispatch(loading(false));
      },
    ); // signup user
};

const resetPassword = ({
  email: { value: email },
  password: { value: password },
}) => dispatch => {
  dispatch(loading(true));
  Axios.post("http://localhost:8000/api/users/forgot_password", {
    email,
    password,
  })
    .delay(30)
    .subscribe(
      () => {
        dispatch(passwordResetSuccess(true));
        dispatch(loading(false));
      },
      error => {
        const {
          response: {
            data: { message, error: errorMsg },
          },
        } = error;
        dispatch(passwordResetFailed(message, errorMsg));
        dispatch(loading(false));
      },
    );
};

export {
  logoutUser,
  resetPassword,
  signUpUser,
  loginUser,
  signUpFailed,
  logIn,
  loginSuccess,
};
