import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../modules/scrollEvent";
// import PropTypes from "prop-types";

import PostCardItem from "../postsMainNew//component/PostCardItem";

import girl404 from "../../assets/imgPlaceholder/girl404.png";
import { colors } from "../../constants";
import { clearScrollPage } from "../../reducers/actions/historyActions";
import useMediaSetting from "../../reackHook/useMediaSetting";
import LoadingSkeleton from "../component/LoadingSkeleton";

const PostsMainTrackPage = ({
  postTrackData,
  initPostTrackData,
  updatePostTrackData,
  pushToNew,
  refreshData,
}) => {
  const location = useLocation();
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    //如果再當前頁面在點一次側欄
    if (refreshData || postTrackData.postTrack.length === 0) {
      initPostTrackData();
      clearScrollPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      if (!postTrackData.isDone) {
        updatePostTrackData(scrollColdEnd);
      }
    });
  }
  return (
    <PostsMainTrackPageElement hasData={postTrackData.postTrack.length > 0}>
      <div className="container">
        {postTrackData.postTrack?.map((data, index) => {
          return (
            <div className="post_main_track_item" key={index}>
              <LoadingSkeleton>
                <PostCardItem postData={data} index={index} key={data.id} />
              </LoadingSkeleton>
            </div>
          );
        })}
        {postTrackData.postTrack.length === 0 ? (
          <div className="container_empty">
            <img className="container_empty_girl_img" src={girl404} alt="404" />
            <p className="container_empty_girl_text">
              {intl.formatMessage({ id: "GLOBAL.TIP.NOTHING" })}
            </p>
            <div className="container_empty_btn" onClick={pushToNew}>
              <span className="container_empty_btn_text">
                {intl.formatMessage({ id: "POST.GO_SEARCH" })}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </PostsMainTrackPageElement>
  );
};

PostsMainTrackPage.propTypes = {
  // title: PropTypes.string,
  // content: PropTypes.string,
  // noticeId: PropTypes.number
};

export default PostsMainTrackPage;

export const PostsMainTrackPageElement = styled.div`
  /*  */
  height: 100%;
  background-color: #f3f4f5;
  @media (min-width: 899px) {
    width: 600px;
  }
  .container {
    height: 100%;
    min-height: 100vh;
    background-color: ${({ hasData }) => !hasData && "#fff"};
  }
  @media (max-width: 899px) {
    background-color: #f3f4f5;
  }
  .post_main_track_item {
    margin-bottom: 0.25em;
  }
  .container_empty {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;

    &_girl {
      &_img {
        margin-top: 20px;
        width: 150px;
        @media (max-width: 899px) {
          width: 100px;
        }
      }

      &_text {
        margin-top: 15px;
        font-size: 14px;
        color: ${colors.text_grey};
      }
    }

    &_btn {
      cursor: pointer;
      display: inline-block;
      padding: 18px;
      margin-top: 15px;
      width: 200px;
      font-size: 20px;
      text-align: center;
      color: #fff;
      @media (max-width: 899px) {
        width: 150px;
        padding: 5px 10px;
        font-size: 18px;
      }
      background-image: linear-gradient(
        to bottom,
        #fa83b3 0%,
        #f45c8c 50%,
        #f24c7c 100%
      );
      border-radius: 36px;
    }
  }
`;
