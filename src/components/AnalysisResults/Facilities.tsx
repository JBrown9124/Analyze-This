import Typography from "@mui/material/Typography";
import { useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import GoogleMapReact from "google-map-react";

import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import Divider from "@mui/material/Divider";

const CustomAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  overflow: "hidden",

  backgroundColor: "white",
  // border: `1px solid ${theme.palette.divider}`,
  // "&:not(:last-child)": { backgroundColor: "white", borderBottom: 0 },
  // "&:before": { backgroundColor: "white", display: "none" },
}));

const CustomAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  overflow: "hidden",
  backgroundColor: "white",
}));

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
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
    transform: "rotate(90deg)",
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
        color: "red",

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
        <Typography variant="h3" sx={{ padding: "15px" }}>
          Facilities
        </Typography>
        {facilities.map((facility: any, idx: number) => (
          <Grid item>
            <Typography variant="h3" sx={{ padding: "15px" }}>
              <Divider textAlign="center">{facility?.facilities_type}</Divider>
            </Typography>
            {facility.closest_facilities?.map((closest: any) => (
              <CustomAccordion
                key={closest.plus_code?.global_code}
                expanded={expanded[closest.plus_code?.global_code] === true}
                onChange={handleAccordionChange(closest.plus_code?.global_code)}
                disableGutters
              >
                <CustomAccordionSummary>
                  <Typography variant="h3">{closest.name}</Typography>
                  <Avatar
                    sx={{ marginLeft: 5 }}
                    src={closest.icon}
                    alt={closest.icon}
                    variant="square"
                  />
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Grid sx={{ height: "30vh", width: "100%" }}>
                    {/* {facility.photos?.html_attributions?.map((pic:any)=><div>{pic}</div>
  
  )} */}
                    <GoogleMapReact
                      defaultCenter={closest.geometry?.location}
                      defaultZoom={11}
                    >
                      <Destination
                        lat={closest.geometry?.location?.lat}
                        lng={closest.geometry?.location?.lng}
                        text={closest.name}
                      />
                    </GoogleMapReact>
                  </Grid>
                  <Grid>
                    <Rating name="read-only" value={closest.rating} readOnly />
                  </Grid>
                  <Grid>{closest.formatted_address}</Grid>
                  <Grid>
                    {closest.opening_hours?.open_now ? "Open Now" : "Closed"}
                  </Grid>
                </CustomAccordionDetails>
              </CustomAccordion>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
