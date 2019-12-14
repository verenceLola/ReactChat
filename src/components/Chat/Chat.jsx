import React from 'react'
import { Grid, Divider, TextField } from '@material-ui/core'
import ChatList from '../ChatList/ChatList'
import { observe, streamProps } from 'frint-react'
import { fetchUseChats } from "../../actions/Chat/chat";
import Cookies from 'js-cookie'
import * as jwt_decode from "jwt-decode";
import ChatContent from "../ChatContent/ChatContent";
import { from } from 'rxjs/observable/from';


const Chat = ({ chats, fetchUseChats }) => {
    const [ selectedChat, setSelectedChat ] = React.useState(1);
    React.useEffect(() => {
        if (chats[0]) {
            setSelectedChat(chats[0].id)
        }
    }, [chats])
    let messages = []
    React.useEffect(() => {
        fetchUseChats()
    }, [fetchUseChats])
    const currentUserData = React.useMemo(
        () => jwt_decode(Cookies.get('jwt-token')).userdata,
        []
    )
    from(chats).find(chat => chat.id === selectedChat )
                .subscribe(chat => messages = chat ? chat.messages : [])
    return (
            <Grid container direction='row'>
                <ChatList chats={chats} handleOnChatSelect={setSelectedChat} activeChat={selectedChat} currentUser={currentUserData} />
                <Grid item>
                    <Divider orientation='vertical' />
                </Grid>
                <ChatContent messages={messages} currentUser={currentUserData} />
            </Grid>
    )
}

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({
        chats: state.chat.chats,
    }))
    .setDispatch({
        fetchUseChats,
    }, app.get('store'))
    .get$()
)(Chat)