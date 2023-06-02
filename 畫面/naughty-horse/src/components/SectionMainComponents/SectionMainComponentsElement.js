import styled from "@emotion/styled";
import { mq } from "../SectionPhoneSliderComponents/SectionPhoneSliderElement";

export const SectionMainComponentsElement = styled.section({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  [mq[0]]: {
    ".title": {
      position: "absolute",
      bottom: "30%",
      img: {
        width: "150px",
      },
    },
    ".left_text": {
      display: "none",
    },
    ".bottom_device_items": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      gap: "0.5em",
      marginBottom: "1em",
      img: {
        width: "6em",
      },
    },
  },
  [mq[1]]: {
    ".title": {
      position: "absolute",
      left: "12%",
      top: "10%",
      img: {
        width: "250px",
      },
    },
    ".left_text": {
      position: "absolute",
      left: "0",
      bottom: "25%",
      width: "20em",
      transform: "rotate(90deg)",
    },
    ".bottom_device_items": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      gap: "2em",
      marginBottom: "1em",
      img: {
        width: "10em",
      },
    },
  },
});
