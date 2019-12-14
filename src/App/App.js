import React from 'react'
import { createApp } from "frint";
import { createMuiTheme } from "@material-ui/core";
import AppBar from '../components/AppBar/AppBar'
import { createStore } from "frint-store";
import rootReducer from '../reducers/index'
import BrowserRouterService from 'frint-router/BrowserRouterService';
import { ThemeProvider } from '@material-ui/styles';
import { observe } from 'frint-react';
import { of } from 'rxjs/observable/of';
import { map, merge } from 'rxjs/operators';
import { activateDarkTheme, activateDefaultTheme } from "../actions/Theme/theme";
import { scan } from 'rxjs/operators';
import Chat from "../components/Chat/Chat";

const App = (props) => {
    const {theme: activeTheme} = props
    const theme = React.useMemo(
        () => createMuiTheme(
        {
            palette: {
                type: activeTheme === 'dark' ? 'dark' : 'light',
            },
            typography: {
                fontSize: 12,
            },
        }
    ),[activeTheme])

    return (
        <>
        <ThemeProvider theme={theme}>
            <AppBar  {...props}/>
            <Chat />
        </ThemeProvider>
        </>
    )
}

const ObservableApp = observe((app) => {
    const store = app.get('store')
    const state$ = store.getState$()
    const stateProps$ = state$.pipe(
        map(state => ({theme: state.themeReducer.dark ? 'dark' : 'default'}))
    )
    const actionProps$ = of({
        activateDarkTheme: (...args) => store.dispatch(activateDarkTheme(...args)),
        deactivateDarkTheme: (...args) => store.dispatch(activateDefaultTheme(...args))
    })
    return stateProps$.pipe(
        merge(actionProps$),
        scan((props, emitted) => ({...props, ...emitted}))
    )
})(App)

export default createApp({
    name: 'ReactApp',
    providers: [
        {
            name: 'component',
            useValue: ObservableApp
        },
        {
            name: 'store',
            useFactory: (app) => {
                const Store = createStore({
                    reducer: rootReducer,
                    deps: app
                })
                return new Store()
            },
            deps: ['app'],
        },
        {
            name: 'router',
            useFactory: () => new BrowserRouterService(),
            cascade: true,
        }
    ]
});
