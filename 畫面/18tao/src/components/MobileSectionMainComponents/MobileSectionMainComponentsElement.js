import styled from "@emotion/styled";
import { mq } from "../SectionPhoneSliderComponents/SectionPhoneSliderElement";

export const MobileSectionMainComponentsElement = styled.section({
  position: "relative",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ".item": {
    display: "flex",
    flex: "0 0 50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5em",
    "&.column": {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "2em",
    },
  },
  ".link": { minWidth: "140px", cursor: "pointer" },
});
