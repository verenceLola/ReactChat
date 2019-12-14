import { ACTIVATE_DEFAULT_THEME, ACTIVATE_DARK_THEME } from "../actions/Theme/types";

const INITIAL_STATE = {
    dark: true
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIVATE_DEFAULT_THEME:
            return {...state, dark: false}
        case ACTIVATE_DARK_THEME:
            return {...state, dark: true}
        default:
            return state
    }
}