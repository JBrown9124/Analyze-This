import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function GoSafe() {
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);

  return (
    <>
      <Grid
          sx={{
            
            
        
            
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, 100%)",
          }}
          container
          direction="column"
      >
        <Typography variant="h1" >
          Please go to the safest location available to you before continuing.
        </Typography>
      </Grid>
    </>
  );
}
