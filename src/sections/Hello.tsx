import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";


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
 
        <Typography variant="h1">Hello {name}</Typography>

    </>
  );
}
