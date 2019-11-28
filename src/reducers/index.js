import { combineReducers } from 'frint-store';
import ThemeReducer from './theme'
import AuthReducer from './auth'

export default combineReducers({
  themeReducer: ThemeReducer,
  authReducer: AuthReducer,
});