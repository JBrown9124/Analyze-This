import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useTransition, animated, config } from "react-spring";
import Typography from "@mui/material/Typography";
import Welcome from "../sections/Welcome";
import Container from "react-bootstrap/Container";
import ReactDOM from "react-dom";




interface Props {
  welcomeSlide: ReactNode;
  goSafeSlide: ReactNode;
  feelSafeSlide: ReactNode;
  signInSlide: ReactNode;
  nameSlide: ReactNode;
  helloSlide: ReactNode;
  locationSlide: ReactNode;
  analysisSlide: ReactNode;
  isClicked: boolean;
}

export default function WelcomeTransition({
  welcomeSlide,
  goSafeSlide,
  feelSafeSlide,
  signInSlide,
  nameSlide,
  helloSlide,
  locationSlide,
  analysisSlide,
  isClicked = false,
 
}: Props) {
  const slides: Array<ReactNode> = [
    welcomeSlide,
    goSafeSlide,
    feelSafeSlide,
  signInSlide,
  nameSlide,
  helloSlide,
  locationSlide,
  analysisSlide
  ];

  const [index, set] = useState(0);
  const [clicked, setClicked] = useState(false);
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },

    config: config.molasses,
    trail: 1500,
  });
  // useEffect(() => {
  //     if (index < 2) {
  //         const t = setInterval(() => set(state => (state + 1)), 6000)
  //         return () => clearTimeout(t)
  //     }
  // }, [index])
  useEffect(() => {
    if (index < 2 || index === 5) {
      const t = setInterval(() => set((state) => state + 1), 6000);
      return () => clearTimeout(t);
    }
  }, [index]);
  useEffect(() => {
    if (index>=2){
      set((state) => state + 1);
    
  }}, [isClicked]);

  return (
    
  <>
      {transitions((style, i) => (
        <animated.div className="welcomeTransitionContainer" style={{ ...style }}>
          
            {slides[i]}
         
        </animated.div>
      ))}
    </>
   
  );
}
