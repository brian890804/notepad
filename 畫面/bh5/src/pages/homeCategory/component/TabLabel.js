import React from "react";
import styled from "@emotion/styled/macro";
import { colors } from "../../../constants";

const TabLabel = ({ text, onClick, active }) => {
  return (
    <TabLabelElement 
      onClick={onClick} 
      active={active}
      className={active ? "active" :　""}
    >
      {text}
    </TabLabelElement>
  );
};

export default TabLabel;

export const TabLabelElement = styled.div`/*  */
  cursor: pointer;
  display: inline-block;
  padding: 5px 12px;
  margin: 4px 4px 4px 0;
  font-size: 16px;
  line-height: 16px;
  word-break: keep-all;
  transition: 0.1s;
  font-weight: 700;

  &.active {
    color: ${colors.dark_pink};
    background-color: ${ colors.back_grey };
    border-radius: 5px;
  }
`;
