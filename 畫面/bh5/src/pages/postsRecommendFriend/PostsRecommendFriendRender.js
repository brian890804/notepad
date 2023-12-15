import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import { useLocation } from "react-router";
import scrollBottomCallEvent from "../../modules/scrollEvent";
// import PropTypes from "prop-types";

import PostCardItem from "../postsMainNew/component/PostCardItem";
import paperAddIcon from "../../assets/icons/paper_add.svg";
import moreIcon from "../../assets/post/more_nor.svg";
import { bottom_nav_height } from "../component/BottomNavBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { colors, pageUrlConstants } from "../../constants";
import { useIntl } from "react-intl";
import { clearScrollPage } from "../../reducers/actions/historyActions";
import ImageComponent from "../component/ImageComponent";
import LinkComponent from "../component/LinkComponent";
import girl404 from "../../assets/imgPlaceholder/girl404.png";
import LoadingSkeleton from "../component/LoadingSkeleton";

const PostsRecommendFriendRender = ({
  postListData,
  updatePostListData,
  initPostListData,
  floatBtnClick,
  refreshData,
  postRecommendList,
  postGetRecommendOriginal,
  pushToNew,
}) => {
  const location = useLocation();
  const intl = useIntl();
  const { size, isMobile } = useMediaSetting();
  const { width } = size;
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //如果再當前頁面在點一次側欄
    if (
      refreshData ||
      !postRecommendList.length ||
      !postListData?.list.length
    ) {
      initPostListData();
      postGetRecommendOriginal();
      clearScrollPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      if (!postListData.isDone) {
        updatePostListData(scrollColdEnd);
      }
    });
  }
  return (
    <PostsRecommendFriendElement>
      <section className="post_main_h5_original">
        <div className="post_main_h5_original_title">
          <div className="post_main_h5_original_title_left">推薦原創主</div>
          <LinkComponent
            className="post_main_h5_original_title_right"
            routes={pageUrlConstants.post.pages.postMain.pages.postMoreOriginal}
          >
            看更多 <img src={moreIcon} alt="more" />
          </LinkComponent>
        </div>
        <div className="post_main_h5_original_list">
          {postRecommendList.map((data) => (
            <div key={data.id} className="post_main_h5_original_list_item">
              <LinkComponent
                routes={{
                  name: pageUrlConstants.post.pages.postMain.pages.postProfile
                    .name,
                  path: pageUrlConstants.post.pages.postMain.pages.postProfile
                    .path,
                  dynamic: {
                    profileId: data.id,
                  },
                }}
              >
                <ImageComponent
                  is_cover
                  src={data.avatar}
                  alt={data.nick_name}
                  title={data.nick_name}
                  height={60}
                />
              </LinkComponent>
              <div className="post_main_h5_original_list_item_cover">
                <span>{data.nick_name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="post_main_container">
        {postListData.list.map((data, index) => {
          return (
            <div key={data.id} className="post_main_item">
              <LoadingSkeleton>
                <PostCardItem postData={data} index={index} />
              </LoadingSkeleton>
            </div>
          );
        })}
        {postListData.list.length === 0 ? (
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
      </section>

      {/* <FloatBtn
        style={{
          transform: "translateX(-50%) translateX(" + width * 0.48 + "px)",
        }}
        onClick={floatBtnClick}
      >
        <img className="float_btn_img" src={paperAddIcon} alt="btnPost" />
      </FloatBtn> */}
    </PostsRecommendFriendElement>
  );
};

PostsRecommendFriendRender.propTypes = {
  // title: PropTypes.string,
  // content: PropTypes.string,
  // noticeId: PropTypes.number
};

export default PostsRecommendFriendRender;

export const PostsRecommendFriendElement = styled.div`
  /*  */
  @media (max-width: 899px) {
    background-color: #f3f4f5;
    padding-top: 0;
  }
  .post_main {
    &_container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 0.25em;
    }

    &_h5_original {
      background-color: #fff;
      margin-bottom: 0.1em;
      padding: 10px 20px;
      @media (min-width: 899px) {
        display: none;
      }
      &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &_left {
          font-weight: 700;
        }
        &_right {
          display: flex;
          align-items: center;
          text-decoration: none;
          white-space: nowrap;
          color: ${colors.text_light_grey};
          img {
            height: 20px;
          }
        }
      }
      &_list {
        display: flex;
        overflow-x: scroll;
        white-space: nowrap;
        padding: 10px 0;
        gap: 10px;
        &_item {
          position: relative;
          flex-shrink: 0;
          display: inline-block;
          overflow: hidden;
          width: 40%;
          &_cover {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            background: rgba(1, 0, 1, 0.68);
            height: 20px;
            color: #fff;
            display: flex;
            width: 100%;
            align-items: center;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            span {
              padding-left: 10px;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .container_empty {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;
    min-height: 100vh;
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

export const FloatBtn = styled.div`
  /*  */
  cursor: pointer;
  position: fixed;
  right: 0;
  bottom: calc(${(bottom_nav_height + 10) * 2}px);
  left: 0;
  z-index: 1;
  overflow: hidden;
  margin: auto;
  width: 50px;
  border-radius: 50%;
  box-shadow: 3px 3px 6px #0006;
  .float_btn_img {
    width: 100%;
    vertical-align: middle;
  }
  @media (min-width: 899px) {
    display: none;
  }
`;
