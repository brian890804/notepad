import React from "react";
import styled from "@emotion/styled/macro";
import { bottom_nav_height } from "../../component/BottomNavBar";
import { adsKeys, breakPoint } from "../../../constants";
import ImageCarousel from "../../component/ImageCarousel";
import CloseComponent, {
  CloseComponentElement,
} from "../../component/CloseComponent";
import useMediaSetting from "../../../reackHook/useMediaSetting";

const FloatAds = ({ closeHomeFloatAds, callback }) => {
  const { isMobile } = useMediaSetting();
  return (
    <FloatAdsElement
      noBottomNav={window.location.href.includes("/home/main/category/")}
    >
      <div className="container">
        <div className="container_close">
          <CloseComponent
            callback={() => {
              closeHomeFloatAds();
            }}
          />
        </div>
        <div className="container_slider">
          <ImageCarousel
            adsKey={adsKeys.home_side_move_banner}
            callback={callback}
            size="banner_float"
          />
        </div>
      </div>
    </FloatAdsElement>
  );
};

export default FloatAds;

export const FloatAdsElement = styled.div`
  /*  */
  position: fixed;
  right: 0;
  bottom: 0px;
  @media (max-width: ${breakPoint.mobile}px) {
    bottom: ${({ noBottomNav }) => !noBottomNav && bottom_nav_height}px;
  }
  left: 0;
  z-index: 11;
  margin: auto;
  max-width: 599px;

  .container {
    position: relative;

    &_close {
      position: absolute;
      top: 0px;
      right: 0px;
      z-index: 2;
      ${CloseComponentElement} {
        width: 25px;
        height: 25px;
      }
    }

    &_slider {
      transform: translate(0, 0);
      overflow: hidden;
      width: 100%;
      border-radius: 100px;
    }
  }
`;
