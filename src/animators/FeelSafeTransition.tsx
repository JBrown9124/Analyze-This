import { animated, useSpring, useTransition } from "react-spring";
import React, { useEffect, FC,useState, ReactNode } from "react";
import Typography from "@mui/material/Typography";
interface Props {
 isClicked: boolean,
 delay:number,
 x:number,
 y:number,
 fromY:number,
 fromX:number,
 rotation:number,
 scale:number,
 fromScale:number,
 children:ReactNode
}

const  FeelSafeTransition=({
  
  isClicked= false,
  delay= 0,
  x= 0,
  y = 0,
  fromY = 0,
  fromX = 0,
  rotation = 0,
  scale = 1.0,
  fromScale = 1,
  children,
  
}:Props) =>{
  
  const [fade, setFade] = useState(false);
  
  
  const style = useSpring({
    from: {
      transform: `translate(${fromX}px, ${fromY}px)
      rotate(0deg)
      
      scale(${fromScale})`,
      opacity: 0,
    },
    
    transform: isClicked===false ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`: `translate(${fromX}px, ${fromY}px)
         rotate(0deg)
         
         scale(${fromScale})`,
      opacity: isClicked===false ? 1:0,
   
    delay: delay,
  
    //   opacity: 0,

    // },
    
   
   
    config: { mass: 1, tension: 280, friction: 180}
    ,
    //   onRest: () => set(!flip),
  });

  return <animated.div style={style}>{children}
  
  </animated.div>;
}
export default FeelSafeTransition
// export default FadeIn;
// import { animated, useSpring, useSpringRef, useTransition, useChain } from "react-spring";
// import React, { useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// function FadeIn({
//   isVisible = false,
//   delay = 0,
//   x = 0,
//   y = 0,
//   fromY = 0,
//   fromX = 0,
//   rotation = 0,
//   scale = 1.0,
//   fromScale = 1,
//   children,
// }) {
//   const springRef = useSpringRef()
//   const props = useSpring({
//     from: {
//       transform: `translate(${fromX}px, ${fromY}px)
//       rotate(0deg)
      
//       scale(${fromScale})`,
//       opacity: 0,
//     },

//     to: {
//       transform: `translate(${x}px, ${y}px)
//          rotate(${rotation}deg)
//          scale(${scale})`,
//       opacity: 1,
//     },
   
//     delay: delay,

//     //   opacity: 0,

//     // },

//     config: { mass: 1, tension: 280, friction: 180}
//     ,
//     //   onRest: () => set(!flip),
//   });
// const transitionRef= useSpringRef()
// const transitions = useTransition({
//   from: {
//     transform: `translate(${fromX}px, ${fromY}px)
//     rotate(0deg)
    
//     scale(${fromScale})`,
//     opacity: 0,
//   },

//   to: {
//     transform: `translate(${x}px, ${y}px)
//        rotate(${rotation}deg)
//        scale(${scale})`,
//     opacity: 1,
//   },
 
//   delay: delay,

//   //   opacity: 0,

//   // },

//   config: { mass: 1, tension: 280, friction: 180}
//   ,
//   //   onRest: () => set(!flip),

// })
// useChain([springRef, transitionRef])
//   return <animated.div style={props}>
//     {children}
  
//   </animated.div>;
// }

// export default FadeIn;
