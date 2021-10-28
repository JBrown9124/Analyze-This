import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import GoogleLogin from "react-google-login";
import clientID from "../services/clientID"
import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
interface Props {
  clickContinue: ()=>void;
  clickBack: ()=>void;
}
export default function SignIn({clickContinue, clickBack }:Props) {
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState();
  const responseGoogle = (response: any) => {
    setResponse(response.getGrantedScopes())
  };
  const success = (response: any) => {
    console.log(response) // eslint-disable-line
  }
  
  const error = (response: any) => {
    console.error(response) // eslint-disable-line
  }
  
  const loading = () => {
    console.log('loading') // eslint-disable-line
  }
  
  const logout = () => {
    console.log('logout') // eslint-disable-line
  }
  return (
    <>
      <Container className="feelSafeContainer">
        <Typography variant="h3">Would you like to sign in?</Typography>
        <GoogleLogin
        
          clientId={clientID}
          buttonText="Sign in with Google"
          onSuccess={success}
      onFailure={error}
      onRequest={loading}
      
     
      responseType="id_token"
      isSignedIn
      theme="dark"
          cookiePolicy={"single_host_origin"}
        />
        <div className="feelSafeButton">
        <FeelSafeButton onClick={() => clickContinue()} message="No thanks" />
        </div>
        <div className="feelSafeButton">
        <FeelSafeButton onClick={() => clickBack()} message="Back" />
        </div>
      </Container>
    </>
  );
}
