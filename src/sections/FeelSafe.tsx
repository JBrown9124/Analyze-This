import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";

import Container from "react-bootstrap/Container"
import FeelSafeButton from "../components/FeelSafeButton"
export default function FeelSafe(props: any) {

const [clicked, setClicked] = useState(false)





  return (
    <>
     
     <Container className="feelSafeContainer">
          <Typography variant="h3">
            Do you feel safe enough to continue?
          </Typography>

          <div className="feelSafeButton">
            <FeelSafeButton onClick={() => props.click()} />
          </div>
        </Container>


    </>
  )
}