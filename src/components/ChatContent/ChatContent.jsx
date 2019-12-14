import React from 'react'
import { Grid, makeStyles, Typography, Paper, Container } from '@material-ui/core'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import Moment from 'react-moment'
import { from } from 'rxjs/observable/from'
import SendMessageComponent from '../SendMessage/SendMessageComponent'
import { observe, streamProps } from 'frint-react'
import { subscribeNewMessage, sendGroupMessage, sendMessage } from "../../actions/Chat/chat";

const useChatContentStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        overflow: 'auto',
        height: '100%',
    },
    msgContainer: {
        flexGrow: 1,
        flexShrink: 1,
        height: '81.9%',
    },
    msgListContainer: {
        overflow: 'auto',
        height: '100%',
        flexDirection: 'column-reverse',
        display: 'flex',
    },
    mainContainer: {
        height: '100%', 
        width: '100%', 
        flexWrap: 'nowrap',
    },
    participantAvatar: {
        cursor: 'pointer'
    }
}))


const ChatContent = ( { 
    selectedChat: { participants = [], members, messages = [], group_name }, 
    currentUser: {email}, subscribeNewMessage, webSocketSubject,
    sendMessage, sendGroupMessage
} ) => {
    const containerClasses = useChatContentStyles()
    let Messages = []
    const sendTo = React.useMemo(() => participants.find(user => user.email !== email), [participants, email])

    from(messages).map(
        (message, index) => {
            return (
                message.sender.email === email
                ? <MessageContent content={message} key={index} />
                : <MessageContent fromSender content={message} key={index} />
            )
        }
    ).subscribe(
        components => Messages.push(components)
    )

    React.useEffect(() => {
        if (webSocketSubject) {
            subscribeNewMessage(webSocketSubject.dm)
            subscribeNewMessage(webSocketSubject.group)
        }
    }, [webSocketSubject, subscribeNewMessage])

    const sendNewMessage = message => {
        sendMessage(webSocketSubject.dm, {message, to: sendTo.username})
    }

    const sendNewGroupMessage = message => {
        sendGroupMessage(webSocketSubject.group, {message, group: group_name})
    }

    return (
        <Grid item xs className={containerClasses.container}>
            <Grid container direction='column' className={containerClasses.mainContainer} spacing={2}>
                <Grid item style={{margin: 5}}>
                    <Grid container spacing={1}>
                        {members ? members.filter((member => member.email !== email)).map(
                            member => <Grid item className={containerClasses.participantAvatar} ><Participant user={member} /></Grid>
                        ) : participants.filter((participant => participant.email !== email)).map(
                            participant => <Grid item><Participant user={participant} /></Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item className={containerClasses.msgContainer}>
                    <Container className={containerClasses.msgListContainer}>
                        {Messages}
                    </Container>
                </Grid>
                <Grid item>
                    <SendMessageComponent sendMessage={group_name ? sendNewGroupMessage : sendNewMessage } />
                </Grid>
            </Grid>
        </Grid>
    )
}


const useMessageContentStyles = makeStyles({
    msgBody: {
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    msgContainer: {
        height: '100%',
        padding: 5,
    },
    contentWrapper: {
        flexWrap: 'nowrap',
    },
    timeSent: {
        justifyContent: fromSender => fromSender ? 'flex-start' : 'flex-end',
        paddingLeft: fromSender => fromSender ? 50 : 0,
        paddingRight: fromSender => fromSender ? 0 : 50,
    }
})

const MessageContent = ({content: {text, sent_at, sender}, fromSender = false}) => {
    const classes = useMessageContentStyles(fromSender)
    return (
        <Grid item><Container>
            <Grid container direction='column' >
                <Grid item>
                    <Grid container className={classes.contentWrapper} direction={fromSender ? 'row' : 'row-reverse'}  justify='flex-start' >
                        <Grid item>
                            <ProfileAvatar user={sender} />
                        </Grid>
                        <Grid item >
                            <Paper className={classes.msgBody}>
                                <Grid container className={classes.msgContainer} alignItems='center' justify='center'>
                                    <Grid item >
                                        <Typography >
                                            {text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container className={classes.timeSent} alignItems='center'>
                        <Typography variant='caption'>
                            <Moment format="DD/MM HH:mm:ss">{sent_at}</Moment>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid></Container>
        </Grid>
    )
}

const Participant = ({user}) => <ProfileAvatar loadProfile user={user} />

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({}))
    .setDispatch({
        subscribeNewMessage,
        sendMessage: (subject, payload) => sendMessage(subject, payload),
        sendGroupMessage: (subject, payload) => sendGroupMessage(subject, payload),
    }, app.get('store'))
    .get$()
)(ChatContent);
