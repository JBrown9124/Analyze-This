import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import { Container, Row, Col } from 'react-bootstrap';
export default function FeelSafe(props: any) {

  const [introText, setIntroText] = useState(["Welcome", "Please find a safe location"])
const [open, set] = useState(true)
 



  return (
    <>
    <Container >
   <FeelSafeTransition isVisible={false} delay={14000} x={0} y={0} fromY={0} fromX={0} rotation={0} scale={1} fromScale={1}>
  <Typography className="feelSafeContainer" variant="h3">
Do you feel safe enough to continue?

  </Typography>
  </FeelSafeTransition>
  </Container>
    {/* <Experiment  open={open}>
      
  
          <Typography  variant="h1" >

            Welcome


          </Typography>
      
    
          <Typography   variant="h1" >

            Please find a safe location


          </Typography>
        
        
          </Experiment> */}
   

    </>
  )
}