import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface Props {
  name: string;
}
export default function Hello({ name }: Props) {
  return (
    <>
      <Grid
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 270%)",
        }}
        container
        direction="column"
      >
        <Typography variant="h1">Hello {name}</Typography>
      </Grid>
    </>
  );
}
