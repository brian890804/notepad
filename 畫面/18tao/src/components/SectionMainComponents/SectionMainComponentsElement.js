import styled from "@emotion/styled";
import { mq } from "../SectionPhoneSliderComponents/SectionPhoneSliderElement";

export const SectionMainComponentsElement = styled.section({
  position: "relative",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ".item": {
    display: "flex",
    flex: "0 0 50%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5em",
    "&.column": {
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "flex-start",
      gap: "2em",
    },
  },
  ".link": { minWidth: "150px", cursor: "pointer" },
  [mq[0]]: {
    // padding: "0 12%",
  },
  [mq[1]]: {
    padding: "0 12%",
  },
});
