import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled/macro";

import announcement_cover_bg from "../../assets/coverpage/announcement_cover_bg.png";
import announcement_cover_title from "../../assets/coverpage/announcement_cover_title.svg";
import CloseComponent, { CloseComponentElement } from "./CloseComponent";
import axiosRequest from "../../modules/axiosItem";
import { colors, downloadPage, requestUrlConstants } from "../../constants";
import { toggleAnnouncementCoverAction } from "../../reducers/actions/showCoverCenter";
import LinkComponent from "./LinkComponent";

const AnnouncementCover = ({ closeAnnouncementCover }) => {
  const [announcementHtml, setAnnouncementHtml] = useState("");

  useEffect(() => {
    axiosRequest
      .get(requestUrlConstants.getHomeAnnouncementUrl)
      .then((data) => {
        setAnnouncementHtml(data.remark);
      });
  }, []);

  return (
    <AnnouncementCoverElement>
      <div className="announcement_container">
        <div className="announcement_container_title">
          <img
            className="announcement_container_title_img"
            src={announcement_cover_title}
            alt="announcement title"
          />
        </div>
        <div
          className="announcement_container_content"
          dangerouslySetInnerHTML={{
            __html: announcementHtml,
          }}
        />
        <LinkComponent
          className="announcement_container_btn"
          routes={{
            linkurl: downloadPage[2],
          }}
        >
          <span className="announcement_container_btn_text">应用中心</span>
        </LinkComponent>
        <div className="announcement_container_close">
          <CloseComponent styleType={1} callback={closeAnnouncementCover} />
        </div>
      </div>
    </AnnouncementCoverElement>
  );
};

const AnnouncementCoverStateToProps = (state) => {
  return {};
};

const AnnouncementCoverDispatchToProps = (dispatch) => {
  return {
    closeAnnouncementCover: () => {
      dispatch(toggleAnnouncementCoverAction());
    },
  };
};

export default connect(
  AnnouncementCoverStateToProps,
  AnnouncementCoverDispatchToProps
)(AnnouncementCover);

export const AnnouncementCoverElement = styled.div`
  /*  */

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-bottom: 2%;
  background-color: #0009;

  .announcement_container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 40% 5px 5px 5px ;
    box-sizing: border-box;
    max-width: 350px;
    width: 80%;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-image: url(${announcement_cover_bg});
    border-radius: 10px;
    @media(min-width:599px){
      padding: 10% 10px 10px;
    }

    &::after {
      content: "";
      position: absolute;
      top: 25%;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background-color: #fff;
      border-radius: 10px;
    }

    &_title {
      flex-shrink: 0;
      margin-bottom: 5px;

      &_img {
        width: 100%;
        vertical-align: middle;
      }
    }

    &_content {
      overflow: auto;

      * {
        width: 100%;
        font-size: max(15px, 0.5rem) !important;
        line-height: 1.3rem;
      }
    }

    &_btn {
      cursor: pointer;
      padding: 10px 0;
      margin: auto;
      margin-top: 5px;
      width: 200px;
      text-align: center;
      text-decoration: none;
      color: #fff;
      background-color: ${colors.dark_pink};
      border-radius: 30px;
    }

    &_close {
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%);
      ${CloseComponentElement} {
        width: 50px;
        height: 50px;
      }
    }
  }
`;
