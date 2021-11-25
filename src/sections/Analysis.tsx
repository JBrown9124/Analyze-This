import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";

import FeelSafeButton from "../components/FeelSafeButton";

import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { number } from "prop-types";
import Grid from "@mui/material/Grid";

interface Props {
  handleDescription: (props: string) => void;
  clickBack: () => void;
}

export default function Analysis({ handleDescription, clickBack }: Props) {
  const [description, setDescription] = useState("");

  const handleSubmit = (): void => {
    const descriptionData = {
      description: description,
    };
    handleDescription(description);
  };

  return (
    <>
      <Grid
        container
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          background: "white!important",
          borderRadius: "5px",
          width: "50%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 100%)",
        }}
        direction="column"
      >
        <Typography variant="h3"  sx={{ borderRadius: "5px", padding: "15px"}}>
          What would you like us to analyze for you today?
        </Typography>

        <TextField
          multiline={true}
          autoComplete="off"
          sx={{
            width: "90%",
            margin: "auto",
            justifyContent: "center",
            textAlign: "center",
            marginTop:"15px",
            marginBottom:"15px",
          }}
          rows={5}
          variant="outlined"
          id="custom-css-outlined-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Grid item sx={{ padding: "15px"}}>
          <FeelSafeButton
            sx=""
            onClick={() => clickBack()}
            message={"Back"}
          />
          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => handleSubmit()}
            message={"Analyze"}
          />
        </Grid>
      </Grid>
    </>
  );
}
