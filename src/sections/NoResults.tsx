import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { ResultsProps } from "../models/Results";
import Facilities from "../components/AnalysisResults/Facilities";
import Analyzing from "./Analyzing";
import Grid from "@mui/material/Grid";

export default function NoResults() {
  return (
    <>
      <Grid
        container
        sx={{
          position: "absolute",
          marginTop: "50px",
          flexGrow: 1,
          width: "90%",
          justifyContent: "center",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 0%)",
        }}
        spacing={2}
      >
        <Grid item>
          <Typography variant="h2" sx={{ padding: "30px" }}>
            No Results Found!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
