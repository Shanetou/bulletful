import React, { Component, SyntheticEvent } from "react";
import TextField from "@material-ui/core/TextField";

type TitleFieldProps = {};

export const TitleField = (props: TitleFieldProps) => {
  return (
    <TextField
      value={""}
      // ref={(input) => { this.textFieldRef = input; }}
      onFocus={(_: SyntheticEvent) => {
        console.log("Focused root");
      }}
    />
  );
};
