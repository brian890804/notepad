import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary {...props} />
))({
  "&.Mui-expanded": {
    maxHeight: "50px!important",
    backgroundColor: "pink",
    minHeight: "30px!important",
  },
});

export default function SimpleAccordion({ title, description, children }) {
  return (
    <AccordionElement>
      <div className="top_container">
        <img
          className="top_container_icon_img"
          src={
            "https://resource.h365cp.net/images/B%E6%AC%A1%E5%85%83%E9%81%8A%E6%88%B2%E5%88%86%E9%A1%9E/H365%E6%B8%B8%E6%88%8F/%E5%B0%81%E9%9D%A2GCO_20220629_694x206-A_B%E6%AC%A1%E5%85%83.gif"
          }
          alt="fireIcon"
          title="fireIcon"
        />
      </div>

      <Accordion square className="mt-0">
        <StyledAccordionSummary
          className="mb-0 pb-0"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="title fw-m">{title}</Typography>
        </StyledAccordionSummary>
        <AccordionDetails className="pt-0">
          <Typography className="mb-2 description ">{description}</Typography>
          <div className="g-start">{children}</div>
        </AccordionDetails>
      </Accordion>
    </AccordionElement>
  );
}

export const AccordionElement = styled.div`
  /*  */
  padding: 2%;

  .top_container {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    &_icon {
      &_img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 100%;
        vertical-align: middle;
        transition: 0.2s;
      }
    }
  }
  .tile {
    font-size: 60px;
  }
  .description {
    color: gray;
    font-size: 14px;
  }
`;
