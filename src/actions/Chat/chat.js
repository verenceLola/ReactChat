import { FETCHING_CHAT, FETCHING_USER_CHAT_SUCCESS, FETCHING_CHAT_FAILED } from "./types"
import Axios from "axios-observable"
import Cookies from 'js-cookie'

const loading = value => ({
    type: FETCHING_CHAT,
    value,
})

const fetchingChatSuccess = chats => ({
    type: FETCHING_USER_CHAT_SUCCESS,
    chats,
})

const fetchingChatsFailed = (message, error) => ({
    type: FETCHING_CHAT_FAILED,
    message,
    error
})

export const fetchUseChats = () => dispatch => {
    dispatch(loading(true))
    Axios.get('http://localhost:8000/api/user/dm/messages', {
        headers: {
            'Authorization': Cookies.get('jwt-token')
        }
    })
    .subscribe(
        response => {
            const { data } = response
            dispatch(fetchingChatSuccess(data))
            dispatch(loading(false))
        },
        error => {
            const { response: { data }} = error
            console.log(data)
            dispatch(loading(false))
            dispatch(fetchingChatsFailed('Fetching Chats Failed', 'Error fetching Chats. Try Again Later'))
        }
    )
}