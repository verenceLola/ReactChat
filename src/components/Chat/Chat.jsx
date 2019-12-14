import React from 'react'
import { Grid, Divider, makeStyles } from '@material-ui/core'
import ChatList from '../ChatList/ChatList'
import { observe, streamProps } from 'frint-react'
import { fetchUserChats, setActiveChat, webSocketConnect, webSocketDisconnect } from "../../actions/Chat/chat";
import Cookies from 'js-cookie'
import * as jwt_decode from "jwt-decode";
import ChatContent from "../ChatContent/ChatContent";
import { from } from 'rxjs/observable/from';

const useContainseStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        height: '86%',
    }
}))

const Chat = ({ chats, fetchUserChats, selectedChat, webSocketConnect, webSocketDisconnect, setSelectedChat }) => {
    const classes = useContainseStyles()
    React.useEffect(() => {
        fetchUserChats()
    }, [fetchUserChats])

    const currentUserData = React.useMemo(
        () => jwt_decode(Cookies.get('jwt-token')).userdata,
        []
    )

    const webSocketSubject = React.useMemo(() => ({
        group: webSocketConnect('chat/group/'),
        dm: webSocketConnect('chat/dm/')
    }),[webSocketConnect])

    React.useEffect(() => {
        (async () => await webSocketSubject)()
        return () =>  webSocketDisconnect(webSocketSubject) // TODO: Fix webSocket Disconnection when component is Unmounted
    }, [webSocketSubject, webSocketDisconnect])

    const handleOnChatSelect = chatId => {
        from(chats).find( chat => chat.id === chatId).subscribe( chat => setSelectedChat(chat))
    }

    return (
            <Grid container direction='row' className={classes.container}>
                <ChatList chats={chats} handleOnChatSelect={handleOnChatSelect} activeChat={selectedChat} currentUser={currentUserData} />
                <Grid item>
                    <Divider orientation='vertical' />
                </Grid>
                <ChatContent selectedChat={selectedChat} webSocketSubject={webSocketSubject} currentUser={currentUserData} />
            </Grid>
    )
}

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({
        chats: state.chat.chats,
        selectedChat: state.chat.activeChat
    }))
    .setDispatch({
        fetchUserChats,
        webSocketConnect: url => webSocketConnect(url),
        webSocketDisconnect: subject => webSocketDisconnect(subject),
        setSelectedChat: activeChat => setActiveChat(activeChat)
    }, app.get('store'))
    .get$()
)(Chat)