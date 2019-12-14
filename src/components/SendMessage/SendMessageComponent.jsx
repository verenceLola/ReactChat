
import React from 'react'
import { Paper, IconButton, InputBase, Divider, ClickAwayListener, makeStyles, Grow } from '@material-ui/core'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { Manager, Reference, Popper } from 'react-popper';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      '& .emoji-mart .emoji-mart-emoji': {
          '&:focus': {
              outline: 'none'
          }
      }
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: 'medium'
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));

const SendMessageComponent = ({sendMessage}) => {
    const classes = useStyles();
    const [ message, setMessage ] = React.useState('')
    const [ emojiPickerOpen, setEmojiPickerOpen ] = React.useState(false)

    const closeEmojiPicker = () => {
        setEmojiPickerOpen(false)
    }
    
    const handleOnChange = ({target: { value }}) => {
        setMessage(value)
    }

    const handleEmojiSelect = ({ native: emoji },{ event }) => {
        setMessage(`${message}${emoji}`)
        setEmojiPickerOpen(false)
    }
    const handleEmojiPicker = () => {
        setEmojiPickerOpen(!emojiPickerOpen)
    }
    const onSendMessage = event => {
        event.preventDefault()
        sendMessage(message)
        setMessage('')
    }
    const EmojiPicker = () => (
        <Manager>
            <Reference>
                {({ ref }) => (
                    <EmojiEmotionsIcon ref={ref} fontSize='large' style={{cursor: 'pointer'}} onClick={handleEmojiPicker} />
                )}
            </Reference>
            <Popper placement="top-end" eventsEnabled={false}>
                {({ ref, style, placement, arrowProps }) => (
                    <div ref={ref} style={emojiPickerOpen ? style : {display: 'none'}} data-placement={placement}>
                        <ClickAwayListener onClickAway={closeEmojiPicker}>
                            <Grow in={emojiPickerOpen}>
                                <Picker title='Quexl Chat' onClick={handleEmojiSelect} />
                            </Grow>
                        </ClickAwayListener>
                        <div ref={arrowProps.ref} style={arrowProps.style} />
                    </div>
                )}
            </Popper>
        </Manager>
      );
    return (
        <Paper component="form" className={classes.root} onSubmit={onSendMessage}>
            <EmojiPicker />
            <InputBase
                className={classes.input}
                placeholder="Type your message here ..."
                fullWidth
                onChange={handleOnChange}
                value={message}
                multiline
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} type='submit' >
                <SendIcon />
            </IconButton>
        </Paper>
    )
}

export default SendMessageComponent;
