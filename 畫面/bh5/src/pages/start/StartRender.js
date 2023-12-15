import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";

import LoadingContent, {
  LoadingContentElement,
} from "./component/LoadingContent";

import PopAdsCover, { PopAdsCoverElement } from "./component/PopAdsCover";

import DownloadCover, { DownloadCoverElement } from "./component/DownloadCover";

import startpageBg from "../../assets/start/startpage.jpg";

import PropTypes from "prop-types";
import { checkDataExpired } from "../../reducers/actions/utilities";
import useMediaSetting from "../../reackHook/useMediaSetting";

const StartPage = ({ loadingStr, popAdsImg, closeAds, adsList }) => {
  const { isMobile } = useMediaSetting();
  const [downloadShow, setDownloadShow] = useState(!isMobile);
  // useEffect(() => {
  //   console.log(window.localStorage.getItem("downloadTime", Date.now()), "222");
  //   if (checkDataExpired("downloadTime", 1000 * 60 * 60)) {
  //     window.localStorage.setItem("downloadTime", Date.now());
  //     setDownloadShow(true);
  //   }
  // }, []);
  useEffect(() => {
    if (!isMobile) {
      setTimeout(() => closeAds(), 500);
    }
  }, [isMobile]);
  return (
    <StartPageElement isMobile={isMobile}>
      {isMobile && (
        <React.Fragment>
          <PopAdsCover
            popAdsImg={popAdsImg}
            closeAds={closeAds}
            adsList={adsList}
          />
          <LoadingContent loadingStr={loadingStr} />
        </React.Fragment>
      )}
    </StartPageElement>
  );
};

StartPage.propTypes = {
  loadingStr: PropTypes.string.isRequired,
};

export default StartPage;

const StartPageElement = styled.div`
  /*  */
  position: relative;
  z-index: 21;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #fff;
  background-image: url(${({ isMobile }) => isMobile && startpageBg});
  ${LoadingContentElement} {
    position: absolute;
    bottom: 11%;
    left: 50%;
    transform: translateX(-50%);
  }
  ${DownloadCoverElement} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
  }
  ${PopAdsCoverElement} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
`;
