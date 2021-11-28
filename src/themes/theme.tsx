
import {createTheme} from "@mui/material/styles";

let theme = createTheme();

theme.typography.h6 = {
  fontFamily: "Oswald, sans-serif",
  color: "black",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".6rem",
  },
};
theme.typography.body1 = {
  fontFamily: "Open Sans, sans-serif",
  color: "black",
  [theme.breakpoints.up("sm")]: {
    fontSize: ".9rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".5rem",
  },
};
theme.typography.body2 = {
  fontFamily: "Open Sans, sans-serif",
  color: "black",
  [theme.breakpoints.up("sm")]: {
    fontSize: ".1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".6rem",
  },
};
theme.typography.h5 = {
  fontFamily: "Oswald, sans-serif",
  color: "black",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.0rem",
  },
};
theme.typography.h2 = {
  fontFamily: "Oswald, sans-serif",
  
  color: "black",

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".9rem",
  },
};
theme.typography.h1 = {
  fontFamily: "Open Sans, sans-serif",

  color: "white",

  [theme.breakpoints.up("sm")]: {
    fontSize: "5.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.0rem",
  },
};
theme.typography.h3 = {
  fontFamily: "Open Sans, sans-serif",
  color: "black",
  fontWeight:100,
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.0rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".6rem",
  },
};
theme.typography.h4 = {
  fontFamily: "Open Sans, sans-serif",
  color: "black",

  [theme.breakpoints.up("sm")]: {
    fontSize: "2.3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
};
export default theme;
