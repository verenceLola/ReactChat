import Axios from "axios-observable";
import Cookies from "js-cookie";

import {
  FETCHING_PROFILE_DETAILS,
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
} from "./types";

const loading = value => ({
  type: FETCHING_PROFILE_DETAILS,
  value,
});

const fetchingProfileFailed = (message, error) => ({
  type: FETCH_PROFILE_FAILED,
  message,
  error,
});

const fetchingProfileSuccess = details => ({
  type: FETCH_PROFILE_SUCCESS,
  details,
});

const fetchProfile = username => dispatch => {
  dispatch(loading(true));
  return Axios.get(`http://localhost:8000/api/users/profile/${username}`, {
    headers: {
      Authorization: Cookies.get("jwt-token"),
    },
  }).subscribe(
    response => {
      const {
        data: { data },
      } = response;
      dispatch(loading(false));
      dispatch(fetchingProfileSuccess(data));
    },
    error => {
      const {
        response: { message, error: errorDescription },
      } = error;
      dispatch(fetchingProfileFailed(message, errorDescription));
      dispatch(loading(false));
    },
  );
};

export { fetchProfile };
