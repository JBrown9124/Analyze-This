
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";



const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "rgba(150,230,253,0.07)",
  },
  fontFamily: "Oswald, sans-serif",
  color: "#77C9D4",
  fill: "transparent",
  textTransform: "none",
  border: "solid #77C9D4 1px",

  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
    height: "50px",
    width: "130px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: ".6rem",
    height: "30px",
    width: "70px",
  },
}));

export default function FeelSafeButton(props:any) {
  return (
    <ColorButton
      onClick={()=>props.onClick()}
    >
      Yes
    </ColorButton>
  );
}
