import React from 'react'
import { IconButton, Badge } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem, FormGroup, FormControlLabel, Switch, } from '@material-ui/core';
import { observe, streamProps } from 'frint-react';
import { loginUser } from '../../actions/Auth/auth';

const Auth = props => {
    const {handleToogleTheme, handleMenu, handleClose, open, anchorEl, activeTheme, loggedIn} = props
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
    ) : <p>LOGIN</p>
}

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({loggedIn: state.authReducer.loggedIn}))
    .setDispatch({
        loginUser,
    }, app.get('store'))
    .get$()
)(Auth)
