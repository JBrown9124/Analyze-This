import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";

import Container from "react-bootstrap/Container";
import FeelSafeButton from "../components/FeelSafeButton";
interface Props {
  clickContinue: () => void;
  clickBack: () => void;
}

export default function FeelSafe({ clickContinue, clickBack }: Props) {
  return (
    <>
      <Container className="feelSafeContainer">
        <Typography variant="h3">
          Do you feel safe enough to continue?
        </Typography>

        <div className="feelSafeButton">
          <FeelSafeButton onClick={() => clickContinue()} message="Yes" />
        </div>
        <div className="feelSafeButton">
          <FeelSafeButton onClick={() => clickBack()} message="Back" />
        </div>
      </Container>
    </>
  );
}
