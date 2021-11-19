import React, { ReactNode, Ref, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";

import FeelSafeButton from "../components/FeelSafeButton";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import api from "../services/googleAPI";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";


const CssTextField = styled(TextField)(({ theme, isSuccess }: any) => ({
  "& .MuiInput-underline:before": {
    borderBottomColor: isSuccess ? "green" : "black"
  },
  "& .MuiFormLabel-root": {
    color: isSuccess ? "green" : "black",
  },
  "& label.Mui-focused": {
    color: isSuccess ? "green" : "blue",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: isSuccess ? "green" : "blue",
  },
  [theme.breakpoints.up("md")]: {
    height: "50px",
    width: "130px",
  },
  [theme.breakpoints.down("md")]: {
    height: "30px",
    width: "70px",
  },
}));
const LocationIcon = styled(AddLocationAltIcon)(
  ({ theme, clickedBox, isError, primaryColor }: any) => ({
    color: clickedBox ? "blue" : isError ? "red" : primaryColor,
    mr: 1,
    my: 2.5,
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.down("md")]: {},
  })
);
interface Props {
  handleLocation: (props: string) => void;
  clickBack: () => void;
}
export default function Location({ handleLocation, clickBack }: Props) {
  const clickRef = useRef<any>();
  useOnClickOutside(clickRef, () => handleClickOutside());
  const [clickedBox, setClickedBox] = useState(false);
  const [location, setLocation] = useState("");
  const [placeSelected, setPlaceSelected] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string>("black");
  const [places, setPlaces] = useState<Array<Object>>([{}]);
  const [showPlaces, setShowPlaces] = useState(true);

  const [isError, setIsError] = useState(false);
  interface PlaceProps {
    placePredictions: Array<Object>;
    getPlacePredictions: (arg0: Object) => void;
    isPlacePredictionsLoading: boolean;
  }
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  }: PlaceProps = useGoogle({
    debounce: 200,
    sessionToken: true,
    apiKey: api,
    options: {
      types: null,
      fields: ["address_components", "place_id", "formatted_address"],
      componentRestrictions: { country: "us" },
    },
  });

  const handleClickOutside = (): void => {
    setShowPlaces(false);
    setClickedBox(false);
  };
  const handleClickInside = (): void => {
    setShowPlaces(true);
    setClickedBox(true);
  };

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
  useEffect(() => {
    setPlaces(placePredictions);

    return () => {
      placePredictions.forEach((element) => (element = []));
    };
  }, [location, location.length]);
  return (
    <>
      <Grid
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 100%)",
        }}
        container
        direction="column"
        spacing={-20}
      >
        <Typography variant="h3">
          Where would you like us to find services for. Please select one of the
          locations from the dropdown.
        </Typography>

        <Box
          sx={{
            marginTop: "2vw",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <LocationIcon
            sx={{ mr: 1, my: 2.5 }}
            clickedBox={clickedBox}
            isError={isError}
            primaryColor={primaryColor}
          />

          <CssTextField
            isSuccess={clickedBox ? false : primaryColor === "green"}
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
            variant={"standard" as any}
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
            {showPlaces &&
              places.map((item: any) => (
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
              ))}
          </List>
        </Box>

        <div style={{ marginTop: "2vw" }}>
          <FeelSafeButton
            sx={{}}
            onClick={() => clickBack()}
            message={"Back"}
          />
          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => handleSubmit()}
            message={"Continue"}
          />
        </div>
      </Grid>
    </>
  );
}
