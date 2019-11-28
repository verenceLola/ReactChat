import { 
    ACTIVATE_DARK_THEME, 
    ACTIVATE_DEFAULT_THEME
} from "./types"

export const activateDarkTheme = () => ({
    type: ACTIVATE_DARK_THEME
})

export const activateDefaultTheme = () => ({
    type: ACTIVATE_DEFAULT_THEME
})
