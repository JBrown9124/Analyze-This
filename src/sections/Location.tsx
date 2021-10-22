import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import FeelSafeTransition from "../animators/FeelSafeTransition";
import Container from "react-bootstrap/Container"
import FeelSafeButton from "../components/FeelSafeButton"

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { number } from 'prop-types';


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});


interface Props {
  handleLocation: (props:object)=>void;
  
}

export default function Location({handleLocation}:Props) {

 
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipcode, setZipCode] = useState<number>()

  const handleSubmit = ():void => {
   const locationData = {address:address, city:city, state:state, zipcode:zipcode}
handleLocation(locationData)

  }


  return (
    <>
     
     <Container className="feelSafeContainer">
          <Typography variant="h3">
           What would you like to be called for this session?
          </Typography>
          <CssTextField label="Address" id="custom-css-outlined-input" value={address} onChange={(e)=>setAddress(e.target.value)}/>
          <CssTextField label="City" id="custom-css-outlined-input" value={city} onChange={(e)=>setCity(e.target.value)}/>
          <CssTextField label="State" id="custom-css-outlined-input" value={state} onChange={(e)=>setState(e.target.value)}/>
          <CssTextField label="Zip Code" id="custom-css-outlined-input" type='number' value={zipcode} onChange={(e)=>setZipCode(parseInt(e.target.value))}/>
     
         <FeelSafeButton onClick={()=>handleSubmit()} message={'Continue'}/>
        </Container>


    </>
  )
}