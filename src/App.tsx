import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import "./sections/Welcome.css";
import "./sections/FeelSafe.css";
import "./sections/Analysis.css";
import "./sections/GoSafe.css";
import "./sections/Hello.css";
import "./sections/Location.css";
import "./sections/Name.css";
import "./sections/SignIn.css";
import "./animators/WelcomeTransition.css";
import AnalysisResults from "./sections/AnalysisResults";
import axios from "axios";
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
import EnableCookies from "./components/EnableCookies";
import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Container from "react-bootstrap/Container";
interface Results {
  is_suicide: {
    suicide_probability: number;
    is_suicide: boolean;
    suicide_mentiond: number;
  };
  is_danger: {
    danger_probability: number;
    is_danger: boolean;
    danger_mentioned: number;
  };
  potential_cause: {};
}
function App() {
  const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies(["profileObj"]);
  const [isCookiesEnabled, setIsCookiesEnabled] = useState(false);
  const [sessionData, setSessionData] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [id, setId] = useState<string>("");
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [results, setResults] = useState<Results>({
    is_suicide: {
      suicide_probability: 0,
      is_suicide: false,
      suicide_mentiond: 0,
    },
    is_danger: { danger_probability: 0, is_danger: false, danger_mentioned: 0 },
    potential_cause: {},
  });
  const [toggleContinue, setToggleContinue] = useState<boolean>(false);
  const [toggleBack, setToggleBack] = useState<boolean>(false);

  const nameChange = (nameInput: string): void => {
    /*Tell welcome transition to go to the next section then set the name input to our name state */
    setToggleContinue(!toggleContinue);
    // if (isCookiesEnabled) {
      setSessionCookie(
        "profileObj",
        { ...sessionCookie.profileObj, name: nameInput },
        { path: "/" }
      );
   
      setSessionData({ ...sessionData, name: nameInput });
    
  };
  const locationChange = (locationInput: string): void => {
    setToggleContinue(!toggleContinue);
    // if (isCookiesEnabled) {
      setSessionCookie(
        "profileObj",
        { ...sessionCookie.profileObj, location: locationInput },
        { path: "/" }
      );
  
      setSessionData({ ...sessionData, location: locationInput });
    
  };
  const descriptionChange = (descriptionInput: string): void => {
    setToggleContinue(!toggleContinue);
    // if (isCookiesEnabled) {
      setSessionCookie(
        "profileObj",
        { ...sessionCookie.profileObj, description: descriptionInput },
        { path: "/" }
      );
    // } else {
      setSessionData({ ...sessionData, description: descriptionInput });
    
  };
  const slideChange = (index: number): void => {
    // if (isCookiesEnabled){
    setSessionCookie(
      "profileObj",
      { ...sessionCookie.profileObj, currentSlide: index },
      { path: "/" }
    );
  };
  const handleSignInData = (
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ("profileObj" in data) {
      setSessionCookie(
        "profileObj",
        { ...sessionCookie.profileObj, ...data.profileObj },
        { path: "/" }
      );

      // setId(data.id);
      setSignedIn(true);
    }
  };
  const handleLogOut = () => {
    // setSessionCookie("profileObj", delete sessionCookie['profileObj'], { path: "/" });
    removeSessionCookie("profileObj");
    setSignedIn(false);
    setId("");
    setSessionData({ name: "", location: "", description: "" });
  };
  // const handleCookieEnabled= (enabled:boolean) =>{
  //  setIsCookiesEnabled(enabled);
  //     setSessionCookie(
  //       "isCookieEnabled",
  //       enabled,
  //       { path: "/" }
  //     );
    
  // }

  /* if the signedIn state changes to false then set name, id states to relevant cookie data. Then set signedIn state to true. = They signed in.*/
  useEffect(() => {
    if (sessionCookie.profileObj !== null && sessionCookie.profileObj!== undefined) {
      setSessionData({ ...sessionData, name: sessionCookie.profileObj.name });
      setId(sessionCookie.profileObj.googleId);
      setSignedIn(true);
      // setIsCookiesEnabled(true);
    }
  }, [signedIn]);
  /* if the length of description changes we can say that the user has completed the entire form and we can send location, name, description data to our database. */
  useEffect(() => {
    const handleData = (): void => {
      axios
        .post("http://127.0.0.1:8000/helpapp/user", sessionData)
        .then((response: any) => {
          setResults(response.data.analysis_results);
        });
    };

    if (sessionData.description.length > 0) {
      handleData();
    }
  }, [sessionData.description]);

  return (
    <>
      <NavBar signedIn={signedIn} handleLogOut={handleLogOut} />
      <WelcomeTransition
        
        currentSlideCookie={sessionCookie?.profileObj?.currentSlide}
        currentSlide={(index) => slideChange(index)}
        // handleName={(props:string)=>setName(props)}
        isBackClicked={toggleBack}
        isClicked={toggleContinue}
        signedIn={signedIn}
        welcomeSlide={<Welcome />}
        goSafeSlide={<GoSafe />}
        feelSafeSlide={
          <FeelSafe
            clickBack={() => setToggleBack(!toggleBack)}
            clickContinue={() => setToggleContinue(!toggleContinue)}
          />
        }
        signInSlide={
          <SignIn
            signInData={(data) => handleSignInData(data)}
            clickBack={() => setToggleBack(!toggleBack)}
            clickContinue={() => setToggleContinue(!toggleContinue)}
          />
        }
        nameSlide={
          <Name
            clickBack={() => setToggleBack(!toggleBack)}
            handleName={(props) => nameChange(props)}
          />
        }
        helloSlide={<Hello name={sessionData.name} />}
        locationSlide={
          <Location
            handleLocation={(props) => locationChange(props)}
            clickBack={() => setToggleBack(!toggleBack)}
          />
        }
        analysisSlide={
          <Analysis
            clickBack={() => setToggleBack(!toggleBack)}
            handleDescription={(props) => descriptionChange(props)}
          />
        }
        analysisResultsSlide={<AnalysisResults results={results} />}
      />
      {/* <EnableCookies isCookiesEnabled={(props) => handleCookieEnabled(props)} /> */}
    </>
  );
}

export default App;
