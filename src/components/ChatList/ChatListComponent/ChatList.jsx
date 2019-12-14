import { Grid } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { from } from "rxjs/observable/from";

import ChatCard from "./ChatCardComponent/ChatCard";
import SearchChatField from "./SearchChatList/SearchChatList";

import "./ChatList.scss";

const sortMessages = (a, b) => {
  const timeA = moment(a.sent_at);
  const timeB = moment(b.sent_at);
  if (timeA.isBefore(timeB)) {
    return 1;
  } else if (timeA.isSame(timeB)) {
    return 0;
  } else {
    return -1;
  }
};

const ChatList = ({
  chats,
  currentUser: { username },
  activeChat,
  handleOnChatSelect,
}) => {
  const ChatCards = React.useMemo(() => {
    let cards = [];
    from(chats)
      .map((chatItem, index) => {
        let latestMsg;
        const msgObservable = from(chatItem.messages.sort(sortMessages));
        msgObservable.take(1).subscribe(msg => (latestMsg = msg));
        return (
          <ChatCard
            onClick={handleOnChatSelect}
            chatID={chatItem.id}
            latestMsg={latestMsg}
            active={chatItem.id === activeChat.id}
            currentUser={username}
            key={index}
          />
        );
      })
      .subscribe(card => (cards = [...cards, [card]]));
    return cards;
  }, [activeChat.id, chats, handleOnChatSelect, username]);

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        spacing={1}
        className={"chat-list-container"}>
        <Grid item className={"chat-list-searchItem"}>
          <SearchChatField />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Grid
            container
            className={"chat-list-main-container"}
            direction="column">
            {ChatCards}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatList;
