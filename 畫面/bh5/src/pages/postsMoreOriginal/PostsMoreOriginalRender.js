import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import { pageUrlConstants } from "../../constants";
import TopTitleBar from "../component/TopTitleBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { useIntl } from "react-intl";
import ImageComponent from "../component/ImageComponent";
import scrollBottomCallEvent from "../../modules/scrollEvent";
import LinkComponent from "../component/LinkComponent";

const PostsMoreOriginalPage = ({
  postGetRecommendOriginal,
  postRecommendList,
}) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    if (parseInt(postRecommendList.page) === 0) {
      postGetRecommendOriginal("init", () => {});
    }
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      if (!postRecommendList.isDone) {
        postGetRecommendOriginal("update", scrollColdEnd);
      }
    });
  }

  return (
    <PostsMoreOriginalPageElement>
      <TopBarContainer not_fixed={!isMobile} z_index={5}>
        <TopTitleBar
          textAlign={isMobile ? "center" : "start"}
          showBack={isMobile}
          title={intl.formatMessage({ id: "POST.RECOMMEND_ORIGINAL" })}
          show_back_color={isMobile && "#000"}
          back_color={isMobile && "#fff"}
          color={isMobile && "#000"}
        />
      </TopBarContainer>
      <div className="content">
        {postRecommendList?.list?.map((data) => (
          <div key={data.uid} className="postRecommendList_item">
            <LinkComponent
              routes={{
                name: pageUrlConstants.post.pages.postMain.pages.postProfile
                  .name,
                path: pageUrlConstants.post.pages.postMain.pages.postProfile
                  .path,
                dynamic: {
                  profileId: data.uid,
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
            <div
              className="postRecommendList_item_cover"
              style={{ pointerEvents: "none" }}
            >
              <span>{data.nick_name}</span>
            </div>
          </div>
        ))}
      </div>
    </PostsMoreOriginalPageElement>
  );
};

PostsMoreOriginalPage.propTypes = {
  // title: PropTypes.string,
  // content: PropTypes.string,
  // noticeId: PropTypes.number
};

export default PostsMoreOriginalPage;

export const PostsMoreOriginalPageElement = styled.div`
  /*  */
  background: #fff;
  min-height: 120vh;
  padding: 15px;
  padding-top: ${main_height}px;

  .divider {
    height: 1px;
    width: 60%;
    background-color: #a8a8a8;
    margin-top: 20px;
  }
  .content {
    display: grid;
    padding-top: 10px;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: auto;
    gap: 20px;
    @media (max-width: 898px) {
      grid-template-columns: repeat(2, auto);
      grid-template-rows: auto;
    }
  }
  .postRecommendList {
    &_item {
      position: relative;
      &_cover {
        position: absolute;
        bottom: 0;
        right: 0;
        background: rgba(1, 0, 1, 0.68);
        height: 25px;
        color: #fff;
        display: flex;
        width: 100%;
        align-items: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        span {
          padding-left: 10px;
        }
      }
    }
  }
`;
