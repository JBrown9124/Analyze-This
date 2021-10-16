import React, { useState, useEffect } from "react";
import { useTransition, animated, config} from "react-spring";
import Typography from "@mui/material/Typography";

import ReactDOM from "react-dom";



// function Transition() {
//   const [toggle, set] = useState(true)
//   const [show, setShow] =useState(true)
//   const transitions = useTransition(toggle, {
//     from: { position: 'absolute', opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//     reset: toggle,
//     reverse:toggle,
//     delay: 200,
//     config: 	{ mass: 1, tension: 280, friction: 120, },
//     onRest: () => set(false),
//   })
//   useEffect(() => {
     
//    const t=   setTimeout(() => {
//         set(true)
//       }, 10000)
//     return ()=>{clearTimeout(t)}
//   }, [toggle])
  
//   return transitions(({ opacity }, item) =>
//     item ? (
//       <animated.div
//         style={{
//           position: 'absolute',
//           opacity: opacity.to({ range: [0.0,.5, 1.0], output: [0,.5 , 1] }),
//         }}>
//        <Typography  variant="h3" >

// Welcome


// </Typography>

//       </animated.div>
//     ) : (
//       <animated.div
//         style={{
//           position: 'absolute',
//           opacity: opacity.to({ range: [0.0,.5, 1.0], output: [1, 0] }),
//         }}>
     
//         <Typography   variant="h3" >

//         Please go to the safest location available to you before continuing.


// </Typography>
//       </animated.div>
//     )
//   )

// }

// export default Transition;
