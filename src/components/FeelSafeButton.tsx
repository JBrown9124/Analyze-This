import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "#ede7f6",
    boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
 
  },
  fontFamily: "Open-sans, sans-serif",
  color: "black",
  fill: "transparent",
  textTransform: "none",
  border: "solid #bbb5c3 1px",

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
interface Props {
  onClick: () => void;
  message: string;
  sx:any
}
export default function FeelSafeButton({ message, onClick, sx}: Props) {
  return <ColorButton sx={sx}onClick={() => onClick()}>{message}</ColorButton>;
}
