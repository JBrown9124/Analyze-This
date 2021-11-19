import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";


import FeelSafeButton from "../components/FeelSafeButton";
interface Props {
  clickContinue: () => void;
  clickBack: () => void;
}

export default function FeelSafe({ clickContinue, clickBack }: Props) {
  return (
    <>
    
        <Typography variant="h3">
          Do you feel safe enough to continue?
        </Typography>


          <FeelSafeButton sx={{marginLeft:"1vw"}} onClick={() => clickContinue()} message="Yes" />

 
          <FeelSafeButton sx={{marginLeft:"1vw"}} onClick={() => clickBack()} message="Back" />

 
    </>
  );
}
