import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import Intro from "../animators/Intro"
import styles from  "../animators/styles.module.css"
import Experiment from "../animators/TrailExperiment"
import Transition from "../animators/TransitionExperiment"
export default function Welcome(props: any) {

  const [introText, setIntroText] = useState(["Welcome", "Please find a safe location"])
const [open, set] = useState(true)
 



  return (
    <div className={styles.container} onClick={() => set(!open)}>
    <Transition></Transition>
    
    {/* <Experiment  open={open}>
      
  
          <Typography  variant="h1" >

            Welcome


          </Typography>
      
    
          <Typography   variant="h1" >

            Please find a safe location


          </Typography>
        
        
          </Experiment> */}
   

    </div>
  )
}