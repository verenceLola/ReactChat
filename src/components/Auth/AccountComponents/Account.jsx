import { IconButton, Menu } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";

import LogoutMenuItem from "./LogoutMenuItem";
import SwitchThemeMenuItem from "./SwitchThemeMenuItem";

const Account = ({
  handleMenu,
  logoutUser,
  handleClose,
  anchorEl,
  handleToogleTheme,
  activeTheme,
  open,
}) => (
  <div>
    <IconButton onClick={handleMenu} color="inherit">
      <AccountCircle fontSize="large" />
    </IconButton>
    <AccountMenu
      handleToogleTheme={handleToogleTheme}
      activeTheme={activeTheme}
      open={open}
      handleClose={handleClose}
      anchorEl={anchorEl}
      logoutUser={logoutUser}
    />
  </div>
);

const AccountMenu = ({
  activeTheme,
  logoutUser,
  anchorEl,
  open,
  handleToogleTheme,
  handleClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleClose}>
      <LogoutMenuItem handleClose={handleClose} logoutUser={logoutUser} />
      <SwitchThemeMenuItem
        activeTheme={activeTheme}
        handleToogleTheme={handleToogleTheme}
      />
    </Menu>
  );
};

export default Account;
