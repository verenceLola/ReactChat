import { Grid } from "@material-ui/core";
import React from "react";

import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";

import "./Participants.css";

const Participants = ({ members, email: currentUserEmail }) =>
  members
    .filter(member => member.email !== currentUserEmail)
    .map((member, index) => (
      <Grid item key={index} className={"chat-content-participantAvatar"}>
        <ProfileAvatar loadProfile user={member} />
      </Grid>
    ));

export default Participants;
