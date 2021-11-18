import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { ResultsProps } from "../models/Results";
import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name";
import SignIn from "./SignIn";
import Resources from "../components/Resources";
interface Props {
  results: ResultsProps;
}
export default function AnalysisResults({ results }: Props) {
  const { analysisResults, description, resources } = results;
  const { is_danger, is_suicide, potential_causes } = analysisResults;
  return (
    <>
      <Container>
      <Typography variant="h1">
          Results
        </Typography>
        <Typography variant="h1">
          {(is_suicide.suicide_probability*100)+'%'}
      
        </Typography>
        <Resources resources={resources} />
      </Container>
    </>
  );
}
