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
import ReactDOM from "react-dom";




interface Props {
  child1: ReactNode;
  child2: ReactNode;
  child3: ReactNode;
  child4: ReactNode;
  isClicked: boolean;
}

export default function WelcomeTransition({
  child1,
  child2,
  child3,
  child4,
  isClicked = false,
}: Props) {
  const slides: any = [
    "Welcome",
    "Please go to the safest location available to you before continuing",
    child1,
    child2,
    child3,
    child4,
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
    if (index < 2) {
      const t = setInterval(() => set((state) => state + 1), 6000);
      return () => clearTimeout(t);
    }
  }, [index]);
  useEffect(() => {
    if (index>=2){
      set((state) => state + 1);
    
  }}, [isClicked]);

  return (
    <div>
      {transitions((style, i) => (
        <animated.div style={{ ...style }}>
          <Typography className="text-container" variant="h1">
            {slides[i]}
          </Typography>
        </animated.div>
      ))}
    </div>
  );
}
