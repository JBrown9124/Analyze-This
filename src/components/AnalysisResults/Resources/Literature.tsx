import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CoverBoop from "../../../animators/CoverBoop";
interface Props {
  books: Object[];
}
export default function Literature({ books }: Props) {
  function openInNewTab(url: string) {
    const win = window.open(url, "_blank")?.focus();
    return win;
  }
  return (
    <>
    <Grid container direction="column" spacing={2}>
      <Grid item>
      <Typography variant="h5" >
        {" "}
        Literature{" "}
      </Typography>
      </Grid>
      {books?.map((book: any) => (
        <Grid item>
          <CoverBoop x={5} y={-5} rotation={0} scale={1} fromY={0} fromX={0}>
            <img
              style={{ cursor: "pointer", width: "100%", height: "100%" }}
              src={book.cover}
              alt="cover"
              onClick={() => openInNewTab(book.link)}
            />
          </CoverBoop>
        
        </Grid>
      ))}
      </Grid>
    </>
  );
}
