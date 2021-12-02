import { animated, useSpring } from "react-spring";
import React from "react";
interface Props {
  x?: number | string;
  y?: number | string;
  rotation?: number;
  scale?: number;
  children: React.ReactNode;
  fromY?: number;
  fromX?: number;
  width?: string;
  randomColor?: string | null;
}
const CoverBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1.0,
  fromY = 0,
  fromX = 0,
  randomColor,
  width,
  children,
}: Props) => {
  const [isBooped, setIsBooped] = React.useState(false);

  const style = useSpring({
    width: width,
    display: "inline-block",
    backfaceVisibility: "hidden",
    boxShadow: isBooped
      ? ` rgb(187, 181, 195) 0px 4px `
      : ` rgb(187, 181, 195) 0px 0px`,

    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         
         scale(1)`,

    config: { mass: 0.1, tension: 399, friction: 0, clamp: true },
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

export default CoverBoop;
