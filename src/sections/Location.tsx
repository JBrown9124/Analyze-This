import React, { ReactNode, Ref, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import CustomTextField from "../components/CustomTextField";
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
import IconBoop from "../animators/IconBoop";

const LocationIcon = styled(AddLocationAltIcon)(
  ({ theme, clickedBox, isError, primaryColor }: any) => ({
    color: isError ? "red" : primaryColor,

    [theme.breakpoints.up("md")]: {},
    // { marginRight: 6, marginTop: 20, marginBottom: 2.5},
    [theme.breakpoints.down("md")]: { height: "14px" },
    //  marginRight: -3, marginTop: 23,  },
  })
);
const LocationList = styled(List)(
  ({ theme, clickedBox, isError, primaryColor }: any) => ({
    [theme.breakpoints.up("md")]: { width: "100%", maxWidth: "52%" },
    [theme.breakpoints.down("md")]: { width: "100%", maxWidth: "100%" },
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
  const [isSuccess, setIsSuccess] = useState(false);

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
    sessionToken: true,
    apiKey: api,
    options: {
      componentRestrictions: { country: "us" },
    },
  });

  const handleClickOutside = (): void => {
    setShowPlaces(false);
    setClickedBox(false);
    isSuccess ? setPrimaryColor("green") : setPrimaryColor("black");
  };
  const handleClickInside = (): void => {
    setShowPlaces(true);
    setClickedBox(true);
    isSuccess ? setPrimaryColor("green") : setPrimaryColor("blue");
    setIsError(false);
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
    setIsSuccess(true);
    setLocation(itemDescription);
    setShowPlaces(false);
  };

  const handleLocationChange = (e: string) => {
    setShowPlaces(true);
    getPlacePredictions({ input: e });
    setPlaceSelected(false);
    setIsSuccess(false);
    setPrimaryColor("blue");
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
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          background: "white!important",
          borderRadius: "5px",
          width: "50%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 250%)",
        }}
        container
        direction="column"
      >
        <Typography
          variant="h3"
          component="span"
          sx={{ borderRadius: "5px", padding: "15px" }}
        >
          Please select a location
        </Typography>

        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <IconBoop
            x={0}
            isBooped={
              primaryColor === "blue" || primaryColor === "green" || isError
            }
            beforeColor={""}
            afterColor={""}
            y={-4}
            rotation={primaryColor === "green" ? 720 : 0}
            scale={isError ? 0 : 1}
          >
            <LocationIcon
              sx={{ mr: 1, my: 2.5 }}
              clickedBox={clickedBox}
              isError={isError}
              primaryColor={primaryColor}
            />
          </IconBoop>
          <CustomTextField
            onFocus={() => handleClickInside()}
            isSuccess={isSuccess}
            ref={clickRef}
            autoComplete="off"
            value={location}
            error={isError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleLocationChange(e.target.value);
            }}
            onClick={() => handleClickInside()}
            id="location-text-field"
            label="City, State, Country"
            variant={"standard" as any}
          />

          <LocationList
            ref={clickRef}
            sx={{
              backgroundColor: "white",
              position: "absolute",
              zIndex: "999",
              left: "50%",
              transform: "translate(-50%,-5%)",

              justifyContent: "center",
              textAlign: "center",
              margin: "auto",
            }}
            disablePadding
          >
            {showPlaces &&
              places.map((item: any, idx) => (
                <ListItem
                  button
                  onClick={() => handleLocationSelected(item.description)}
                  key={idx}
                  divider
                  alignItems="center"
                >
                  <ListItemText primary={item.description} />
                </ListItem>
              ))}
          </LocationList>
        </Box>
        <Grid sx={{ padding: "15px" }}>
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
        </Grid>
      </Grid>
    </>
  );
}
