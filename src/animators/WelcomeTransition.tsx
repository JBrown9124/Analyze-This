import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useTransition, animated, config } from "react-spring";


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
  setIndex: (index: number) => void;
  index: number;
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
  index = 0,
  setIndex,
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


  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },

    config: { tension: 280, friction: 80 },
    trail: 1500,
  });

  useEffect(() => {
    /* when to allow timed animations for signedIn and !signedIn states*/
    /* timed animations are primarly slides without input required and are meant only for dispaly effect */
    if (!signedIn) {
      if (index < 2 || index === 5 || index === 8) {
        const t = setInterval(() => setIndex(index + 1), 6000);

        return () => clearTimeout(t);
      }
    } else if (signedIn) {
      if (index === 0 || index === 3) {
        const t = setInterval(() => setIndex(index + 1), 6000);
        return () => clearTimeout(t);
      }
    }
  }, [index]);
  useEffect(() => {
    if (isClicked) {
      /* increment index by 1 if continue is toggled */
      if (!signedIn) {
        if (index >= 2) {
          setIndex(index + 1);
        }
      } else if (signedIn) {
        if (index >= 0) {
          setIndex(index + 1);
        }
      }
    }
  }, [isClicked]);
  useEffect(() => {
    /* to skip timed animations when they  select back button*/
    if (isBackClicked) {
      if (!signedIn) {
        if (index === 2) {
          setIndex(index - 2);
        }
        if (index >= 3) {
          setIndex(index - 1);
        }
        if (index === 6) {
          setIndex(index - 1);
        }
      } else if (signedIn) {
        setIndex(index - 1);
      }
    }
  }, [isBackClicked]);

  return (
    <>
      {transitions((style, i) => (
        <animated.div
          className="welcomeTransitionContainer"
          style={{ ...style }}
        >
          {signedIn ? signedInSlides[i] : slides[i]}
          {/* {signedInSlides[4]} */}
        </animated.div>
      ))}
    </>
  );
}
