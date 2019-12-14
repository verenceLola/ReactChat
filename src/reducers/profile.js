import { FETCHING_PROFILE_DETAILS, FETCH_PROFILE_FAILED, FETCH_PROFILE_SUCCESS } from "../actions/Profile/types";

const INITIAL_STATE = {
    loading: false,
    details: {},
    fetchingProfileFailed: {},
    profileFetched: false,
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_PROFILE_DETAILS:
            return {...state, loading: action.value}
        case FETCH_PROFILE_FAILED:
            return {...state, fetchingProfileFailed: {...state.fetchingProfileFailed, message: action.message, error: action.error}}
        case FETCH_PROFILE_SUCCESS:
            return {...state, details: action.details, profileFetched: true}    
        default:
            return state
    }
}