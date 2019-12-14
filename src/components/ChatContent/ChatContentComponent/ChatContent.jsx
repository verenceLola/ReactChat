import { Container, Divider, Grid } from "@material-ui/core";
import { observe, streamProps } from "frint-react";
import React from "react";
import { from } from "rxjs/observable/from";

import {
  sendGroupMessage,
  sendMessage,
  subscribeNewMessage,
} from "../../../actions/Chat/chat";
import SendMessageComponent from "../../SendMessage/SendMessageComponent/SendMessageComponent";
import MessageContent from "./MessageContent/MessageContent";
import Participants from "./Participants/Participants";

import "./ChatContent.css";

const ChatContent = ({
  selectedChat: { participants = [], members, messages = [], group_name },
  currentUser: { email },
  subscribeNewMessage,
  webSocketSubject,
  sendMessage,
  sendGroupMessage,
}) => {
  let Messages = [];
  const sendTo = React.useMemo(
    () => participants.find(user => user.email !== email),
    [participants, email],
  );

  from(messages)
    .map((message, index) => (
      <MessageContent
        fromSender={message.sender.email !== email}
        content={message}
        key={index}
      />
    ))
    .subscribe(components => Messages.push(components));

  React.useEffect(() => {
    if (webSocketSubject) {
      subscribeNewMessage(webSocketSubject.dm);
      subscribeNewMessage(webSocketSubject.group);
    }
  }, [webSocketSubject, subscribeNewMessage]);

  const sendNewMessage = message => {
    sendMessage(webSocketSubject.dm, { message, to: sendTo.username });
  };

  const sendNewGroupMessage = message => {
    sendGroupMessage(webSocketSubject.group, { message, group: group_name });
  };

  return (
    <Grid item xs className={"chat-content-container"}>
      <Grid
        container
        direction="column"
        className={"chat-content-mainContainer"}
        spacing={2}>
        <Grid item className={"chat-content-participants-item"}>
          <Grid container spacing={1}>
            {members ? (
              <Participants members={members} email={email} />
            ) : (
              <Participants members={participants} email={email} />
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item className={"chat-content-msgContainer"}>
          <Container className={"chat-content-msgListContainer"}>
            {Messages}
          </Container>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item className={"chat-content-send-msg-item"}>
          <SendMessageComponent
            sendMessage={group_name ? sendNewGroupMessage : sendNewMessage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default observe(app =>
  streamProps()
    .set(app.get("store").getState$(), state => ({}))
    .setDispatch(
      {
        subscribeNewMessage,
        sendMessage: (subject, payload) => sendMessage(subject, payload),
        sendGroupMessage: (subject, payload) =>
          sendGroupMessage(subject, payload),
      },
      app.get("store"),
    )
    .get$(),
)(ChatContent);
