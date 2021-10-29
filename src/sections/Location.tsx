import React, { ReactNode, Ref, useEffect, useRef, useState } from "react";
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
// import { Input, List } from "antd";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { usePlacesWidget } from "react-google-autocomplete";
import { number } from "prop-types";
import Autocomplete from "react-google-autocomplete";
import { green } from "@mui/material/colors";
import api from "../services/googleAPI";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { EventHandler } from "react";

interface Props {
  handleLocation: (props: string) => void;
  clickBack: () => void;
}
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "blue",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
});
export default function Location({ handleLocation, clickBack }: Props) {
  const clickRef = useRef<any>();
  useOnClickOutside(clickRef, () => handleClickOutside());
  const [clickedBox, setClickedBox] = useState(false);
  const [location, setLocation] = useState("");
  const [placeSelected, setPlaceSelected] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string>("black");
  const [places, setPlaces] = useState<Array<Object>>([{}]);
  const [showPlaces, setShowPlaces] = useState(true)
  const [isError, setIsError] = useState(false);
  interface PlaceProps{
    placePredictions:Array<Object>
    getPlacePredictions:(arg0:Object)=>void
    isPlacePredictionsLoading:boolean
  }
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading }:PlaceProps =
    useGoogle({
      debounce: 500,
      sessionToken: true,
      apiKey: api,})
    //      options: {
     

    //   componentRestrictions: { country: "us" },}
    // });
  const handleClickOutside = (): void => {
    setShowPlaces(false);
    setClickedBox(false);
  };
  const handleClickInside = (): void => {
    setShowPlaces(true);
    setClickedBox(true);
  };
  // const { ref } = usePlacesWidget<HTMLDivElement>({

  //   apiKey: api,
  //   onPlaceSelected: (place) => {
  //     setPlaceSelected(true);
  //     setLocation(place.formatted_address);
  //   },

  //   inputAutocompleteValue: "off",

  //   options: {
  //     sessionToken: true,

  //     componentRestrictions: { country: "us" },

  //   },
  // });
  const handleSubmit = (): void => {
    /* If the input is not an empty string and the place has been selected with google drop down then dont send an error and let them continue */
    if (location.length > 0 && placeSelected === true) {
      handleLocation(location);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };
  const handleLocationSelected = (itemDescription: string) => {
    setPlaceSelected(true);
    setClickedBox(false);
    setPrimaryColor("green");
    setLocation(itemDescription);
    setShowPlaces(false);
  };

  const handleLocationChange = (e: string) => {
    setShowPlaces(true);
    getPlacePredictions({ input: e });
    setPlaceSelected(false);
    setPrimaryColor("black");
    setLocation(e);
  };
  useEffect(()=>{
    setPlaces(placePredictions)
    return ()=>{
     placePredictions.forEach(element=>element=[])
    }
  }
  
  
  ,[location,location.length])
  return (
    <>
      <Container className="feelSafeContainer">
        <Row>
          <Typography variant="h3">
            Where would you like us to find services for. Please select one of
            the locations from the dropdown.
          </Typography>
        </Row>
        <Box
          sx={{
            marginTop: "30px",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          < AddLocationAltIcon
            sx={{
              color:
                clickedBox === true ? "blue" : isError ? "red" : primaryColor,
              mr: 1,
              my: 2.5,
            }}
          />

          <CssTextField
            color="success"
            ref={clickRef}
            autoComplete="off"
            value={location}
            error={isError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleLocationChange(e.target.value);
            }}
            onClick={() => setIsError(false)}
            id="location-text-field"
            label="City, State, Country"
            variant="standard"
            onFocus={() => handleClickInside()}
          />

          <List
           ref={clickRef}
            dense
            sx={{
              backgroundColor: "white",
              position: "absolute",
              zIndex: "999",

              left: "50%",

              transform: "translate(-50%,-5%)",
              width: "100%",
              maxWidth: 360,
              justifyContent: "center",
              textAlign: "center",
              margin: "auto",
            }}
            disablePadding
          >
            {showPlaces && places.map((item:any) => (
              <Row>
                <ListItem
                  button
                  disableGutters
                  onClick={() => handleLocationSelected(item.description)}
                  key={item.place_id}
                  divider
                  alignItems="center"
                
                >
                  <ListItemText primary={item.description} />
                </ListItem>
              </Row>
            ))}
          </List>

          {/*             
           {(location.length>0) && (
          <List
          loading={true}
          style={{justifyContent:"center",textAlign:"center", marginTop:"1px", listStyleType:"none"}}
            dataSource={placePredictions}
            renderItem={(item:any) => (
              <List.Item  style={{  listStyleType:"none", }} onClick={() => setLocation(item.description)}>
                <List.Item.Meta  style={{ listStyleType:"none" }} title={item.description !== "No Data" && item.description} />
              </List.Item>
            )}
          />
        )} */}
        </Box>
        <Row>
          <div style={{}}>
            <FeelSafeButton
              onClick={() => handleSubmit()}
              message={"Continue"}
            />

            <FeelSafeButton onClick={() => clickBack()} message={"Back"} />
          </div>
        </Row>

        {/* <Row>
          <Debounce/>
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
        </Row> */}
      </Container>
    </>
  );
}
