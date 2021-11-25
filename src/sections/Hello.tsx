import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface Props {
  name: string;
}
export default function Hello({ name }: Props) {
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);

  return (
    <>
      <Grid
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
        container
        direction="column"
      >
        <Typography variant="h1">Hello {name}</Typography>
      </Grid>
    </>
  );
}
