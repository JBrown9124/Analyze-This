import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import clientID from "../services/clientID";
import Grid from "@mui/material/Grid";

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
      <Grid
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          background: "white!important",
          borderRadius: "5px",
          width: "50%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 110%)",
        }}
        container
        direction="column"
      >
        <Typography variant="h3" sx={{ borderRadius: "5px", padding: "15px" }}>
          To save some time, would you like to sign in with Google?
        </Typography>
        <Grid sx={{ borderRadius: "5px", padding: "15px" }}>
          <GoogleLogin
            clientId={clientID}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={error}
            onRequest={loading}
            theme={"dark"}
            isSignedIn={false}
            style={{ backgroundColor: "blue" }}
           
            cookiePolicy={"single_host_origin"}
          />
        </Grid>
        <Grid sx={{ borderRadius: "5px", padding: "15px" }}>
          <FeelSafeButton
            sx=""
            onClick={() => clickBack()}
            message="Back"
          />
          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => clickContinue()}
            message="No thanks"
          />
        </Grid>
      </Grid>
    </>
  );
}
