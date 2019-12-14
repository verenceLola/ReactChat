import { TOGGLE_DARK_THEME } from "../actions/Theme/types";

const INITIAL_STATE = {
  dark: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DARK_THEME:
      return { ...state, dark: !state.dark };
    default:
      return state;
  }
};
