import { ClickAwayListener, Grow } from "@material-ui/core";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import clsx from "clsx";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React from "react";
import { Manager, Popper, Reference } from "react-popper";

import "./EmojiPicker.css";

const EmojiPicker = ({ classes, message, setMessage }) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);

  const closeEmojiPicker = () => {
    setEmojiPickerOpen(false);
  };
  const handleEmojiSelect = ({ native: emoji }, { event }) => {
    setMessage(`${message}${emoji}`);
    setEmojiPickerOpen(false);
  };
  const handleEmojiPicker = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <EmojiEmotionsIcon
            ref={ref}
            fontSize="large"
            className={clsx("send-message-icon-btn", classes.iconButton)}
            onClick={handleEmojiPicker}
          />
        )}
      </Reference>
      <Popper placement="top-start" eventsEnabled={false}>
        {({ ref, style, placement, arrowProps }) => (
          <div
            ref={ref}
            style={emojiPickerOpen ? style : { display: "none" }}
            data-placement={placement}>
            <ClickAwayListener onClickAway={closeEmojiPicker}>
              <Grow in={emojiPickerOpen}>
                <Picker title="Quexl Chat" onClick={handleEmojiSelect} />
              </Grow>
            </ClickAwayListener>
            <div ref={arrowProps.ref} style={arrowProps.style} />
          </div>
        )}
      </Popper>
    </Manager>
  );
};

export default EmojiPicker;
