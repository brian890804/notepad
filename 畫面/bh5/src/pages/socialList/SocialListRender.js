import React, { useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../modules/scrollEvent";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import SocialCard from "./component/SocialCard";
import TopTitleBar from "../component/TopTitleBar";
import ImageCarousel from "../component/ImageCarousel";
import { adsKeys, colors, padding, pageUrlConstants } from "../../constants";

import paperPlaneIcon from "../../assets/icons/paper_plane.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { bottom_nav_height } from "../component/BottomNavBar";

import LinkComponent from "../component/LinkComponent";
import { CSSTransition } from "react-transition-group";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import MobileSocialAds from "./component/MobileSocialAds";
import PCSocialAds from "./component/PCSocialAds";

const { social } = pageUrlConstants;

// import PropTypes from "prop-types";
const SocialListPage = ({
  citId,
  localName,
  list,
  isDone,
  updateSociaktData,
  clickSocialCardEvent,
  token,
}) => {
  const lastTime = window.localStorage.getItem("MobileSocialAds");
  const { isMobile } = useMediaSetting();
  const intl = useIntl();
  const [showStationed, setShowStationed] = useState(!lastTime);

  const showList = useMemo(() => {
    const splitList = [];
    const copyList = [...list];

    while (copyList.length > 12) {
      splitList.push(copyList.splice(0, 12));
    }

    splitList.push(copyList);

    return splitList;
  }, [list]);
  useEffect(() => {
    if (!list.length) {
      updateSociaktData(citId);
    }
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      if (!isDone) {
        updateSociaktData(citId, scrollColdEnd);
      }
    });
  }

  // const getFirstParagraph = (html) => {
  //   const arr = [
  //     ...html.matchAll(
  //       /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g
  //     ),
  //   ];
  //   const str = arr.join("");

  //   return str.length > 15 ? str.substr(0, 15) + "..." : str;
  // };

  return (
    <SocialListPageElement>
      <TopBarContainer>
        {isMobile ? (
          <TopTitleBar
            title={intl.formatMessage({
              id: "SOCIAL.LIST.INFO.LABEL.AND_CHILL",
            })}
          >
            <span
              className="social_title"
              onClick={() => {
                setShowStationed(true);
              }}
            >
              {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.SETTLED" })}
            </span>
          </TopTitleBar>
        ) : (
          <WebTopBar />
        )}
      </TopBarContainer>
      <ImageCarousel
        adsKey={adsKeys.social_top_banner}
        threeInOneBanner={!isMobile}
        is_cover
        size="banner_main"
      />
      {isMobile ? (
        <MobileSocialAds
          token={token}
          showStationed={showStationed}
          setShowStationed={setShowStationed}
        />
      ) : (
        <PCSocialAds token={token} />
      )}
      <div className="social_list ">
        <div className="social_list_nav">
          <div className="social_list_nav_position ">
            <img
              className="social_list_nav_position_icon"
              src={paperPlaneIcon}
              alt="paper planeIcon"
            />
            <span className="social_list_nav_position_text">
              {intl.formatMessage({
                id: "SOCIAL.LIST.INFO.LABEL.POSITION.NOW",
              })}
              ：{localName}
            </span>
          </div>
          <LinkComponent
            className="social_list_nav_link "
            routes={{
              name: social.pages.socialSelectLocal.name,
              path: social.pages.socialSelectLocal.path,
            }}
          >
            <span className="social_list_nav_link_text">
              {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.SELECT.CITY" })}
            </span>
            <FontAwesomeIcon
              className="social_list_nav_link_icon"
              icon={faAngleRight}
            />
          </LinkComponent>
        </div>
        {(showList || []).map((group, index) => {
          return (
            <React.Fragment key={`image-group-${index}`}>
              <div className="container px-indent">
                <Grid container direction="row" alignItems="center" spacing={2}>
                  {group.map((data) => (
                    <Grid
                      className="social_list_container_card fw-s cursor "
                      item
                      md={2}
                      xs={12}
                      key={data.id}
                      onClick={() => {
                        clickSocialCardEvent(data.id, data.nick_name);
                      }}
                    >
                      <SocialCard data={data} />
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className="split_container">
                {!isMobile && index !== showList.length - 1 && (
                  <ImageCarousel
                    adsKey={adsKeys.anime_interval}
                    threeInOneBanner={!isMobile}
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </SocialListPageElement>
  );
};

SocialListPage.propTypes = {
  // loadingStr: PropTypes.string.isRequired,
};

export default SocialListPage;

const SocialListPageElement = styled.div`
  /*  */
  display: block;
  padding-top: ${main_height}px;
  padding-bottom: ${bottom_nav_height}px;
  .social_title {
    font-weight: 900;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .split_container {
    width: 100%;
    padding: 16px 0;
  }

  .social_list {
    &_nav {
      display: flex;
      justify-content: space-between;
      padding: 1em 10%;
      @media (max-width: 599px) {
        padding: 1em 5%;
      }

      &_position {
        &_icon {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }

        &_text {
          margin-left: 10px;
          vertical-align: middle;
        }
      }

      &_link {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 0 0 5px;
        text-decoration: none;
        color: #000;

        &_icon {
          margin-left: 10px;
        }
      }
    }
  }
`;
