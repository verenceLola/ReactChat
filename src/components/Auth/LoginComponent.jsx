import React from "react";
import { Button, makeStyles } from "@material-ui/core";

import AuthDialog from "./AuthModal/AuthModal";

const useStyles = makeStyles(theme => ({
  outlinedButton: {
    borderColor: theme.palette.secondary.main,
  },
}));
const LoginComponent = props => {
  const classes = useStyles();
  return (
    <>
      <Button
        variant="outlined"
        classes={{ outlined: classes.outlinedButton }}
        className={"login-button"}
        onClick={props.handleAuthDialogOpen}>
        Login
      </Button>
      <AuthDialog {...props} />
    </>
  );
};

export default LoginComponent;
