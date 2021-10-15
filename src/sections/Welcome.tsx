import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Intro from "../animators/Intro"
export default function Welcome(props:any) {

const [introText, setIntroText] = useState(["Welcome", "Please find a safe location"])





    return(
        <div>
            {introText.map(text=>(
              <Intro isVisible={true} delay={150} fromY={-200} x={0} y={0} fromX={0} rotation={0} scale={1} fromScale={1} >
        <Typography sx={{justifyContent: 'center', textAlign: 'center', marginTop:"18vw"}} variant="h1">
         
           {text}
       

        </Typography>
        </Intro>
      ))}
        </div>
    )
}