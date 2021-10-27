import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import GoogleLogin from "react-google-login";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
interface Props {
  clickContinue: ()=>void;
  clickBack: ()=>void;
}
export default function SignIn({clickContinue, clickBack }:Props) {
  const [clicked, setClicked] = useState(false);

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <>
      <Container className="feelSafeContainer">
        <Typography variant="h3">Would you like to sign in?</Typography>
        <GoogleLogin
          clientId="795132584659-7lfan4jq4ecf07c4u86d9jrqf9s9rf8a.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
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
