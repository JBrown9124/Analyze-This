import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import clientID from "../services/clientID";
import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
interface Props {
  clickContinue: () => void;
  clickBack: () => void;
  signInData: (data: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}
export default function SignIn({
  clickContinue,
  clickBack,
  signInData,
}: Props) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [response, setResponse] = useState<object>();
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  // const handleSignIn = ():void =>{
  //   const data = {name: name, id:id}

  // }
  // useEffect(()=>{
  //   if (name.length>0){
  //   handleSignIn();
  //   return()=>{
  //     setName("");
  //     setId("");
  //   }}
  // }, [id])
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ("profileObj" in response) {
      signInData(response);
    }
  };
  const success = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response); // eslint-disable-line
  };

  const error = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.error(response); // eslint-disable-line
  };

  const loading = () => {
    console.log("loading"); // eslint-disable-line
  };

  const logout = () => {
    console.log("logout"); // eslint-disable-line
  };
  return (
    <>
      <Container className="feelSafeContainer">
        <Typography variant="h3">Would you like to sign in?</Typography>
        <GoogleLogin
          clientId={clientID}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={error}
          onRequest={loading}
          isSignedIn={false}
          style={{ backgroundColor: "blue" }}
          className="googleButton"
          cookiePolicy={"single_host_origin"}
        />
        <div className="feelSafeButton">
          <FeelSafeButton onClick={() => clickBack()} message="Back" />
          <FeelSafeButton onClick={() => clickContinue()} message="No thanks" />
        </div>
      </Container>
    </>
  );
}
