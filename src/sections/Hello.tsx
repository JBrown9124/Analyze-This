import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name";
import SignIn from "./SignIn";

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
      <Typography sx={{ position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 300%)",}}variant="h1">Hello {name}</Typography>
    </>
  );
}
