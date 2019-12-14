import {
  CircularProgress,
  Grid,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

import ConfirmEmailPaper from "../AuthForms/ConfirmEmailForm";
import LoginForm from "../AuthForms/LoginForm";
import ResetPasswordForm from "../AuthForms/ResetPasswordForm";
import SignupForm from "../AuthForms/SignupForm";

import "./AuthModal.css";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
}));
const AuthDialog = props => {
  const { open, handleClose, errors, message, signedUp } = props;
  const [activeTab, setActiveTab] = React.useState(0);
  const { loginUser, loading, signUpUser, resetPassword } = props;
  const [loginDetails, setLoginDetails] = React.useState({
    email: {
      value: "",
      error: {
        value: false,
        text: "",
      },
      isValid: false,
    },
    password: {
      value: "",
      error: false,
    },
  });
  const [signUpDetails, setSignupDetails] = React.useState({
    username: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    password: "",
    confirm_password: {
      value: "",
      error: false,
    },
  });
  const [resetPasswordDetails, setResetPasswordDetails] = React.useState({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    error: false,
  });
  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const handleOnSubmit = () => {
    const operation = {
      0: loginDetails => loginUser(loginDetails),
      1: signUpDetails => signUpUser(signUpDetails),
      2: resetPasswordDetails => resetPassword(resetPasswordDetails),
    }[activeTab];
    operation(
      {
        0: loginDetails,
        1: signUpDetails,
        2: resetPasswordDetails,
      }[activeTab],
    );
  };
  const classes = useStyles();

  const ActiveForm = {
    // map components to tab indices.
    0: (
      <LoginForm
        loginDetails={loginDetails}
        setLoginDetails={setLoginDetails}
        loading={loading}
        message={message.login}
        errors={errors.login}
      />
    ),
    1: (
      <SignupForm
        errors={errors.signup}
        message={message.signup}
        loading={loading}
        signUpDetails={signUpDetails}
        setSignupDetails={setSignupDetails}
      />
    ),
    2: (
      <ResetPasswordForm
        resetPasswordDetails={resetPasswordDetails}
        error={errors.reset.error}
        setResetPasswordDetails={setResetPasswordDetails}
        loading={loading}
        message={message.reset}
      />
    ),
  }[activeTab];
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        {signedUp ? (
          <ConfirmEmailPaper classes={classes} />
        ) : (
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.gridContainer}>
            <AuthFormTab
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              loading={loading}
            />
            <Grid item>
              <div className={"paper"} classes={{ rounded: "textPaper" }}>
                {ActiveForm}
              </div>
            </Grid>
            <SubmitFormButton
              loading={loading}
              activeTab={activeTab}
              handleOnSubmit={handleOnSubmit}
            />
          </Grid>
        )}
      </Dialog>
    </div>
  );
};

const AuthFormTab = ({ activeTab, handleTabChange, loading }) => (
  <Grid item>
    <div className={"paper"}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Login" disabled={loading} />
        <Tab label="SignUp" disabled={loading} />
        <Tab label="Reset Password" disabled={loading} />
      </Tabs>
    </div>
  </Grid>
);

const useSubmitStyles = makeStyles(theme => ({
  submitButton: {
    backgroundColor: theme.palette.secondary.dark,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const SubmitFormButton = ({ activeTab, loading, handleOnSubmit }) => {
  const classes = useSubmitStyles();
  return (
    <Grid item>
      <Button
        fullWidth
        variant="contained"
        classes={{ contained: classes.submitButton }}
        className="submitButton"
        onClick={handleOnSubmit}>
        {loading ? (
          <CircularProgress />
        ) : (
          {
            0: "Login",
            1: "SignUp",
            2: "Reset Password",
          }[activeTab]
        )}
      </Button>
    </Grid>
  );
};

export default AuthDialog;
