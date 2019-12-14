import { FETCHING_CHAT, FETCHING_USER_CHAT_SUCCESS, FETCHING_CHAT_FAILED, NEW_MESSAGE, SENDING_MSG, SEND_MESSAGE_SUCCESS, UPDATE_ACTIVE_CHAT } from "./types"
import Axios from "axios-observable"
import Cookies from 'js-cookie'
import { webSocket } from 'rxjs/observable/dom/webSocket';
import { skip } from 'rxjs/operators';

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

export const setActiveChat = value => ({
    type: UPDATE_ACTIVE_CHAT,
    value
})

const newMessage = message => ({
    type: NEW_MESSAGE,
    message,
})

const sendingMessage = status => ({
    type: SENDING_MSG,
    status
})

const messageSent = status => ({
    type: SEND_MESSAGE_SUCCESS,
    status
})


export const fetchUserChats = () => dispatch => {
    dispatch(loading(true))
    const dmObservable = Axios.get(`http://localhost:8000/api/user/dm/messages`, {
        headers: HEADERS
    })
    const groupObservable = Axios.get(`http://localhost:8000/api/user/group/messages`, {
        headers: HEADERS
    })
    dmObservable.merge(groupObservable)
    .map( (result) => result.data)
    .reduce((a, b) => [...a, ...b])
    .subscribe(
        data => {
            const MESSAGES = data.filter( chat => chat.messages.length !== 0)  // load chats with messages
            dispatch(fetchingChatSuccess(MESSAGES))
            dispatch(loading(false))
        },
        error => {
            console.error(error)
            dispatch(loading(false))
            dispatch(fetchingChatsFailed('Fetching Chats Failed', 'Error fetching Chats. Try Again Later'))
        }
    )
}
const BASE_URL = 'ws://localhost:8000/'
const HEADERS = {
    'Authorization': Cookies.get('jwt-token')
}

export const webSocketConnect = url => () => {
    const subject = new webSocket(BASE_URL + url + `?token=${Cookies.get('jwt-token')}`)
    return subject
}


export const webSocketDisconnect = subject => () => {
    subject.complete()
}

export const subscribeNewMessage = subject => dispatch => {
    subject.pipe(skip(1)).subscribe(
        msg => {
            dispatch(newMessage(msg.message))
        },
        err => console.log(err),
        () => console.log('complete')
      );
}

export const sendMessage = (subject, payload) => dispatch => {
    dispatch(sendingMessage(true))
    const message = JSON.stringify(payload)
    subject.next(message)
    dispatch(messageSent(true))
    // subject.error 
}

export const sendGroupMessage = (subject, payload) => dispatch => {
    dispatch(sendingMessage(true))
    const message = JSON.stringify(payload)
    subject.next(message)
    dispatch(messageSent(true))
}