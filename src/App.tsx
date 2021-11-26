import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import "./animators/WelcomeTransition.css";
import { ResultsProps } from "./models/Results";
import AnalysisResults from "./sections/AnalysisResults";
import axios, { AxiosResponse } from "axios";
import Welcome from "./sections/Welcome";
import GoSafe from "./sections/GoSafe";
import Hello from "./sections/Hello";
import WelcomeTransition from "./animators/WelcomeTransition";
import SignIn from "./sections/SignIn";
import Location from "./sections/Location";
import Name from "./sections/Name";
import FeelSafe from "./sections/FeelSafe";
import Analysis from "./sections/Analysis";
import NavBar from "./components/NavBar";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";
import Analyzing from "./sections/Analyzing";
import Grid from "@mui/material/Grid";

import theme from "./themes/theme";
import EnableCookies from "./components/EnableCookies";
import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

function App() {
  const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies([
    "profileObj",
  ]);
  const [fetchingResults, setFetchingResults] = useState(false);
 
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [results, setResults] = useState<ResultsProps>({
    resources: [{ name: "", url: "" }],
    facilities: [{}],
    analysisResults: {
      is_suicide: {
        suicide_probability: 0,
        is_suicide: false,
        suicide_mentiond: 0,
      },

      is_danger: {
        danger_probability: 0,
        is_danger: false,
        danger_mentioned: 0,
      },
      potential_causes: {},
    },
    description: "",
  });
  const [toggleContinue, setToggleContinue] = useState<boolean>(false);
  const [toggleBack, setToggleBack] = useState<boolean>(false);

  const nameChange = (nameInput: string): void => {
    /*Tell welcome transition to go to the next section then set the name input to our name state */

    setSessionCookie(
      "profileObj",
      { ...sessionCookie.profileObj, name: nameInput },
      { path: "/" }
    );
    handleContinue();
  };
  const locationChange = (locationInput: string): void => {
    setSessionCookie(
      "profileObj",
      { ...sessionCookie.profileObj, location: locationInput },
      { path: "/" }
    );
    handleContinue();
  };
  const descriptionChange = (descriptionInput: string): void => {
    handleContinue();

    setSessionCookie(
      "profileObj",
      { ...sessionCookie.profileObj, description: descriptionInput },
      { path: "/" }
    );
    setFetchingResults(true);
  };
  const indexChange = (indexValue: number): void => {
    setSessionCookie(
      "profileObj",
      { ...sessionCookie.profileObj, index: indexValue },
      { path: "/" }
    );
  };
  const handleSignInData = (
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in data) {
      setSessionCookie(
        "profileObj",
        {
          ...sessionCookie.profileObj,
          ...data.profileObj,
          index: 0,
          signedIn: true,
        },
        { path: "/" }
      );
    }
  };
  const handleLogOut = () => {
    removeSessionCookie("profileObj");
  };

  /* if the length of description changes we can say that the user has completed the entire form and we can send location, name, description data to our database. */
  useEffect(() => {
    if (sessionCookie.profileObj?.description !== undefined) {
      const reqBody = {
        description: sessionCookie?.profileObj?.description,
        location: sessionCookie?.profileObj?.location,
        name: sessionCookie?.profileObj?.name,
      };
      const analyzeData = async (body: Object) => {
        const { data } = await axios.post<ResultsProps>(
          "http://127.0.0.1:8000/helpapp/analyze",
          body
        );
        
        return data;
      };
      const storeData = async ()  => {
        const data = await analyzeData(reqBody);

        
       
        setResults(data);
        await setTimeout(()=>handleContinue(), 1500)
        
      };

      storeData();
      
    }
  }, [fetchingResults]);
  const handleBack = (): Promise<void> => {
    const backTrigger = async (): Promise<boolean> => {
      setToggleBack(true);
      return false;
    };
    const backUntrigger = async (): Promise<void> => {
      const data: boolean = await backTrigger();

      setToggleBack(data);
    };
    return backUntrigger();
  };
  const handleContinue = (): Promise<void> => {
    const continueTrigger = async (): Promise<boolean> => {
      setToggleContinue(true);
      return false;
    };
    const continueUntrigger = async (): Promise<void> => {
      const data: boolean = await continueTrigger();
      setToggleContinue(data);
    };
    return continueUntrigger();
  };
  // useEffect(() => {
  //   if  (sessionCookie?.profileObj?.googleId !== null &&
  //   sessionCookie?.profileObj?.googleId !== undefined){
  //     setIsSignedIn(true)
  //   }
  // },[isSignedIn])
  const splashScreen = () => {
    return (
      <Grid
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#009688",
        }}
        container
      ></Grid>
    );
  };
  return (
    <>
      <Grid
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#009688",
        }}
        container
      >
        <ThemeProvider theme={theme}>
          <NavBar
            signedIn={
              sessionCookie?.profileObj?.signedIn &&
              sessionCookie?.profileObj?.index >= 1
            }
            handleLogOut={handleLogOut}
          />

          <WelcomeTransition
            index={sessionCookie?.profileObj?.index}
            setIndex={(props) => indexChange(props)}
            // handleName={(props:string)=>setName(props)}
            isBackClicked={toggleBack}
            isClicked={toggleContinue}
            signedIn={sessionCookie?.profileObj?.signedIn}
            welcomeSlide={<Welcome />}
            goSafeSlide={<GoSafe />}
            feelSafeSlide={
              <FeelSafe
                clickBack={() => handleBack()}
                clickContinue={() => handleContinue()}
              />
            }
            signInSlide={
              <SignIn
                signInData={(data) => handleSignInData(data)}
                clickBack={() => handleBack()}
                clickContinue={() => handleContinue()}
              />
            }
            nameSlide={
              <Name
                clickBack={() => handleBack()}
                handleName={(props) => nameChange(props)}
              />
            }
            helloSlide={<Hello name={sessionCookie?.profileObj?.name} />}
            locationSlide={
              <Location
                handleLocation={(props) => locationChange(props)}
                clickBack={() => handleBack()}
              />
            }
            analysisSlide={
              <Analysis
                clickBack={() => handleBack()}
                handleDescription={(props) => descriptionChange(props)}
              />
            }
            analyzingSlide={<Analyzing fetchResults={fetchingResults} />}
            analysisResultsSlide={<AnalysisResults results={results} />}
          />
          {/* <EnableCookies isCookiesEnabled={(props) => handleCookieEnabled(props)} /> */}
        </ThemeProvider>
      </Grid>
    </>
  );
}

export default App;
