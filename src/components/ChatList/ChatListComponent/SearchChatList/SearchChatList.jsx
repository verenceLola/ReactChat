import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React from "react";

import "./SearchChatList.css";

const SearchChatField = props => {
  return (
    <div className={"search-chat-list-paper"}>
      <TextField
        fullWidth
        variant="outlined"
        className={clsx("search-chat-list-search-field")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Search chat..."
      />
    </div>
  );
};

export default SearchChatField;
