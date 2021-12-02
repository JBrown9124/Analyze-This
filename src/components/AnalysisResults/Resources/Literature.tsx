import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
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
    <Grid container direction="column" sx={{ borderRadius:"15px", }} >
      <Grid item>
      <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px"}} >
        {" "}
        Literature{" "}
      </Typography>
      </Grid>
      {books?.map((book: any) => (
        <Grid item key={book.link} sx={{marginBottom:5}} >
          <CoverBoop randomColor={"#" + (Math.floor(Math.random()*16777215).toString(16))}x={5} y={-5} rotation={0} scale={1} fromY={0} fromX={0}>
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
