import { combineReducers } from "frint-store";

import ThemeReducer from "./theme";
import AuthReducer from "./auth";
import ChatReducer from "./chat";
import ProfileReducer from "./profile";

export default combineReducers({
  themeReducer: ThemeReducer,
  authReducer: AuthReducer,
  chat: ChatReducer,
  profile: ProfileReducer,
});
