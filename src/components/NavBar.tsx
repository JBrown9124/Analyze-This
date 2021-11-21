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
}
export default function NavBar({ signedIn, handleLogOut }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:"#00675b"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {signedIn ? (
            <Button color="inherit" onClick={() => signedIn && handleLogOut()}>
              {signedIn ? "Logout" : ""}
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
