import { FormControl, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import React from "react";

import { validateEmail } from "../../../utils/email";
import formStyle from "../../../utils/formStyles";

import "./AuthForm.css";

const ResetPasswordForm = ({
  loading,
  setResetPasswordDetails,
  resetPasswordDetails,
  message,
  error,
}) => {
  const handleResetPasswordChange = prop => event => {
    const value = event.target.value;
    setResetPasswordDetails({
      ...resetPasswordDetails,
      [prop]: {
        ...resetPasswordDetails[prop],
        value: value,
        isValid: validateEmail(resetPasswordDetails.email.value),
      },
    });
  };
  const classes = formStyle();
  return (
    <>
      <FormControl fullWidth>
        <FormHelperText className={clsx(classes.helperText, "helper-text")}>
          {message}
        </FormHelperText>
        <TextField
          helperText={error}
          error={error !== undefined}
          disabled={loading}
          value={resetPasswordDetails.email.value}
          onChange={handleResetPasswordChange("email")}
          className={clsx(classes.formInputs, "form-inputs")}
          fullWidth
          variant="outlined"
          label="Email Address"
        />
      </FormControl>
    </>
  );
};

export default ResetPasswordForm;
