import TextField, { TextFieldProps } from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
const LocationTextField = styled(TextField)(({ theme, isSuccess }: any) => ({
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
  
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      
      width: "50%",
    },
  }));

export default LocationTextField;