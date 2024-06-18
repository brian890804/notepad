import { useCallback, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import styled from "@emotion/styled/macro";

import toTopAnime from "../../assets/public/top.json";
import { connect } from "react-redux";
import { updateScrollToTopStateAction } from "../../reducers/actions/config";
import { bottom_nav_height } from "./BottomNavBar";

const ScrollToTop = ({ status = false }) => {
  const animeRef = useRef();
  function pause() {
    animeRef.current.pause();
    animeRef.current.goToAndStop(300, true);
  }
  function play() {
    animeRef.current.play();
  }
  useEffect(() => {
    animeRef.current.goToAndStop(300, true); // (幾豪秒的動畫,要不要秀)
  }, []);
  const scrollToTop = useCallback(() => {
    pause();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <ScrollToTopElement status={status}>
      <Lottie
        onClick={scrollToTop}
        onMouseLeave={pause}
        onMouseEnter={play}
        className={`animation ${status && "active"}`}
        animationData={toTopAnime}
        lottieRef={animeRef}
      />
    </ScrollToTopElement>
  );
};
const ScrollToTopElement = styled.div`
  /*  */
  .animation {
    display:none;
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 11;
    background-color: #fff;
    border-radius: 60px;
    opacity: 0;
    @media (max-width: 599px) {
      width: 60px;
      height: 60px;
      right: 0%;
      bottom: ${ bottom_nav_height+5}px;
    }
    &.active {
      display:block;
      opacity: 1;
      transition: 1s;
      cursor: pointer;
    }
  }
`;
const ScrollToTopStateToProps = (state) => {
  return {
    status: state.scrollToTopStatus,
  };
};

const ScrollToTopDispatchToProps = () => {
  return {};
};
export default connect(
  ScrollToTopStateToProps,
  ScrollToTopDispatchToProps
)(ScrollToTop);
