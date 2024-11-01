// import PropTypes from "prop-types";
import styled from "@emotion/styled/macro";
import useMediaSetting from "../../reackHook/useMediaSetting";

export let main_height = window.innerWidth > 768 ? 72 : 50;

export let sub_height = window.innerWidth > 768 ? 42 : 38;

export let sub_fontSize = window.innerWidth > 768 ? 20 : 12;
/**
 * @description box
 *
 * @param {*} { children }
 * @return {*}
 */
const TopBarContainer = ({
  not_fixed = false,
  show_shadow = true,
  children,
  z_index = 10,
  backgroundColor = "transparent",

}) => {
  const { isMobile } = useMediaSetting();
  main_height = !isMobile ? 72 : 50;

  sub_height = !isMobile ? 42 : 38;

  sub_fontSize = !isMobile ? 20 : 16;
  return (
    <TopBarContainerElement
      not_fixed={not_fixed}
      show_shadow={show_shadow}
      z_index={z_index}
      backgroundColor={backgroundColor}
    >
      {children}
    </TopBarContainerElement>
  );
};

TopBarContainer.propTypes = {
  // location: PropTypes.string.isRequired
};

export default TopBarContainer;

const TopBarContainerElement = styled.header`
  /*  */
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: ${({ not_fixed }) => (not_fixed ? "absolute" : "fixed")};
  top: 0;
  right: 0;
  left: 0;
  z-index: ${({ z_index }) => z_index};
  width: 100%;
  margin: auto;
  ${({ show_shadow }) =>
    show_shadow ? "box-shadow: 0 1px 0px 0 rgb(0 0 0 / 30%);" : ""}
  @media (min-width: 599px) {
    max-width: 100%;
  }
`;
