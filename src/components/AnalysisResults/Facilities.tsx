import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

const GradesAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // overflow: "hidden",

  backgroundColor: "white",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { backgroundColor: "white", borderBottom: 0 },
  "&:before": { backgroundColor: "white", display: "none" },
}));



const GradesAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // overflow: "hidden",
  backgroundColor: "white",
}));


const GradesAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  pointerEvents: "none",
  backgroundColor: "white",
  // overflow: "hidden",
  "&.MuiAccordionSummary-focused": {
    backgroundColor: "white!important",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
    backgroundColor: "white",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    backgroundColor: "white",
  },
}));

interface Props {
  facilities:Array<Object>;
}
export default function Facilities({ facilities }: Props) {
  function openInNewTab(url: string) {
    const win = window.open(url, "_blank")?.focus();
    return win;
  }
  return (
    <>
  <Grid container direction="column">
        <Typography variant="h1">Facilities</Typography>
        {facilities.map((facility:any) => (
          <GradesAccordion>
              <GradesAccordionSummary>
          <Typography variant="h3">
            
            
               
                {facility.name}
     
    
          </Typography>
           </GradesAccordionSummary>
           <GradesAccordionDetails>
          </GradesAccordionDetails>
          </GradesAccordion>
        ))}
  </Grid>
    </>
  );
}
