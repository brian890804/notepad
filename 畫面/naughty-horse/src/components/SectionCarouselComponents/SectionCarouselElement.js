/* eslint-disable no-useless-computed-key*/

import styled from "@emotion/styled";

const breakpoints = [767, 768];

const mq = breakpoints.map((bp) => {
  return `@media (${bp === 767 ? "max" : "min"}-width: ${bp}px)`;
});

export const FooterItem = styled.footer({
  textAlign: "center",
  width: "100%",
  fontSize: "14px",
  fontWeight: "900",
  color: "#666",
  backgroundColor: "#e6e6e6",
  flexShrink: 0,
  [".footer"]: {
    ["&_text, &_linkbox"]: {},
    ["&_text"]: {
      marginTop: "5px",
      marginBottom: "5px",
    },
    ["&_linkbox"]: {
      marginTop: "5px",
      ["&_link"]: {
        padding: "0 5px",
        borderRight: "1px solid #666",
        whiteSpace: "nowrap",
        ["&:hover"]: {
          color: "#f24c7c",
        },
        ["&:last-of-type"]: {
          borderRight: "none",
        },
      },
    },
  },
});

export const SectionCarouselItem = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

export const SectionCarouselContainer = styled.div({});
