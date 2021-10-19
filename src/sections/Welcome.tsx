import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import Name from "./Name"
import SignIn from "./SignIn";
export default function Welcome(props: any) {
  const [toggle, set] = useState(false);
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);

  return (
    <>
      <WelcomeTransition
        isClicked={toggle}
        child1={<FeelSafe click={() => set(!toggle)} />}
        child2={<SignIn click={() => set(!toggle)} />}
        child3={<Name click={() => set(!toggle)}/>}
      />

      {/* <Experiment  open={open}>
      
  
          <Typography  variant="h1" >

            Welcome


          </Typography>
      
    
          <Typography   variant="h1" >

            Please find a safe location


          </Typography>
        
        
          </Experiment> */}
    </>
  );
}
