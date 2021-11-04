import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name";
import SignIn from "./SignIn";

interface Results {
  results: {
    is_suicide: {
      suicide_probability: number;
      is_suicide: boolean;
      suicide_mentiond: number;
    };
    is_danger: {
      danger_probability: number;
      is_danger: boolean;
      danger_mentioned: number;
    };
    potential_cause: {};
  };
}
export default function AnalysisResults({ results }: Results) {
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);

  return (
    <>
      <Container className="helloContainer">
        <Typography variant="h1">
          {results?.is_suicide?.suicide_probability}
          {results?.is_danger?.danger_probability}
        </Typography>
      </Container>
    </>
  );
}
