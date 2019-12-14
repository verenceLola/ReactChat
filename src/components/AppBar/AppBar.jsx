import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Auth from '../Auth/Auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary.main
  },
  appbarDark: {
    backgroundColor: theme.palette.background.default
  },
  appbarDefault: {
    backgroundColor: theme.palette.primary.main
  }
}));

const AppNavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {theme: activeTheme, activateDarkTheme, deactivateDarkTheme} = props
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToogleTheme = () => {
    activeTheme === 'dark' ? deactivateDarkTheme() : activateDarkTheme()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={activeTheme === 'dark' ? classes.appbarDark : classes.appbarDefault}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Quexl Chat
          </Typography>
          <Auth open={open} anchorEl={anchorEl} activeTheme={activeTheme} handleClose={handleClose} handleMenu={handleMenu} handleToogleTheme={handleToogleTheme}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavBar;
