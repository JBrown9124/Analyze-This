import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";

import FeelSafeButton from "../components/FeelSafeButton";
import { green } from "@mui/material/colors";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { styled } from "@mui/material/styles";
import CustomTextField from "../components/CustomTextField";
import Box from "@mui/material/Box";
import IconBoop from "../animators/IconBoop";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import AccountCircle from "@mui/icons-material/AccountCircle";
const NameIcon = styled(AccountCircle)(
  ({ theme, clickedBox, isError, primaryColor }: any) => ({
    color: isError ? "red" : primaryColor,

    [theme.breakpoints.up("md")]: {},
    // { marginRight: 6, marginTop: 20, marginBottom: 2.5},
    [theme.breakpoints.down("md")]: { height: "14px" },
    //  marginRight: -3, marginTop: 23,  },
  })
);

interface Props {
  handleName: (props: string) => void;
  clickBack: () => void;
}

export default function Name({ handleName, clickBack }: Props) {
  const ref = useRef<any>();
  useOnClickOutside(ref, () => handleClickOutside());
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
  const handleClickInside = (): void => {
    setClickedBox(true);

    setIsError(false);
  };
  const handleClickOutside = (): void => {
    setClickedBox(false);
  };
  const handleNameChange = (e: string) => {
    setName(e);
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
          <IconBoop
            x={0}
            isBooped={clickedBox || name.length > 0 || isError}
            beforeColor={""}
            afterColor={""}
            y={-4}
            rotation={name.length > 0 ? 720 : 0}
            scale={isError ? 0 : 1}
          >
            <NameIcon
              sx={{ mr: 1, my: 2.5 }}
              clickedBox={clickedBox}
              isError={isError}
              primaryColor={
                name.length > 0 ? "green" : clickedBox ? "blue" : "black"
              }
            />
          </IconBoop>
          <CustomTextField
            error={isError}
            onFocus={() => handleClickInside()}
            onClick={() => handleClickInside()}
            inputRef={ref}
            isSuccess={name.length > 0}
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
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNameChange(e.target.value)
            }
          />
        </Box>

        <Grid sx={{ padding: "15px" }}>
          <FeelSafeButton sx="" onClick={() => clickBack()} message={"Back"} />
          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => handleSubmit()}
            message={"Continue"}
          />
        </Grid>
      </Grid>
    </>
  );
}
