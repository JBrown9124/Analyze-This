import { List } from "antd";
import React, { useRef, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { usePlacesWidget } from "react-google-autocomplete";
import { green } from "@mui/material/colors";
import api from "../services/googleAPI";

export const Debounce = ({ a }: any) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      debounce: 1000,
      sessionToken: true,
      apiKey: api,
    });
  const [value, setValue] = useState("");
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
  const clickRef = useRef<any>();
  useOnClickOutside(clickRef, () => setClickedBox(false));
  const [clickedBox, setClickedBox] = useState(false);
  const [location, setLocation] = useState("");
  const [placeSelected, setPlaceSelected] = useState(false);
  const [isError, setIsError] = useState(false);

  const { ref } = usePlacesWidget<HTMLDivElement>({
    apiKey: api,
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
  // const handleSubmit = (): void => {
  //   /* If the input is not an empty string and the place has been selected with google drop down then dont send an error and let them continue */
  //   if (location.length > 0 && placeSelected === true) {
  //     handleLocation(location);
  //     setIsError(false);
  //   } else {
  //     setIsError(true);
  //   }
  // };

  return (
    <>
      <Box
        component="form"
        sx={{ marginTop: "30px", justifyContent: "center" }}
      >
        <AccountCircle
          sx={{
            color: clickedBox === true ? green[600] : isError ? "red" : "black",
            mr: 1,
            my: 2.5,
          }}
        />

        <CssTextField
          ref={clickRef}
          autoComplete="off"
          value={value}
          onChange={(evt: any) => {
            getPlacePredictions({ input: evt.target.value });
            setValue(evt.target.value);
          }}
          error={isError}
          onClick={() => setIsError(false)}
          id="google-location-text"
          type="text"
          label="City, State, Country"
          variant="standard"
          onFocus={() => setClickedBox(true)}
        />
        {value.length > 0 && value !== "No Data" && (
          <List
            style={{ position: "inherit", listStyleType: "none" }}
            dataSource={placePredictions}
            renderItem={(item: any) => (
              <List.Item onClick={() => setValue(item.description)}>
                <List.Item.Meta title={item.description} />
              </List.Item>
            )}
          />
        )}
      </Box>
    </>
  );
};
