import React from "react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const ConfirmEmailPaper = ({ classes }) => (
  <Grid
    container
    spacing={2}
    direction="column"
    className={classes.gridContainer}>
    <div className={"paper"} classes={{ rounded: "textPaper" }}>
      <h6>ACCOUNT CREATED SUCCESSFULLY</h6>
      <Button
        fullWidth
        variant="contained"
        classes={{ contained: classes.submitButton }}
        className="submitButton">
        ACTIVATE ACCOUNT
      </Button>
    </div>
  </Grid>
);

export default ConfirmEmailPaper;
