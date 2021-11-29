import { animated, useSpring } from "react-spring";
import React from "react";
interface Props {
  x: number;
  beforeColor: string;
  afterColor: string;
  y: number;
  rotation: number;
  scale: number;
  isBooped: boolean;
  children: React.ReactNode;
  
}
const IconBoop = ({
  x = 0,
  
  beforeColor = "#e2f1f8",
  afterColor = "rgba(87,188,144,1)",
  y = 0,
  rotation = 0,
  scale = 1,
  children,
  isBooped,
}: Props) => {
  const style = useSpring({
    display: "inline-block",
    backfaceVisibility: "hidden",
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,

    color: isBooped ? afterColor : beforeColor,
  });

  return <animated.div style={style as any}>{children}</animated.div>;
};

export default IconBoop;
