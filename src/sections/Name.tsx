import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeelSafeButton from "../components/FeelSafeButton";
import { green } from '@mui/material/colors';
import useOnClickOutside from "../hooks/useOnClickOutside";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

import Input from "@mui/material/Input";

import InputAdornment from "@mui/material/InputAdornment";

import AccountCircle from "@mui/icons-material/AccountCircle";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

interface Props {
  handleName: (props: string) => void;
}

export default function Name({ handleName }: Props) {
  
 
  const ref = useRef();
  useOnClickOutside(ref, () => setClickedBox(false));
  const [name, setName] = useState("");
  const [clickedBox, setClickedBox] = useState(false)
  const handleSubmit = (): void => {
    handleName(name);
  };

  return (
    <>
      <Container className="feelSafeContainer">
        <Row>
          <Typography variant="h3">
            What would you like to be called for this session?
          </Typography>
        </Row>
        <Row>
          <Box ref={ref}sx={{ marginTop: "30px", justifyContent: "center" }}>
            <AccountCircle sx={{ color:clickedBox===true?green[600]:"action",  mr: 1, my: 2.5 }} />
            <CssTextField
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === "Enter") {
                  handleSubmit();
                  ev.preventDefault();
                }
              }}
              id="input-with-sx"
              label="Your name"
              variant="standard"
              onFocus={()=>setClickedBox(true)}
           
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Row>
        <Row>
          <div className="nameButton">
            <FeelSafeButton
              onClick={() => handleSubmit()}
              message={"Continue"}
            />
          </div>
        </Row>
      </Container>
    </>
  );
}
