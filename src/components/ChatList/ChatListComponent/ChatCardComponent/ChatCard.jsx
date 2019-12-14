import React from "react";
import { Grid, makeStyles, Typography, Avatar } from "@material-ui/core";
import clsx from "clsx";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Moment from "react-moment";

import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";

import "./ChatCard.css";

const useChatCardStyles = makeStyles(theme => ({
  paperItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  unreadCount: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  },
  activeCard: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ChatCard = ({
  latestMsg: { text, sender: { username, email } = {}, sent_at } = {},
  chatID,
  active,
  currentUser: currentUserName,
  onClick,
}) => {
  const classes = useChatCardStyles();
  const handleOnClick = () => {
    onClick(chatID);
  };
  return (
    <Grid onClick={handleOnClick} item className={"chat-card-item"}>
      <div
        className={
          active
            ? clsx(
                classes.paperItem,
                "chat-card-paper-item",
                classes.activeCard,
              )
            : clsx(classes.paperItem, "chat-card-paper-item")
        }>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={"chat-card-container"}>
          <Grid item>
            <ProfileAvatar loadProfile user={{ username, email }} />
          </Grid>
          <Grid item>
            <ChatCardBody
              username={username === currentUserName ? "You" : username}
              text={text}
              sent_at={sent_at}
            />
          </Grid>
          <Grid item className={"chat-card-msg-count"}>
            <Avatar
              className={clsx(classes.unreadCount, "chat-card-unread-count")}>
              <Typography variant="caption">3</Typography>
            </Avatar>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

const ChatCardBody = ({ username, text, sent_at }) => (
  <Grid container direction="column" className={"chat-card-info"}>
    <Typography className={"chat-card-username"} align="left" variant="body2">
      {username}
    </Typography>
    <Typography
      variant="caption"
      noWrap
      className={"chat-card-msg-text-caption"}>
      {text}
    </Typography>
    <Grid item>
      <Grid container>
        <Typography variant="caption">
          <Moment format="DD/MM/YYYY HH:mm">{sent_at}</Moment>
        </Typography>
        <Typography variant="caption">
          <DoneAllIcon className={"chat-card-mgs-status"} />
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export default ChatCard;
