import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import scrollBottomCallEvent from "../../modules/scrollEvent";
// import PropTypes from "prop-types";
import paperAddIcon from "../../assets/icons/paper_add.svg";
import { bottom_nav_height } from "../component/BottomNavBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import PostCardItem from "../postsMainNew/component/PostCardItem";
import girl404 from "../../assets/imgPlaceholder/girl404.png";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { useIntl } from "react-intl";
import { colors } from "@mui/material";

const PostsSameTagListPage = ({
  postSameTagList,
  updatePostSameListTagData,
  initPostSameListTagData,
  floatBtnClick,
  backRoutes,
  title,
  getPostTags,
}) => {
  const intl = useIntl();
  const { size, isMobile } = useMediaSetting();
  const { width } = size;
  useEffect(() => {
    getPostTags();
    // if (parseInt(postSameTagList.page) === 0) {
    initPostSameListTagData();
    // }
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      if (!postSameTagList.isDone) {
        updatePostSameListTagData(scrollColdEnd);
      }
    });
  }

  return (
    <PostsSameTagListPageElement>
      <TopBarContainer not_fixed={!isMobile} z_index={5}>
        <TopTitleBar
          title={title}
          showBack={true}
          show_back_color={"#000"}
          back_color={"#fff"}
          color={"#000"}
        />
      </TopBarContainer>
      <section className="post_main_container">
        {postSameTagList.list.map((data, index) => {
          return (
            <div key={data.id} className="post_main_item">
              <PostCardItem postData={data} index={index} />
            </div>
          );
        })}
        {postSameTagList.list.length === 0 ? (
          <div className="container_empty">
            <div className="container_empty_girl">
              <img
                className="container_empty_girl_img"
                src={girl404}
                alt="404"
              />
              <p className="container_empty_girl_text">
                {intl.formatMessage({ id: "GLOBAL.TIP.NOTHING" })}
              </p>
            </div>
            <div className="container_empty_btn" onClick={backRoutes}>
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
    </PostsSameTagListPageElement>
  );
};

PostsSameTagListPage.propTypes = {
  // title: PropTypes.string,
  // content: PropTypes.string,
  // noticeId: PropTypes.number
};

export default PostsSameTagListPage;

export const PostsSameTagListPageElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  @media (max-width: 899px) {
    background-color: #f3f4f5;
  }
  .post_main {
    &_container {
      display: flex;
      flex-direction: column;
      min-height: 150vh;
    }

    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 5px;
    }
  }
  .container_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    min-height: 150vh;
    &_girl {
      margin-top: 20px;

      &_img {
        width: 150px;
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
