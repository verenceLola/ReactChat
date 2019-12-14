import { FormControlLabel, FormGroup, MenuItem } from "@material-ui/core";
import React from "react";

const LogoutMenuItem = React.forwardRef(({ handleClose, logoutUser }, ref) => {
  const handleLogout = () => {
    logoutUser();
    handleClose();
  };
  return (
    <MenuItem onClick={handleLogout}>
      <FormGroup>
        <FormControlLabel
          control={<p></p>}
          labelPlacement="start"
          label="Logout"
        />
      </FormGroup>
    </MenuItem>
  );
});

export default LogoutMenuItem;
