import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";


import FeelSafeButton from "../components/FeelSafeButton";


import TextField, { TextFieldProps } from "@mui/material/TextField";

import Grid from "@mui/material/Grid";

interface Props {
  handleDescription: (props: string) => void;
  clickBack: () => void;
}

export default function Analysis({ handleDescription, clickBack }: Props) {
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (): void => {
    
    if (description.length > 0){
      setIsError(false);
    handleDescription(description);
  }
    else{
      setIsError(true);
    }
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
          transform: "translate(-50%, 90%)",
        }}
        direction="column"
      >
        <Typography variant="h3"  sx={{ borderRadius: "5px", padding: "15px"}}>
          What's on your mind? 
        </Typography>
        <Typography variant="body2" sx={{ borderRadius: "5px", padding: "15px"}}> For the results to be as accurate as possible, please no typos!</Typography>

        <TextField
        placeholder="I am feeling really tense. Sometimes I feel like I just want to die. I really need a smoke"
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
          error={isError}
          // helperText={isError && "Empty field"}
          variant="outlined"
          id="custom-css-outlined-input"
          value={description}
          onClick={()=>setIsError(false)}
          onChange={(e) => setDescription(e.target.value) }
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
