import { FETCHING_CHAT, FETCHING_CHAT_FAILED, FETCHING_USER_CHAT_SUCCESS } from "../actions/Chat/types";

const INITIAL_STATE = {
    loading: false,
    fetchFailed: false,
    chats: []
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_CHAT:
            return {...state, loading: action.value}
        case FETCHING_CHAT_FAILED:
            return {...state, fetchFailed: action.value}
        case FETCHING_USER_CHAT_SUCCESS:
            return {...state, chats: action.chats}
        default:
            return state
    }
}