import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
              <Typography
                variant="body2"
                sx={{ color: "white", textTransform: "none" }}
              >
                {newAnalysis ? "Start a new session." : ""}
              </Typography>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
