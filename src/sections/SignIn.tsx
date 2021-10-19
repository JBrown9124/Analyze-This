import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import GoogleLogin from "react-google-login";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
export default function SignIn(props: any) {
  const [clicked, setClicked] = useState(false);

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <>
      <Container className="feelSafeContainer">
        <Typography variant="h3">Would you like to sign in?</Typography>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className="feelSafeButton">
        <FeelSafeButton onClick={() => props.click()} message="No thanks" />
        </div>
      </Container>
    </>
  );
}
