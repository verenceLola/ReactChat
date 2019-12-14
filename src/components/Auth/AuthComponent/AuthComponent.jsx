import { observe, streamProps } from "frint-react";
import React from "react";

import {
  loginUser,
  logoutUser,
  resetPassword,
  signUpUser,
} from "../../../actions/Auth/auth";
import AccountComponent from "../AccountComponents/AccountComponent";
import LoginComponent from "../LoginComponent";

import "./AuthComponent.css";

const Auth = props => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleAuthDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleAuthDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {props.loggedIn ? (
        <AccountComponent {...props} unreadCount={4} />
      ) : (
        <LoginComponent
          {...props}
          handleClose={handleAuthDialogClose}
          handleAuthDialogOpen={handleAuthDialogOpen}
          open={dialogOpen}
        />
      )}
    </>
  );
};

export default observe(app =>
  streamProps()
    .set(app.get("store").getState$(), state => ({
      loggedIn: state.authReducer.loggedIn,
      loading: state.authReducer.loading,
      errors: state.authReducer.errors,
      message: state.authReducer.message,
      signedUp: state.authReducer.signedUp,
      passwordResetStatus: state.authReducer.passwordReset,
    }))
    .setDispatch(
      {
        loginUser,
        signUpUser,
        logoutUser,
        resetPassword,
      },
      app.get("store"),
    )
    .get$(),
)(Auth);
