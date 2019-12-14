import { Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";

import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";

import "./MessageContent.css";

const MessageContent = ({
  content: { text, sent_at, sender },
  fromSender = false,
}) => (
  <Grid item>
    <Container>
      <Grid container direction="column">
        <Grid item>
          <MessageBody text={text} fromSender={fromSender} sender={sender} />
        </Grid>
        <Grid item>
          <MessageTime sent_at={sent_at} fromSender={fromSender} />
        </Grid>
      </Grid>
    </Container>
  </Grid>
);

const MessageBody = ({ text, sender, fromSender }) => (
  <Grid
    container
    className={"msg-content-contentwrapper"}
    direction={fromSender ? "row" : "row-reverse"}
    justify="flex-start">
    <Grid item style={{ display: "flex", alignItems: "center" }}>
      <ProfileAvatar user={sender} />
    </Grid>
    <Grid item>
      <MessageText text={text} />
    </Grid>
  </Grid>
);

const MessageText = ({ text }) => (
  <Paper className={"msg-content-msgbody"}>
    <Grid
      container
      className={"msg-content-msgcontainer"}
      alignItems="center"
      justify="center">
      <Grid item>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  </Paper>
);

const MessageTime = ({ sent_at, fromSender }) => (
  <Grid
    container
    className={fromSender ? "msg-content-fromsender" : "msg-content-tosender"}
    alignItems="center">
    <Typography variant="caption">
      <Moment format="DD/MM HH:mm:ss">{sent_at}</Moment>
    </Typography>
  </Grid>
);

export default MessageContent;
