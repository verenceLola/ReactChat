import { Divider, IconButton, InputBase, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import clsx from "clsx";
import React from "react";

import EmojiPicker from "../EmojiPicker/EmojiPicker";

import "./SendMessageComponent.css";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
  },
  iconButton: {
    color: theme.palette.primary.main,
  },
}));

const SendMessageComponent = ({ sendMessage }) => {
  const classes = useStyles();
  const [message, setMessage] = React.useState("");

  const handleOnChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const onSendMessage = event => {
    event.preventDefault();
    if (message !== "") {
      sendMessage(message);
    }
    setMessage("");
  };

  return (
    <div component="form" className={"send-message"}>
      <EmojiPicker
        classes={classes}
        message={message}
        setMessage={setMessage}
      />
      <InputBase
        className={clsx(classes.input, "send-message-input")}
        placeholder="Type your message here ..."
        fullWidth
        onChange={handleOnChange}
        value={message}
        multiline
      />
      <Divider className={"send-message-divider"} orientation="vertical" />
      <IconButton
        onClick={onSendMessage}
        className={clsx("send-message-icon-btn", classes.iconButton)}
        type="submit">
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default SendMessageComponent;
