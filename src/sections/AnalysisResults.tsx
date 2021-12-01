import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { ResultsProps } from "../models/Results";
import Facilities from "../components/AnalysisResults/Facilities";
import Analyzing from "./Analyzing";
import Grid from "@mui/material/Grid";
import NoResults from "./NoResults";
import Resources from "../components/AnalysisResults/Resources/Resources";
interface Props {
  results: ResultsProps;
}
export default function AnalysisResults({ results }: Props) {
  const { analysisResults, description, resources, facilities } = results;
  
  return (
    <>
      {facilities?.length >= 1 && resources.length >= 1 ? (
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
          <Grid xs={6} item>
            <Grid item>
              <Typography variant="h2" sx={{ padding: "30px" }}>
                Some resources we found...
              </Typography>
            </Grid>
            <Resources resources={resources} />
          </Grid>

          <Grid item xs={6}>
            <Grid item>
              <Typography variant="h2" sx={{ padding: "30px" }}>
                Some help near you...
              </Typography>
            </Grid>
            <Facilities facilities={facilities} />
          </Grid>
        </Grid>
      ) : (
        <>
          <NoResults />
        </>
      )}
    </>
  );
}
