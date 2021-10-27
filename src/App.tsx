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

import Container from "react-bootstrap/Container";
function App() {
  const [name, setName] = useState("");
  const [conflict, setConflict] = useState("");
  const [location, setLocation] = useState({});
  const [description, setDescription] = useState("");
  const [analysisResults, setAnalysisResults] = useState({});
  const [toggleContinue, setToggleContinue] = useState(false);
  const [toggleBack, setToggleBack] = useState(false);
  const nameChange = (nameInput: string): void => {
    /*Tell welcome transition to go to the next section then set the name input to our name state */
    setToggleContinue(!toggleContinue);
    setName(nameInput);
  };
  const locationChange = (locationInput: string): void => {
    setToggleContinue(!toggleContinue);
    setLocation(locationInput);
  };
  const descriptionChange = (descriptionInput: string): void => {
    setToggleContinue(!toggleContinue);
    setDescription(descriptionInput);
  };
  const handleData = (): void => {
    // const descriptionAfter =description.replace(/[^a-zA-Z ]/g, "").toLowerCase()
    const data = { location: location, description: description, name: name };
    axios.post("http://127.0.0.1:8000/helpapp/user", data).then((response) => {
      setAnalysisResults(response);
    });
  };

  useEffect(() => {
    if (description.length>0){
    handleData();
    return () => {
      setName("");
      setLocation({});
      setDescription("");
    };}
  }, [description]);
  return (
    <>
      <WelcomeTransition
        // handleName={(props:string)=>setName(props)}
        isBackClicked={toggleBack}
        isClicked={toggleContinue}
        welcomeSlide={<Welcome />}
        goSafeSlide={<GoSafe />}
        feelSafeSlide={<FeelSafe clickBack={()=> setToggleBack(!toggleBack)} clickContinue={() => setToggleContinue(!toggleContinue)} />}
        signInSlide={<SignIn clickBack={()=> setToggleBack(!toggleBack)} clickContinue={() => setToggleContinue(!toggleContinue)} />}
        nameSlide={<Name clickBack={()=> setToggleBack(!toggleBack)} handleName={(props) => nameChange(props)} />}
        helloSlide={<Hello name={name} />}
        locationSlide={
          <Location handleLocation={(props) => locationChange(props)} clickBack={()=> setToggleBack(!toggleBack)}/>
        }
        analysisSlide={
          <Analysis clickBack={()=> setToggleBack(!toggleBack)}  handleDescription={(props) => descriptionChange(props)} />
        }
      />
    </>
  );
}

export default App;
