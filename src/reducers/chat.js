import { from } from "rxjs/observable/from";

import {
  FETCHING_CHAT,
  FETCHING_CHAT_FAILED,
  FETCHING_USER_CHAT_SUCCESS,
  NEW_MESSAGE,
  UPDATE_ACTIVE_CHAT,
} from "../actions/Chat/types";

const INITIAL_STATE = {
  loading: false,
  fetchFailed: false,
  chats: [],
  activeChat: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_CHAT:
      return { ...state, loading: action.value };
    case FETCHING_CHAT_FAILED:
      return { ...state, fetchFailed: action.value };
    case FETCHING_USER_CHAT_SUCCESS:
      return {
        ...state,
        chats: [...state.chats, ...action.chats],
        activeChat: action.chats[0],
      };
    case NEW_MESSAGE:
      const { chatId } = action.message;
      from(state.chats)
        .find(chat => chat.id === chatId)
        .subscribe(chat => chat.messages.push(action.message));
      return { ...state, chats: [...state.chats] };
    case UPDATE_ACTIVE_CHAT:
      return { ...state, activeChat: action.value };
    default:
      return state;
  }
};
