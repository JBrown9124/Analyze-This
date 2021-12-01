import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
interface Props {
  handleLogOut: () => void;
  signedIn: boolean;
  newAnalysis: boolean;
}
export default function NavBar({ signedIn, handleLogOut, newAnalysis }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          {/* {signedIn ? (
            <Button color="inherit" onClick={() => signedIn && handleLogOut()}>
              {signedIn ? "Logout" : ""}
            </Button>
          ) : null} */}
          {newAnalysis ? (
            <Button
              color="inherit"
              onClick={() => newAnalysis && handleLogOut()}
            >
              {newAnalysis ? "Start a New Analysis" : ""}
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
