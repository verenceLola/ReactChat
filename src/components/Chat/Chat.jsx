import { Divider, Grid } from "@material-ui/core";
import { observe, streamProps } from "frint-react";
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";
import React from "react";
import { from } from "rxjs/observable/from";

import { fetchUserChats, setActiveChat, webSocketConnect, webSocketDisconnect } from "../../actions/Chat/chat";
import ChatContent from "../ChatContent/ChatContentComponent/ChatContent";
import ChatList from "../ChatList/ChatListComponent/ChatList";
import Profile from "../Profile/Profile";

import "./Chat.css";

const Chat = ({
  chats,
  fetchUserChats,
  selectedChat,
  webSocketConnect,
  webSocketDisconnect,
  setSelectedChat,
}) => {
  React.useEffect(() => {
    fetchUserChats();
  }, [fetchUserChats]);

  const currentUserData = React.useMemo(
    () => jwt_decode(Cookies.get("jwt-token")).userdata,
    [],
  );

  const webSocketSubject = React.useMemo(
    () => ({
      group: webSocketConnect("chat/group/"),
      dm: webSocketConnect("chat/dm/"),
    }),
    [webSocketConnect],
  );

  React.useEffect(() => {
    (async () => await webSocketSubject)();
    return () => webSocketDisconnect(webSocketSubject); // TODO: Fix webSocket Disconnection when component is Unmounted
  }, [webSocketSubject, webSocketDisconnect]);

  const handleOnChatSelect = chatId => {
    from(chats)
      .find(chat => chat.id === chatId)
      .subscribe(chat => setSelectedChat(chat));
  };

  return (
    <Grid container direction="row" className={"chat-container"}>
      <ChatList
        chats={chats}
        handleOnChatSelect={handleOnChatSelect}
        activeChat={selectedChat}
        currentUser={currentUserData}
      />
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <ChatContent
        selectedChat={selectedChat}
        webSocketSubject={webSocketSubject}
        currentUser={currentUserData}
      />
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item className={"profile-item"}>
        <Grid container className={"profile-container"} direction="column">
          <Profile />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default observe(app =>
  streamProps()
    .set(app.get("store").getState$(), state => ({
      chats: state.chat.chats,
      selectedChat: state.chat.activeChat,
    }))
    .setDispatch(
      {
        fetchUserChats,
        webSocketConnect: url => webSocketConnect(url),
        webSocketDisconnect: subject => webSocketDisconnect(subject),
        setSelectedChat: activeChat => setActiveChat(activeChat),
      },
      app.get("store"),
    )
    .get$(),
)(Chat);
