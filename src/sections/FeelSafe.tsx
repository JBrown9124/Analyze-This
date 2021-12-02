import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FeelSafeButton from "../components/FeelSafeButton";
interface Props {
  clickContinue: () => void;
  clickBack: () => void;
}

export default function FeelSafe({ clickContinue, clickBack }: Props) {
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
          transform: "translate(-50%, 240%)",
        }}
        container
        direction="column"
      >
        <Typography
          variant="h3"
          component="span"
          sx={{ borderRadius: "5px", padding: "15px" }}
        >
          Do you feel safe enough to continue?
        </Typography>
        <Grid sx={{ padding: "15px" }}>
          <FeelSafeButton sx="" onClick={() => clickBack()} message="Back" />
          <FeelSafeButton
            sx={{ marginLeft: "1vw" }}
            onClick={() => clickContinue()}
            message="Yes"
          />
        </Grid>
      </Grid>
    </>
  );
}
