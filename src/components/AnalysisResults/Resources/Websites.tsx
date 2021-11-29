import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CoverBoop from "../../../animators/CoverBoop";
interface Props {
  websites: Object[];
}
export default function Websites({ websites }: Props) {
  function openInNewTab(url: string) {
    const win = window.open(url, "_blank")?.focus();
    return win;
  }
  return (
    <>
      <Grid container spacing={10} direction="column">
          <Grid item>
        <Typography variant="h5" >
          {" "}
          Websites{" "}
        </Typography>
        </Grid>
        {websites?.map((website: any) => (
          <Grid item>
            <Typography variant="h6">
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => openInNewTab(website.link)}
              >
                {" "}
                {website.name}
              </Link>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
