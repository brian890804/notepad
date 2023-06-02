import React from "react";

import styled from "@emotion/styled";
import {
  ImageBox,
  ImageItem,
} from "./SectionHighLightComponents/SectionHighLightElement";


class SectionHighLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SectionHighLightElement>
      </SectionHighLightElement>
    );
  }
}
const SectionHighLightElement = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
  @media (min-width: 768px) {
    padding: 0 15em;
  }
`;
export { SectionHighLight };
