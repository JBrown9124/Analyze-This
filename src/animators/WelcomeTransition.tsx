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
  analyzingSlide: ReactNode;
  analysisResultsSlide: ReactNode;
  isClicked: boolean;
  isBackClicked: boolean;
  signedIn: boolean;

  currentSlide: (slide: number) => void;
  currentSlideCookie: number;
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
  analyzingSlide,
  analysisResultsSlide,
  isClicked = false,
  isBackClicked = false,
  signedIn = false,
  currentSlide,
  currentSlideCookie,
}: Props) {
  const slides: Array<ReactNode> = [
    welcomeSlide,
    goSafeSlide,
    feelSafeSlide,
    signInSlide,
    nameSlide,
    helloSlide,
    locationSlide,
    analysisSlide,
    analyzingSlide,
    analysisResultsSlide,
  ];
  const signedInSlides: Array<ReactNode> = [
    helloSlide,

    locationSlide,
    analysisSlide,
    analyzingSlide,
    analysisResultsSlide,
  ];

  const [index, set] = useState(0);
  const [isCurrentSlide, setIsCurrentSlide] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },

    config: { tension: 280, friction: 80 },
    trail: 1500,
  });
  // useEffect(() => {
  //     if (index < 2) {
  //         const t = setInterval(() => set(state => (state + 1)), 6000)
  //         return () => clearTimeout(t)
  //     }
  // }, [index])

  // useEffect(() => {
  //   /* when to allow timed animations for signedIn and !signedIn states*/
  //   if (!signedIn) {
  //     if (index < 2 || index === 5) {
  //       const t = setInterval(() => set((state) => state + 1), 6000);

  //       return () => clearTimeout(t);
  //     }
  //   } else if (signedIn) {
  //     if (index === 0) {
  //       const t = setInterval(() => set((state) => state + 1), 6000);
  //       return () => clearTimeout(t);
  //     }
  //   }
  // }, [index]);
  useEffect(() => {
    /* increment index by 1 if continue is toggled */
    if (!signedIn) {
      if (index >= 2) {
        set((state) => state + 1);
      }
    } else if (signedIn) {
      if (index >= 0) {
        set((state) => state + 1);
      }
    }
  }, [isClicked]);
  useEffect(() => {
    /* to skip timed animations when they  select back button*/
    if (!signedIn) {
      if (index === 2) {
        set((state) => state - 2);
      }
      if (index >= 3) {
        set((state) => state - 1);
      }
      if (index === 6) {
        set((state) => state - 1);
      }
    } else if (signedIn) {
      set((state) => state - 1);
    }
  }, [isBackClicked]);
  /* if they sign in or sign out while using the app we set bring them to specific slide*/

  useEffect(() => {
    // if (signedIn){
    //   set(0);
    // }
    // else if (!signedIn ){
    //   set(0)
    // }
    // const t = setInterval(() => setIsSignedIn(signedIn), 1500);
    //   return () => clearTimeout(t);

    function handleLogInLogOut(): Promise<boolean> {
      if (signedIn) {
        set(0);
      } else if (!signedIn) {
        set(0);
      }
      return new Promise((resolve) => {
        const t = setInterval(() => {
          resolve(signedIn);
        }, 1500);
        return () => clearTimeout(t);
      });
    }

    async function handleSlidesChange() {
      await handleLogInLogOut().then((response:boolean) => setIsSignedIn(response));
    }

    handleSlidesChange();
  }, [signedIn]);
  return (
    <>
      {transitions((style, i) => (
        <animated.div
          className="welcomeTransitionContainer"
          style={{ ...style }}
        >
          {/* {isSignedIn ? signedInSlides[i] : slides[i]} */}
          {signedInSlides[3]}
        </animated.div>
      ))}
    </>
  );
}
