import React from 'react'
import { IconButton, Badge, Button } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem, FormGroup, FormControlLabel, Switch, } from '@material-ui/core';
import { observe, streamProps } from 'frint-react';
import { loginUser, signUpUser, resetPassword } from '../../actions/Auth/auth';
import { makeStyles } from '@material-ui/styles';
import AuthDialog from './AuthModal';

const useStyles = makeStyles(theme => (
    {
        outlinedButton: {
            color: 'white',
            borderColor: theme.palette.secondary.main,
            '&:hover': {
                borderColor: 'yellow',
            },
        },
    }
))

const Auth = ({handleToogleTheme, message, passwordResetStatus, resetPassword, signUpUser, signedUp, loading, handleMenu, handleClose, open, anchorEl, activeTheme, loggedIn, loginUser, errors}) => {
    const classes = useStyles()
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const handleAuthDialogOpen = () => {
        setDialogOpen(true)
    }
    const handleAuthDialogClose = () => {
        setDialogOpen(false)
    }
    return loggedIn ? (
        <>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
        <div>
            <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            >
            <AccountCircle fontSize='large' />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>
                <FormGroup>
                <FormControlLabel control={<p></p>} labelPlacement='start' label='Logout' />
                </FormGroup>
            </MenuItem>
            <MenuItem onClick={handleToogleTheme}>
                <FormGroup row>
                <FormControlLabel control={<Switch checked={activeTheme === 'dark'} size='small' />} labelPlacement='start' label='Dark Theme' />
                </FormGroup>
            </MenuItem>
            </Menu>
        </div>
        </>
    ) : (
        <>
        <Button variant='outlined' classes={{outlined: classes.outlinedButton}} className={classes.root} onClick={handleAuthDialogOpen}>Login</Button>
        <AuthDialog errors={errors} resetPassword={resetPassword} passwordResetStatus={passwordResetStatus} signUpUser={signUpUser} signedUp={signedUp} message={message} open={dialogOpen} loading={loading} handleClose={handleAuthDialogClose} loginUser={loginUser}/>
        </>
    )
}

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({
        loggedIn: state.authReducer.loggedIn,
        loading: state.authReducer.loading,
        errors: state.authReducer.errors,
        message: state.authReducer.message,
        signedUp: state.authReducer.signedUp,
        passwordResetStatus: state.authReducer.passwordReset,
    }))
    .setDispatch({
        loginUser,
        signUpUser,
        resetPassword,
    }, app.get('store'))
    .get$()
)(Auth)
