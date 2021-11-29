import { animated, useSpring } from "react-spring";
import React from "react";
interface Props{
    x:number | string;
    y:number | string;
    rotation:number;
    scale:number;
    children:React.ReactNode
    fromY:number,
  fromX:number,
}
const CertificateBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1.00,
  fromY = 0,
  fromX = 0,
  children,
}:Props) => {
  const [isBooped, setIsBooped] = React.useState(false);
  const style = useSpring({
 
    display: "inline-block",
    backfaceVisibility: "hidden",
    boxShadow: isBooped?"-1px 1px  #9147ff, -2px 2px  #9147ff, -3px 3px  #9147ff, -4px 4px  #9147ff, -5px 5px  #9147ff, -6px 6px  #9147ff, -7px 7px  #9147ff, -8px 8px  #9147ff":
    "-0px 0px  #9147ff, -0px 0px  #9147ff, -0px 0px  #9147ff, -0px 0px  #9147ff, -0px 0px  #9147ff, -0px 0px  #9147ff, -0px 0px  #9147ff, -0px 0px  #9147ff",
    
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         
         scale(1)`,
   
  

    config: { mass: .10, tension: 399, friction: 0, clamp:true },
  });
 
  const trigger = () => {
    setIsBooped(true);
  };
  const triggerLeave = () => {
    setIsBooped(false);
  };
  return (
    <animated.div
      onMouseEnter={trigger}
      onMouseLeave={triggerLeave}
      style={style as any}
    >
      {children}
    </animated.div>
  );
};

export default CertificateBoop;
