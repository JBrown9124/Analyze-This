import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
interface Props {
  resources: [{ name: string; url: string }];
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
          background: "white!important",
          borderRadius: "5px",
        }}
      >
        <Grid item>
          <Typography variant="h3">Resources</Typography>
        </Grid>
       
        {resources?.map((resource:any) => (
          
          <Grid>
          <Typography variant="h3"> { resource.resource_type}</Typography>
          {resource.websites?.map((website:any) =>
          <Grid item>
            <Typography variant="h3">
              <Link type="button" onClick={() => openInNewTab(website.url)}>
                {" "}
                {website.name}
              </Link>
            </Typography>
          </Grid>
          )}
          </Grid>
          
        ))}
        
      </Grid>
    </>
  );
}
