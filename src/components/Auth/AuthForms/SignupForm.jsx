import { FormControl, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import React from "react";

import formStyle from "../../../utils/formStyles";

import "./AuthForm.css";

const SignupForm = ({
  errors,
  message,
  loading,
  signUpDetails,
  setSignupDetails,
}) => {
  const classes = formStyle();
  const handleSignUpDetails = prop => event => {
    setSignupDetails({
      ...signUpDetails,
      [prop]: { ...signUpDetails[prop], value: event.target.value },
    });
  };
  return (
    <>
      <FormControl fullWidth>
        <FormHelperText className={clsx(classes.helperText, "helper-text")}>
          {message}
        </FormHelperText>
        <TextField
          helperText={errors.email}
          error={errors.email !== undefined}
          disabled={loading}
          value={signUpDetails.email.value}
          onChange={handleSignUpDetails("email")}
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          label="Email Address"
        />
        <TextField
          helperText={errors.username}
          error={errors.username !== undefined}
          disabled={loading}
          value={signUpDetails.username.value}
          onChange={handleSignUpDetails("username")}
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          label="Username"
        />
        <TextField
          helperText={errors.password}
          error={errors.password !== undefined}
          disabled={loading}
          value={signUpDetails.password.value}
          onChange={handleSignUpDetails("password")}
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          type="password"
          label="Password"
        />
        <TextField
          disabled={loading}
          value={signUpDetails.confirm_password.value}
          onChange={handleSignUpDetails("confirm_password")}
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          type="password"
          label="Confirm Password"
        />
      </FormControl>
    </>
  );
};

export default SignupForm;
