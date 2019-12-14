import React from "react";

import Account from "./Account";
import Notifications from "./Notifications";

const AccountComponent = ({
  unreadCount,
  logoutUser,
  handleClose,
  handleMenu,
  activeTheme,
  open,
  anchorEl,
  handleToogleTheme,
}) => (
  <>
    <Notifications unreadCount={unreadCount} />
    <Account
      handleMenu={handleMenu}
      open={open}
      activeTheme={activeTheme}
      handleClose={handleClose}
      anchorEl={anchorEl}
      logoutUser={logoutUser}
      handleToogleTheme={handleToogleTheme}
    />
  </>
);

export default AccountComponent;
