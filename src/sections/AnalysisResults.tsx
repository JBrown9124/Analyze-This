import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { ResultsProps } from "../models/Results";
import Facilities from "../components/AnalysisResults/Facilities";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name";
import SignIn from "./SignIn";
import Grid from "@mui/material/Grid";

import Resources from "../components/AnalysisResults/Resources";
interface Props {
  results: ResultsProps;
}
export default function AnalysisResults({ results }: Props) {
  const { analysisResults, description, resources, facilities } = results;
  const { is_danger, is_suicide, potential_causes } = analysisResults;
  return (
    <>
     
      <Grid container sx={{marginTop:"50px"}}columns={16} spacing={2} >
        
        <Grid item xs={16}>
          <Typography variant="h1">Results</Typography>
        </Grid>
        <Grid
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
            background: "white!important",
            borderRadius: "5px",
            width: "50%",
            
          }}
          item
          xs={8}
        >
          <Resources resources={resources} />
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
            background: "white!important",
            borderRadius: "5px",
            width: "50%",
          }}
        >
          <Facilities facilities={facilities} />
        </Grid>
      </Grid>
    </>
  );
}
