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

import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Container from "react-bootstrap/Container";
function App() {
  const [sessionCookie, setSessionCookie] = useCookies(['profileObj']);

  const [sessionData, setSessionData] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [id, setId] = useState<string>("");
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState({});
  const [toggleContinue, setToggleContinue] = useState<boolean>(false);
  const [toggleBack, setToggleBack] = useState(false);
  
  
  const nameChange = (nameInput: string): void => {
    /*Tell welcome transition to go to the next section then set the name input to our name state */
    setToggleContinue(!toggleContinue);
    setSessionCookie("profileObj", {...sessionCookie.profileObj,name:nameInput}, { path: "/" });

    setSessionData({ ...sessionData, name: nameInput });
  };
  const locationChange = (locationInput: string): void => {
    setToggleContinue(!toggleContinue);
    setSessionCookie("profileObj", {...sessionCookie.profileObj,location: locationInput}, { path: "/" });

    setSessionData({ ...sessionData, location: locationInput });
  };
  const descriptionChange = (descriptionInput: string): void => {
    setToggleContinue(!toggleContinue);
    setSessionCookie("profileObj", {...sessionCookie.profileObj,description:descriptionInput}, { path: "/" });

    setSessionData({ ...sessionData, description: descriptionInput });
  };
  const slideChange = (index:number):void => {
    setSessionCookie("profileObj", {...sessionCookie.profileObj,currentSlide:index}, {path:"/"});
    


  }
  const handleSignInData = (
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ("profileObj" in data) {
      setSessionCookie("profileObj", {...sessionCookie.profileObj,...data.profileObj}, { path: "/" });
      
      // setId(data.id);
      setSignedIn(true);
    }
  };
  const handleLogOut = () => {
    // setSessionCookie("profileObj", delete sessionCookie['profileObj'], { path: "/" });
    delete sessionCookie['profileObj']
    setSignedIn(false);
    setId("")
    setSessionData({ name: "", location: "", description: "" });
  };
  
  
  
  /* if the signedInCookie data changes then set name, id states to relevant cookie data. Then set signedIn state to true. = They signed in.*/
  useEffect(() => {
    if (sessionCookie.profileObj !== undefined ) {
      setSessionData({ ...sessionData, name: sessionCookie.profileObj.name });
      setId(sessionCookie.profileObj.googleId);
     setSignedIn(true)
    }
  }, [signedIn]);
  /* if the length of description changes we can say that the user has completed the entire form and we can send location, name, description data to our database. */
  useEffect(() => {
    const handleData = (): void => {
      axios
        .post("http://127.0.0.1:8000/helpapp/user", sessionData)
        .then((response) => {
          setAnalysisResults(response);
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
        currentSlide={(index)=>slideChange(index)}
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
      />
    </>
  );
}

export default App;
