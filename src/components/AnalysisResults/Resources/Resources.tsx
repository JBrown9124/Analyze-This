import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CoverBoop from "../../../animators/CoverBoop";
import Literature from "./Literature";
import Websites from "./Websites";
interface Props {
  resources: Object[];
}
export default function AnalysisResults({ resources }: Props) {
  function openInNewTab(url: string) {
    const win = window.open(url, "_blank")?.focus();
    return win;
  }
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          background: "#ffffff!important",
          borderRadius: "5px",
          border: "1px solid black",
        }}
      >
        {resources?.map((resource:any) => (
          <Grid container>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h4" sx={{ padding: "30px" }}>
                  {resource.resource_type === "suicide"
                    ? "Because we noticed you are feeling down."
                    : resource.resource_type === "anger"
                    ? "Because we noticed you are a little tense."
                    : resource.resource_type === "addiction"
                    ? "Because we noticed you are fixated on some things."
                    : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={6} item sx={{ background: "#bbb5c3" }}>
              <Websites websites={resource.websites} />
            </Grid>

            <Grid xs={6} item sx={{ background: "#ede7f6" }}>
              <Literature books={resource.books} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
