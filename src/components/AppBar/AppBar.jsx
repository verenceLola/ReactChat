import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";

import Auth from "../Auth/AuthComponent/AuthComponent";

import "./AppBar.css";

const useStyles = makeStyles(theme => ({
  appbarDefault: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AppNavBar = ({ theme: activeTheme, toggleDarkTheme }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={"appBar-container"}>
      <AppBar
        position="static"
        className={
          activeTheme === "dark" ? classes.appbarDark : classes.appbarDefault
        }>
        <Toolbar>
          <Typography variant="h6" className={"appbar-title"}>
            {" "}
            Quexl Chat{" "}
          </Typography>
          <Auth
            open={open}
            anchorEl={anchorEl}
            activeTheme={activeTheme}
            handleClose={handleClose}
            handleMenu={handleMenu}
            handleToogleTheme={toggleDarkTheme}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavBar;
