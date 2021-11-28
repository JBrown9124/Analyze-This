import Typography from "@mui/material/Typography";
import { useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Avatar from '@mui/material/Avatar';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import GoogleMapReact from "google-map-react";

import api from "../../services/googleAPI";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

const GradesAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  overflow: "hidden",

  backgroundColor: "white",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { backgroundColor: "white", borderBottom: 0 },
  "&:before": { backgroundColor: "white", display: "none" },
}));

const GradesAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  overflow: "hidden",
  backgroundColor: "white",
}));

const GradesAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  overflow: "hidden",
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
  facilities: Object[];
}
export default function Facilities({ facilities }: Props) {
  const [expanded, setExpanded] = useState<any>(false);
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded({ ...expanded, [panel]: newExpanded ? true : false });
    };
  function openInNewTab(url: string) {
    const win = window.open(url, "_blank")?.focus();
    return win;
  }
  const Destination = ({ text }: any) => (
    <Grid
      direction="column"
      sx={{
        color: "white",

        padding: "15px 10px",
        height: "100%",
        width: "100%",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid>
        <AddLocationAltIcon />
      </Grid>
      <Grid>{text}</Grid>
    </Grid>
  );
  return (
    <>
      <Grid container direction="column">
        <Typography variant="h3">Facilities</Typography>
        {facilities.map((facility: any) => (
          <GradesAccordion
            key={facility.plus_code?.global_code}
            expanded={expanded[facility.plus_code?.global_code] === true}
            onChange={handleAccordionChange(facility.plus_code?.global_code)}
            disableGutters
          >
            <GradesAccordionSummary>
              <Typography variant="h3">{facility.name}</Typography> {}
              <Avatar  sx={{marginLeft:5}}src={facility.icon} alt={facility.icon}  variant="square"/>
            </GradesAccordionSummary>
            <GradesAccordionDetails>
              <Grid sx={{ height: "30vh", width: "100%" }}>
                {/* {facility.photos?.html_attributions?.map((pic:any)=><div>{pic}</div>
              
              )} */}
                <GoogleMapReact
                  defaultCenter={facility.geometry?.location}
                  defaultZoom={11}
                >
                  <Destination
                    lat={facility.geometry?.location?.lat}
                    lng={facility.geometry?.location?.lng}
                    text={facility.name}
                  />
                </GoogleMapReact>
              </Grid>
              <Grid>{facility.formatted_address}</Grid>
              <Grid>
                {facility.opening_hours?.open_now ? "Open Now" : "Closed"}
              </Grid>
            </GradesAccordionDetails>
          </GradesAccordion>
        ))}
      </Grid>
    </>
  );
}
