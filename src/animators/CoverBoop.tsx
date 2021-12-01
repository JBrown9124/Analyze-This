import { animated, useSpring } from "react-spring";
import React from "react";
interface Props{
    x?:number | string;
    y?:number | string;
    rotation?:number;
    scale?:number;
    children:React.ReactNode
    fromY?:number,
  fromX?:number,
  randomColor?:string|null
}
const CertificateBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1.00,
  fromY = 0,
  fromX = 0,
  randomColor,
  children,
}:Props) => {
  const [isBooped, setIsBooped] = React.useState(false);
  const safeRandomColor = randomColor===undefined?"green":randomColor
  const style = useSpring({
    
    display: "inline-block",
    backfaceVisibility: "hidden",
    boxShadow: isBooped?`-1px 1px  ${safeRandomColor}, -2px 2px  ${safeRandomColor}, -3px 3px  ${safeRandomColor}, -4px 4px  ${safeRandomColor}, -5px 5px  ${safeRandomColor}, -6px 6px  ${safeRandomColor}, -7px 7px  ${safeRandomColor}, -8px 8px  ${safeRandomColor}`:
    `-0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}, -0px 0px  ${safeRandomColor}`,
    
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
