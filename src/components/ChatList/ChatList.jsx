import React from 'react'
import { Grid, Paper, makeStyles, TextField, InputAdornment, IconButton, Typography, Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { from } from 'rxjs/observable/from';
import Moment from 'react-moment'
import moment from 'moment';

const useContainerStyles = makeStyles(theme => ({
    container: {
        padding: 5,
    },
    searchItem: {
        flexGrow: 1,
    }
}))

const ChatList = ( {chats, currentUser: {username}, activeChat, handleOnChatSelect} ) => {
    const classes = useContainerStyles()

    const ChatCards = React.useMemo(() => {
        let cards = []
        from(chats)
        .map(
            (chatItem, index) => {
                let latestMsg
                const msgObservable = from(chatItem.messages.sort((a, b) => {
                    const timeA = moment(a.sent_at)
                    const timeB = moment(b.sent_at)
                    if (timeA.isBefore(timeB)) {
                        return 1
                    } else if (timeA.isSame(timeB)){
                        return 0
                    } else {
                        return -1
                    }
                }))
                msgObservable.take(1)
                    .subscribe( msg => latestMsg = msg)
                return <ChatCard onClick={handleOnChatSelect} chatID={chatItem.id} latestMsg={latestMsg} active={chatItem.id === activeChat.id} currentUser={username} key={index} />
            }
        )
        .subscribe(card => cards = [...cards, [card]])
        return cards
    }, [activeChat.id, chats, handleOnChatSelect, username])

    return (
        <Grid item >
            <Grid container direction='column' spacing={1} className={classes.container}>
                <Grid item className={classes.searchItem}>
                    <SearchChatField />
                </Grid>
                <Grid item>
                    <Grid container direction='column' >
                        {ChatCards }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const useSearchStyle = makeStyles( theme => ({
    paper: {
        borderRadius: 40,
    },
    searchField: {
        margin:  theme.spacing(1),
        '& .MuiInputBase-input': {
            color: 'yellow',
            borderRadius: 5
        },
    },
}))
const userSearchTextField = makeStyles( theme => ({
    underline: {
        '&:before': {
            border: 0,
        },
        '&:after': {
            border: 0,
        },
        '&:hover': {
            '&:not(.Mui-disabled)':{
                '&:before': {
                    border: 0
                }
            }
        }
    },
}),  {name: 'MuiInput'})
const SearchChatField = props => {
    const classes = useSearchStyle()
    const textFieldClasses = userSearchTextField()
    return (
        <Paper className={classes.paper}>
           <TextField
            fullWidth
            className={clsx(classes.searchField, classes.textField, textFieldClasses.underline)}
            InputProps={{
                startAdornment: <InputAdornment position="start">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>,
                classes: {
                    underline: classes.searchField.underline,
                }
            }}
            placeholder='Search ...'
            />
        </Paper>
    )
}

const useChatCardStyles = makeStyles(theme => ({
    chatItem: {
        margin: 5,
    },
    paperItem: {
        padding: 5,
        borderRadius: 15,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#757575',
        }
    },
    username: {
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    chatInfo: {
        marginLeft: 10,
        flexGrow: 1
    },
    chatContainer: {
        flexWrap: 'noWrap',
    },
    unreadCount: {
        width: 25,
        height: 25,
        color: 'yellow',
        margin: 5,
    },
    msgStatus: {
        color: 'yellow',
        fontSize: 15,
        paddingLeft: 5
    },
    msgCount: {
        marginLeft: 'auto',
    },
    activeCard: {
        borderLeftColor: theme.palette.secondary.main,
        borderLeftStyle: 'solid',
        borderLeftWidth: 'thick',
    }
}))

const ChatCard = ({ 
    latestMsg: {text, sender: {username, email} = {}, sent_at } = {},
    chatID, active, currentUser:  currentUserNsername, onClick
 }) => {
    const classes = useChatCardStyles()
    const handleOnClick = () => {
        onClick(chatID)
    }
    return (
        <Grid onClick={handleOnClick} item xs className={classes.chatItem}>
            <Paper className={active ? clsx(classes.paperItem, classes.activeCard) : clsx(classes.paperItem)}>
                <Grid container direction='row' alignItems='center' className={classes.chatContainer}>
                    <Grid item>
                        <ProfileAvatar loadProfile user={{username, email}} />
                    </Grid>
                    <Grid item>
                        <Grid container direction='column' className={classes.chatInfo}>
                            <Typography className={classes.username} align='left' variant='body2' >
                                {username === currentUserNsername ? 'You' : username}
                            </Typography>
                            <Typography variant='caption' noWrap style={{maxWidth: 230}} >
                                {text}
                            </Typography>
                            <Grid item>
                                <Grid container>
                                    <Typography variant='caption'>
                                        <Moment format="DD/MM/YYYY HH:mm">{sent_at}</Moment>
                                    </Typography>
                                    <Typography variant='caption'>
                                        <DoneAllIcon className={classes.msgStatus} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.msgCount}>
                        <Avatar className={classes.unreadCount}>
                            <Typography variant='caption'>3</Typography>
                        </Avatar>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}


export default ChatList;
