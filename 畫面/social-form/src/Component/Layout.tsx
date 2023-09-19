import React from "react";
import styled from "@emotion/styled";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return <LayoutElement>{children}</LayoutElement>;
};

export default Layout;
export const LayoutElement = styled.div`
  /*  */
  text-align: center;
  margin: 0 auto;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  padding: 5%;
  @media (min-width: 1680px) {
    padding: 5% 20%;
  }
  @media (max-width: 599px) {
    padding: 2%;
  }
`;
