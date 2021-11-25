import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";

import FeelSafeButton from "../components/FeelSafeButton";
import { green } from "@mui/material/colors";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { styled } from "@mui/material/styles";
import CustomTextField from "../components/CustomTextField";
import Box from "@mui/material/Box";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import AccountCircle from "@mui/icons-material/AccountCircle";

const NameTextField = styled(TextField)({
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
  clickBack: () => void;
}

export default function Name({ handleName, clickBack }: Props) {
  const ref = useRef<any>();
  useOnClickOutside(ref, () => setClickedBox(false));
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [clickedBox, setClickedBox] = useState(false);
  const handleSubmit = (): void => {
    if (name.length > 0) {
      handleName(name);
      setIsError(false);
    } else {
      setIsError(true);
    }
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
          transform: "translate(-50%, 125%)",
        }}
        container
        direction="column"
      >
        <Typography
          variant="h3"
          component="span"
          sx={{ borderRadius: "5px", padding: "15px" }}
        >
          What would you like to be called for this session?
        </Typography>

        <Box sx={{ marginTop: "30px", justifyContent: "center" }}>
          <AccountCircle
            sx={{
              color:
                clickedBox === true ? green[600] : isError ? "red" : "black",
              mr: 1,
              my: 2.5,
            }}
          />
          <NameTextField
            error={isError}
            onClick={() => setIsError(false)}
            inputRef={ref}
            onKeyPress={(ev: React.KeyboardEvent<HTMLInputElement>) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                handleSubmit();
                ev.preventDefault();
              }
            }}
            id="input-with-sx"
            label="Your name"
            variant="standard"
            onFocus={() => setClickedBox(true)}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Grid sx={{ padding: "15px" }}>
          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => handleSubmit()}
            message={"Continue"}
          />

          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => clickBack()}
            message={"Back"}
          />
        </Grid>
      </Grid>
    </>
  );
}
