import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name";
import SignIn from "./SignIn";
export default function Welcome(props: any) {
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);

  return (
    <>
      <Container className="welcomeContainer">
        <Typography variant="h1">Welcome</Typography>
      </Container>
    </>
  );
}
