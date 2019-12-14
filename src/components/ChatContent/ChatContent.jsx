import React from 'react'
import { Grid, makeStyles, Typography, Paper, Container } from '@material-ui/core'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import Moment from 'react-moment'
import { from } from 'rxjs/observable/from'
import moment from 'moment'
import SendMessageComponent from '../SendMessage/SendMessageComponent'

const useChatContentStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1
    }
}))


const ChatContent = ( {messages, currentUser: {email}} ) => {
    const containerClasses = useChatContentStyles()
    let Messages = []
    from(messages.sort((a, b) => {
        const timeA = moment(a.sent_at)
        const timeB = moment(b.sent_at)
        if (timeA.isBefore(timeB)) {
            return -1
        } else if (timeA.isSame(timeB)){
            return 0
        } else {
            return 1
        }
    })).map(
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
    
    return (
        <Grid item xs className={containerClasses.container}>
            <Grid container direction='column' spacing={2}>
                {Messages}
                <Grid item>
                    <SendMessageComponent />
                </Grid>
            </Grid>
        </Grid>
    )
}


const useMessageContentStyles = makeStyles({
    msgBody: {
        borderRadius: 15,
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
export default ChatContent;
