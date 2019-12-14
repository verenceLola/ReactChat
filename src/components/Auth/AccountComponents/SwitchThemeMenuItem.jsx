import React from "react";
import {
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

const SwitchThemeMenuItem = ({ activeTheme, handleToogleTheme }) => (
  <MenuItem>
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={activeTheme}
            onChange={handleToogleTheme}
            size="small"
          />
        }
        labelPlacement="start"
        label="Dark Theme"
      />
    </FormGroup>
  </MenuItem>
);

export default SwitchThemeMenuItem;
