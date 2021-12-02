import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Welcome() {
  return (
    <>
      <Grid
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, 200%)",
        }}
        container
        direction="column"
      >
        <Typography variant="h1" sx={{ padding: "15px" }}>
          Welcome
        </Typography>
      </Grid>
    </>
  );
}
