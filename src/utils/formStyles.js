import { makeStyles } from "@material-ui/core";

const formStyle = makeStyles(theme => ({
  helperText: {
    color: theme.palette.error.dark,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSize,
  },
  formInputs: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}));

export default formStyle;
