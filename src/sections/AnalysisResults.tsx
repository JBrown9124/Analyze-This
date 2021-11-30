import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { ResultsProps } from "../models/Results";
import Facilities from "../components/AnalysisResults/Facilities";
import Analyzing from "./Analyzing"
import Grid from "@mui/material/Grid";

import Resources from "../components/AnalysisResults/Resources/Resources";
interface Props {
  results: ResultsProps;
}
export default function AnalysisResults({ results }: Props) {
  const { analysisResults, description, resources, facilities } = results;
  const { is_danger, is_suicide, potential_causes } = analysisResults;
  return (
    <>
    {facilities.length>1?
      <Grid
        container
        sx={{ position: "absolute", marginTop: "50px", flexGrow: 1, width:"90%", justifyContent: "center", left: "50%",
        top: "50%",
        transform: "translate(-50%, 0%)",}}
        spacing={2}
      >
        <Grid xs={6} item>
          <Resources resources={resources} />
        </Grid>

        <Grid item xs={6}>
          <Facilities facilities={facilities} />
        </Grid>
      </Grid>:<><Analyzing/></>}
    </>
  );
}
