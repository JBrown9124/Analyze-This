import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CoverBoop from "../../../animators/CoverBoop";
import { styled } from "@mui/material/styles";

const CustomLink = styled(Link)(
  ({ randomColor }: any) => `
  
    color:white;
    :hover {
      color: ${randomColor};
    }
  
    
 `
);
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
      <Grid
        container
        spacing={10}
        direction="column"
        sx={{ borderRadius: "15px" }}
      >
        <Grid item>
          <Typography sx={{ color: "black", marginTop: "10px" }} variant="h5">
            Sites
          </Typography>
        </Grid>
        {websites?.map((website: any) => (
          <Grid item key={website.link}>
            <CoverBoop randomColor={null} scale={1.1}>
              <CustomLink
                variant="h6"
                randomColor={"#ede7f6"}
                sx={{ cursor: "pointer" }}
                onClick={() => openInNewTab(website.link)}
                underline="none"
              >
                {" "}
                {website.name}
              </CustomLink>
            </CoverBoop>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
