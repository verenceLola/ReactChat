import { Badge, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";

const Notifications = ({ unreadCount }) => (
  <IconButton color="inherit">
    <Badge badgeContent={unreadCount} color="secondary">
      <NotificationsIcon />
    </Badge>
  </IconButton>
);

export default Notifications;
