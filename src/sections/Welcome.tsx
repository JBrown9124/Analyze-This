import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
import WelcomeTransition from "../animators/WelcomeTransition";
import FeelSafe from "./FeelSafe";
import SignIn from "./SignIn"
export default function Welcome(props: any) {
  const [clicked, setClicked] = useState(false);
  const [introText, setIntroText] = useState([
    "Welcome",
    "Please find a safe location",
  ]);
  const [open, set] = useState(true);

  return (
    <>
      <WelcomeTransition isClicked={clicked} child1={<FeelSafe click={()=>setClicked(true)}/>} child2={<SignIn/>} />
       
     
      

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
