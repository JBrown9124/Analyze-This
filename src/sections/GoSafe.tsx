import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name";
import SignIn from "./SignIn";
export default function GoSafe(props: any) {
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);

  return (
    <>
      <Container className="goSafeContainer">
        <Typography variant="h1">
          Please go to the safest location available to you before continuing.
        </Typography>
      </Container>
    </>
  );
}
