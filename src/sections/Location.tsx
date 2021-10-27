import React, { Ref, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FeelSafeButton from "../components/FeelSafeButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { usePlacesWidget } from "react-google-autocomplete";
import { number } from "prop-types";
import Autocomplete from "react-google-autocomplete";
import { green } from "@mui/material/colors";

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
  handleLocation: (props: string) => void;
  clickBack: () => void;
}

export default function Location({ handleLocation, clickBack }: Props) {
  const clickRef = useRef<any>();
  useOnClickOutside(clickRef, () => setClickedBox(false));
  const [clickedBox, setClickedBox] = useState(false);
  const [location, setLocation] = useState("");
  const [placeSelected, setPlaceSelected] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const { ref } = usePlacesWidget<HTMLDivElement>({
   
    apiKey: ,
    onPlaceSelected: (place) => {
      setPlaceSelected(true);
      setLocation(place.formatted_address);
    },
    
    inputAutocompleteValue: "off",
 
    options: {
      sessionToken: true,
      
      componentRestrictions: { country: "us" },
      
    },
  });
  const handleSubmit = (): void => {
    /* If the input is not an empty string and the place has been selected with google drop down then dont send an error and let them continue */
    if (location.length > 0 && placeSelected === true) {
      handleLocation(location);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <Container className="feelSafeContainer">
        <Row>
          <Typography variant="h3">
            Where would you like us to find services for. Please select one of
            the locations from the dropdown.
          </Typography>
        </Row>
        <Row>
          <Box component="form"   sx={{ marginTop: "30px", justifyContent: "center" }}>
            <AccountCircle
              sx={{
                color:
                  clickedBox === true ? green[600] : isError ? "red" : "black",
                mr: 1,
                my: 2.5,
              }}
            />

            <CssTextField
              ref={clickRef}
                
              autoComplete="off"
              value = {location}
              onChange={(e)=>setLocation(e.target.value)}
              error={isError}
              onClick={() => setIsError(false)}
              id="google-location-text"
              type="text"
              label="City, State, Country"
              variant="standard"
              inputRef={ref}
              onFocus={() => setClickedBox(true)}
            />
          
          </Box>
         
        </Row>
        <Row>
          <div style={{ marginTop: "30px" }}>
            <FeelSafeButton
              onClick={() => handleSubmit()}
              message={"Continue"}
            />

            <FeelSafeButton onClick={() => clickBack()} message={"Back"} />
          </div>
        </Row>
      </Container>
    </>
  );
}
