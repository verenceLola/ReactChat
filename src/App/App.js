import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createApp } from "frint";
import { observe } from "frint-react";
import BrowserRouterService from "frint-router/BrowserRouterService";
import { createStore } from "frint-store";
import Cookies from "js-cookie";
import React from "react";
import { of } from "rxjs/observable/of";
import { map, merge, scan } from "rxjs/operators";

import { toggleDarkTheme } from "../actions/Theme/theme";
import AppBar from "../components/AppBar/AppBar";
import Chat from "../components/Chat/Chat";
import rootReducer from "../reducers/index";
import { darkTheme, defaultTheme } from "../utils/theme";


const App = ({ theme: darkThemeActive, toggleDarkTheme }) => {
  const theme = React.useMemo(
    () => createMuiTheme(darkThemeActive ? darkTheme : defaultTheme),
    [darkThemeActive],
  );
  const loggedIn = Cookies.get("jwt-token");
  return (
    <ThemeProvider theme={theme}>
      <AppBar toggleDarkTheme={toggleDarkTheme} />
      {loggedIn ? <Chat /> : <></>}
    </ThemeProvider>
  );
};

const ObservableApp = observe(app => {
  const store = app.get("store");
  const state$ = store.getState$();
  const stateProps$ = state$.pipe(
    map(state => ({ theme: state.themeReducer.dark })),
  );
  const actionProps$ = of({
    toggleDarkTheme: (...args) => store.dispatch(toggleDarkTheme(...args)),
  });
  return stateProps$.pipe(
    merge(actionProps$),
    scan((props, emitted) => ({ ...props, ...emitted })),
  );
})(App);

export default createApp({
  name: "ReactApp",
  providers: [
    {
      name: "component",
      useValue: ObservableApp,
    },
    {
      name: "store",
      useFactory: app => {
        const Store = createStore({
          reducer: rootReducer,
          deps: app,
        });
        return new Store();
      },
      deps: ["app"],
    },
    {
      name: "router",
      useFactory: () => new BrowserRouterService(),
      cascade: true,
    },
  ],
});
