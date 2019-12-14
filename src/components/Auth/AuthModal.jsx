import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Grid, makeStyles, Paper, Tabs, Tab, CircularProgress, FormControl, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 300,
      },
    },
    gridContainer: {
        padding: theme.spacing(2),
    },
    paper: {
        flexGrow: 1,
    },
    button: {
        '& .MuiButton-contained' : {
            color: 'yellow'
        }
    },
    textPaper: {
        padding: 5
    },
    submitButton: {
        color: 'white',
        backgroundColor: theme.palette.secondary.dark,
        '&:hover': {
            color: "black",
            backgroundColor: theme.palette.secondary.light
        }
    }
  }));
const AuthDialog = props => {
    const {open, handleClose, errors, message, signedUp} = props
    const [activeTab, setActiveTab] = React.useState(0);
    const {loginUser, loading, signUpUser, resetPassword} = props
    const [ loginDetails, setLoginDetails ] = React.useState(
        {
            email: {
                value: '',
                error: {
                    value: false,
                    text: ''
                },
                isValid: false,
            },
            password: {
                value: '',
                error: false,
            },
        }
    )
    const [ signUpDetails, setSignupDetails ] = React.useState(
        {
            username: {
                value: '',
                error: false
            },
            email: {
                value: '',
                error: false
            },
            password: '',
            confirm_password: {
                value: '',
                error: false
            },
        }
    )
    const [ resetPasswordDetails, setResetPasswordDetails ] = React.useState(
        {
            email: {
                value: '',
                error: false,
            },
            password: {
                value: '',
                error: false
            },
            error: false
        }
    )
    const handleTabChange = (_, newValue) => {
        setActiveTab(newValue);
    };

    const handleOnSubmit = () => {
        const operation = {
            0: loginDetails => loginUser(loginDetails),
            1: signUpDetails => signUpUser(signUpDetails),
            2: resetPasswordDetails => resetPassword(resetPasswordDetails),
        }[activeTab]
        operation({
            0: loginDetails,
            1: signUpDetails,
            2: resetPasswordDetails
        }[activeTab])
    }
    const classes = useStyles()
    
    const ConfirmEmailPaper = () => (
        <Grid container spacing={2} direction='column' className={classes.gridContainer}>
            <Paper className={classes.paper} classes={{rounded: classes.textPaper}}>
                <h6>ACCOUNT CREATED SUCCESSFULLY</h6>
                <Button fullWidth variant='contained' classes={{contained: classes.submitButton}}>
                    ACTIVATE ACCOUNT
                </Button>
            </Paper>
        </Grid>
    )
    const ActiveForm = {  // map components to tab indices.
        0: <LoginForm loginDetails={loginDetails} setLoginDetails={setLoginDetails} loading={loading} message={message.login} errors={errors.login} />,
        1: <SignupForm errors={errors.signup} message={message.signup} loading={loading} signUpDetails={signUpDetails} setSignupDetails={setSignupDetails} />,
        2: <ResetPasswordForm resetPasswordDetails={resetPasswordDetails} error={errors.reset.error} setResetPasswordDetails={setResetPasswordDetails} loading={loading} message={message.reset} />
    }[activeTab]
    return (
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            { signedUp ? <ConfirmEmailPaper /> : <Grid container spacing={2} direction='column' className={classes.gridContainer}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                        >
                            <Tab label="Login" disabled={loading} />
                            <Tab label="SignUp" disabled={loading} />
                            <Tab label="Reset Password" disabled={loading} />
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper} classes={{rounded: classes.textPaper}}>
                        {ActiveForm }
                    </Paper>
                </Grid>
                <Grid item>
                    <Button fullWidth variant='contained' classes={{contained: classes.submitButton}} onClick={handleOnSubmit}>
                        {
                            loading ? <CircularProgress /> : {
                                0: 'Login',
                                1: 'SignUp',
                                2: 'Reset Password'
                            }[activeTab]
                        }
                    </Button>
                </Grid>
            </Grid>}
        </Dialog>
        </div>
    );
}

const formStyle = makeStyles( theme => ({
    helperText: {
        margin: '10px 0',
        color: theme.palette.error.dark,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.fontSize
    },
    formInputs: {
        margin: '10px 0',
        '& label.Mui-focused': {
            color: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main
            },
        },
        color: 'yellow',
        '& .MuiInputBase-input' : {
            color: 'yellow'
        }
    },
}))

const validateEmail = value => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value)


const LoginForm = ({ message, loginDetails, setLoginDetails, errors, loading }) => {
    const classes = formStyle()
    const handleLoginDetails = prop => event => {
        setLoginDetails({...loginDetails, [prop]: { ...loginDetails[prop], value: event.target.value, isValid: validateEmail(loginDetails.email.value)}})
    }
    return (
        <>
            <FormControl fullWidth>
                <FormHelperText className={classes.helperText} >{message}</FormHelperText>
                <TextField helperText={errors.email} disabled={loading} value={loginDetails.email.value} error={errors.email !== undefined} onChange={handleLoginDetails('email')} placeholder='example@email.com' className={classes.formInputs} fullWidth variant='outlined' label='Email Address' />
                <TextField helperText={errors.password} error={errors.password !== undefined} disabled={loading} value={loginDetails.password.value} onChange={handleLoginDetails('password')} placeholder='*************' type='password' className={classes.formInputs} fullWidth variant='outlined' label='Password' />
            </FormControl>
        </>
    )
}

const SignupForm = ({errors, message, loading, signUpDetails, setSignupDetails}) => {
    const classes = formStyle()
    const handleSignUpDetails = prop => event => {
        setSignupDetails({...signUpDetails, [prop]:{...signUpDetails[prop], value: event.target.value} })
    }
    return (
        <>
            <FormControl fullWidth>
                <FormHelperText className={classes.helperText} >{message}</FormHelperText>
                <TextField helperText={errors.email} error={errors.email !== undefined} disabled={loading} value={signUpDetails.email.value} onChange={handleSignUpDetails('email')} className={classes.formInputs} fullWidth variant='outlined' label='Email Address' />
                <TextField helperText={errors.username} error={errors.username !== undefined} disabled={loading} value={signUpDetails.username.value} onChange={handleSignUpDetails('username')} className={classes.formInputs} fullWidth variant='outlined' label='Username' />
                <TextField helperText={errors.password} error={errors.password !== undefined} disabled={loading} value={signUpDetails.password.value} onChange={handleSignUpDetails('password')} className={classes.formInputs} fullWidth variant='outlined' type='password' label='Password' />
                <TextField disabled={loading} value={signUpDetails.confirm_password.value} onChange={handleSignUpDetails('confirm_password')} className={classes.formInputs} fullWidth variant='outlined' type='password' label='Confirm Password' />
            </FormControl>
        </>
    )
}

const ResetPasswordForm = ({ loading, setResetPasswordDetails, resetPasswordDetails, message, error }) => {
    const handleResetPasswordChange = prop => event => {
        const value = event.target.value
        setResetPasswordDetails({...resetPasswordDetails, [prop]:{...resetPasswordDetails[prop], value: value, isValid: validateEmail(resetPasswordDetails.email.value)}})
    }
    const classes = formStyle()
    return (
        <>
            <FormControl fullWidth>
                <FormHelperText className={classes.helperText} >{message}</FormHelperText>
                <TextField helperText={error} error={error !== undefined} disabled={loading} value={resetPasswordDetails.email.value} onChange={handleResetPasswordChange('email')} className={classes.formInputs} fullWidth variant='outlined' label='Email Address' />
            </FormControl>
        </>
    )
}

export default AuthDialog;
