import Typography from "@mui/material/Typography";
import { useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import AccordionBoop from "../../animators/AccordionBoop"
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
))(({ theme, accordionColor }: any) => ({
  overflow: "hidden",
  "&.MuiAccordion-hover": { background: "#bbb5c3" },
  "& hover": { background: "#bbb5c3" },
  backgroundColor: accordionColor,
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { backgroundColor: "white", borderBottom: 0 },
  "&:before": { backgroundColor: "white", display: "none" },
}));

const CustomAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme, accordionColor }: any) => ({
    overflow: "hidden",
    backgroundColor: accordionColor,
  })
);

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme, accordionColor }: any) => ({
  backgroundColor: accordionColor,

  overflow: "hidden",
  "&.MuiAccordionSummary-focused": {
    backgroundColor: accordionColor,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    backgroundColor: accordionColor,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    backgroundColor: accordionColor,
  },
}));

interface Props {
  facilities: Object[];
}
export default function Facilities({ facilities }: Props) {
  const [expanded, setExpanded] = useState<any>(false);
  const [accordionColor, setAccordionColor] = useState("#ede7f6");
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
      
          border: "1px solid black",
        }}
      >
        {facilities.map((facility: any, idx: number) => (
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" sx={{ padding: "30px" }}>
                {facility?.facilities_type === "suicide support"
                  ? "Because we noticed you are feeling down."
                  : facility?.facilities_type === "anger support"
                  ? "Because we noticed you are a little tense."
                  : facility?.facilities_type === "addiction support"
                  ? "Because we noticed you are fixated on some things."
                  : ""}
              </Typography>
            </Grid>
            {facility.closest_facilities?.map((closest: any, idx: number) => (
              <Grid item key={`${closest.plus_code?.global_code}${facility?.facilities_type}`}>
                   <AccordionBoop width={"100%"} randomColor={"#009688"}>
                <CustomAccordion
                  accordionColor={"#ede7f6"}
                  key={`${closest.plus_code?.global_code}${facility?.facilities_type}`}
                  expanded={
                    expanded[
                      `${closest.plus_code?.global_code}${facility?.facilities_type}`
                    ] === true
                  }
                  onChange={handleAccordionChange(
                    `${closest.plus_code?.global_code}${facility?.facilities_type}`
                  )}
                  disableGutters
                >
               
                  <CustomAccordionSummary accordionColor={"#ede7f6"}>
                    <Typography variant="h6" sx={{ textAlign: "left" }}>
                      {closest.name}
                    </Typography>
                  </CustomAccordionSummary>
                
                  <CustomAccordionDetails accordionColor={"#ede7f6"}>
                    <Grid container direction="column">
                      <Grid item sx={{ height: "30vh", width: "100%" }}>
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
                      <Grid item>
                        <Rating
                          name="read-only"
                          value={closest.rating}
                          readOnly
                        />
                      </Grid>

                      <Grid item>
                        {" "}
                        <Typography variant="body1">
                          {closest.formatted_address}{" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{
                            color: closest.opening_hours?.open_now
                              ? "green"
                              : "red",
                          }}
                        >
                          {closest.opening_hours?.open_now
                            ? "Open Now"
                            : "Closed"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CustomAccordionDetails>
                </CustomAccordion>
                </AccordionBoop>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
