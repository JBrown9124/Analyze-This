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

        <Typography variant="h3">
          To the best of your ability, please describe to us your current
          situation. This is only for us to get a clear understanding of what
          you are here for and for us to help you find the most relevant
          services in your vacinity.
        </Typography>

        <TextField
          multiline={true}
          autoComplete="off"
          sx={{ width: "50%", marginTop: "10vw" }}
          rows={5}
          variant='outlined'
          id="custom-css-outlined-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
  
          <FeelSafeButton        sx={{marginLeft:"1vw"}}onClick={() => clickBack()} message={"Back"} />
          <FeelSafeButton        sx={{marginLeft:"1vw"}}onClick={() => handleSubmit()} message={"Continue"} />
      
        </div>
    
    </>
  );
}
