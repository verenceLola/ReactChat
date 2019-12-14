import { FormControl, FormHelperText, TextField } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

import { validateEmail } from "../../../utils/email";
import formStyle from "../../../utils/formStyles";

import "./AuthForm.css";

const LoginForm = ({
  message,
  loginDetails,
  setLoginDetails,
  errors,
  loading,
}) => {
  const classes = formStyle();
  const handleLoginDetails = prop => event => {
    setLoginDetails({
      ...loginDetails,
      [prop]: {
        ...loginDetails[prop],
        value: event.target.value,
        isValid: validateEmail(loginDetails.email.value),
      },
    });
  };
  return (
    <>
      <FormControl fullWidth>
        <FormHelperText className={clsx(classes.helperText)}>
          {message}
        </FormHelperText>
        <TextField
          helperText={errors.email}
          disabled={loading}
          value={loginDetails.email.value}
          error={errors.email !== undefined}
          onChange={handleLoginDetails("email")}
          placeholder="example@email.com"
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          label="Email Address"
        />
        <TextField
          helperText={errors.password}
          error={errors.password !== undefined}
          disabled={loading}
          value={loginDetails.password.value}
          onChange={handleLoginDetails("password")}
          placeholder="*************"
          type="password"
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          label="Password"
        />
      </FormControl>
    </>
  );
};

export default LoginForm;
