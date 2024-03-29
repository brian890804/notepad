/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { useLocation } from "react-router";

import SwitchRoute from "../component/SwitchRoute";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { applyOriginal, pageUrlConstants } from "../../constants";
import ImageCarousel from "../component/ImageCarousel";
import { adsKeys } from "../../constants";
import useMediaSetting from "../../reackHook/useMediaSetting";
import TopPressBar from "../component/TopPressBar";
import AsideGuide from "./component/AsideGuide";
import AsideRecommend from "./component/AsideRecommend";

import newPostIcon from "../../assets/post/newpost_nor.png";
import followIcon from "../../assets/post/follow_nor.png";
import recommendIcon from "../../assets/post/recommend_nor.png";
import noticeIcon from "../../assets/post/notice_nor.png";

import newPostPressIcon from "../../assets/post/newpost_press.png";
import followPressIcon from "../../assets/post/follow_press.png";
import recommendPressIcon from "../../assets/post/recommend_press.png";
import noticePressIcon from "../../assets/post/notice_press.png";

import newsIcon from "../../assets/topbar/news.svg";
import moneyIcon from "../../assets/post/money.svg";

import store from "../../store";
import { getRecommendList } from "./PostMainAction";
import { setPcFooter } from "../../reducers/actions/controlPcFooter";

const { login, post } = pageUrlConstants;
function PostsMain({
  user,
  showTip,
  routes,
  clickTabLabel,
  floatBtnClick,
  getRecommendList,
  setPcFooter,
  recommendList,
  PCFooterStatus,
}) {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  const location = useLocation();
  const [topAreaShow, setTopAreaShow] = useState();
  const [recommendOriginalTipShow, setRecommendOriginalTipShow] = useState(
    location.pathname.split("/")[3] === "recommend"
  );

  useLayoutEffect(() => {
    getRecommendList();
  }, []);

  useEffect(() => {
    switch (location.pathname.split("/")[3]) {
      case "dynamic":
      case "add":
      case "notice":
      case "profile":
      case "original":
      case "dynamicTag":
        setTopAreaShow(false);
        break;
      case "recommend":
        setRecommendOriginalTipShow(true);
        setTopAreaShow(true);
        break;
      default:
        setRecommendOriginalTipShow(false);
        setTopAreaShow(true);
        break;
    }
  }, [location]);

  let labelList = {
    new: {
      name: intl.formatMessage({ id: "POST.NEWS" }),
      icon: newPostIcon,
      pressIcon: newPostPressIcon,
    },
    track: {
      name: intl.formatMessage({ id: "POST.FOCUS" }),
      icon: followIcon,
      pressIcon: followPressIcon,
    },
    recommend: {
      name: intl.formatMessage({ id: "POST.RECOMMEND" }),
      icon: recommendIcon,
      pressIcon: recommendPressIcon,
    },
    notice: {
      name: intl.formatMessage({ id: "POST.NOTICE" }),
      icon: noticeIcon,
      pressIcon: noticePressIcon,
    },
  };
  let mobileLabelList = {
    new: {
      name: intl.formatMessage({ id: "POST.NEWS" }),
      icon: newPostIcon,
      pressIcon: newPostPressIcon,
    },
    track: {
      name: intl.formatMessage({ id: "POST.FOCUS" }),
      icon: followIcon,
      pressIcon: followPressIcon,
    },
    recommend: {
      name: intl.formatMessage({ id: "POST.RECOMMEND" }),
      icon: recommendIcon,
      pressIcon: recommendPressIcon,
    },
  };

  useEffect(() => {
    setPcFooter(false);
  }, [location, PCFooterStatus]);

  const goToApplyOriginal = () => {
    window.open(applyOriginal);
  };
  return (
    <PostsMainElement
      showRightArea={location.pathname.split("/")[3] !== "original"}
    >
      {!isMobile && (
        <TopBarContainer>
          <WebTopBar />
        </TopBarContainer>
      )}
      {topAreaShow && ( //PC版留言跟Mobile 評論、發布畫面不同需額外控制
        <>
          {isMobile && (
            <React.Fragment>
              <TopTitleBar title={intl.formatMessage({ id: "POST.DYNAMIC" })}>
                <img
                  src={newsIcon}
                  alt="newsIcon"
                  className="top_img"
                  onClick={() => clickTabLabel("notice")}
                />
              </TopTitleBar>
              {user.is_creation === 0 && (
                <div
                  className={`post_apply_original ${
                    recommendOriginalTipShow && " open"
                  }`}
                  onClick={goToApplyOriginal}
                >
                  <div className="post_apply_original_left">
                    <img src={moneyIcon} alt="money" />
                    轻松赚取高薪！同时看得开心！
                  </div>
                  <div className="post_apply_original_right">
                    申请成为原创主＞
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
          <ImageCarousel
            adsKey={adsKeys.home}
            threeInOneBanner={!isMobile}
            is_cover
            size="banner_main"
          />
          {isMobile && (
            <TopPressBar labelList={mobileLabelList} callback={clickTabLabel} />
          )}
        </>
      )}

      <div className="layout">
        {!isMobile && (
          <aside className="aside_container sticky_left">
            <AsideGuide
              showTip={showTip}
              user={user}
              labelList={labelList}
              callback={clickTabLabel}
              floatBtnClick={floatBtnClick}
            />
          </aside>
        )}
        <article className="container">
          <SwitchRoute routes={routes} routesStep={3} />
        </article>
        {!isMobile && location.pathname.split("/")[3] !== "original" && (
          <AsideRecommend recommendList={recommendList} />
        )}
      </div>
    </PostsMainElement>
  );
}

const PostsMainStateToProps = (state, ownProps) => {
  const breadcrumbsLength = state.breadcrumbs.length;
  return {
    routes: ownProps.routes,
    recommendList: state.postRecommend,
    PCFooterStatus: state.pcFooter.show,
    showTip:
      state.breadcrumbs[breadcrumbsLength - 2]?.path === "/posts/main/add" &&
      !state.user.is_creation,
    user: state.user,
  };
};

const PostsMainDispatchToProps = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(
        pushRoutes(
          post.pages.postMain.pages["postMain" + upCass + key.slice(1)]
        )
      );
    },
    floatBtnClick: () => {
      let user = store.getState().user;
      if (user.id === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(pushRoutes(post.pages.postMain.pages.postAdd));
      }
    },
    getRecommendList: () => {
      dispatch(getRecommendList());
    },
    setPcFooter: (boolean) => {
      dispatch(setPcFooter(boolean));
    },
  };
};

export default withRouter(
  connect(PostsMainStateToProps, PostsMainDispatchToProps)(PostsMain)
);

const PostsMainElement = styled.div`
  /*  */
  background-color: #f3f4f5;
  @media (min-width: 899px) {
    padding-bottom: 0;
    padding-top: ${main_height}px;
  }
  .top_img {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }
  .layout {
    @media (min-width: 899px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0.5em;
      padding: 0% 5%;
    }
    @media (min-width: 1024px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0.5em;
      padding: 0% 10%;
    }
    @media (min-width: 1440px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0.5em;
      padding: 0% 10%;
    }
  }

  .container {
    position: relative;
    width: 100%;
    @media (min-width: 899px) {
      min-width: 600px;
      width: ${({ showRightArea }) => (showRightArea ? "600px" : "1000px")};
    }
  }

  .aside_container {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    white-space: nowrap;
    height: 100%;
    width: 100%;
    max-width: 300px;
    &.sticky {
      &_left {
        position: sticky;
        top: ${main_height}px;
      }
    }
  }

  .post {
    &_apply_original {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      background: #fffbeb;
      opacity: 0;
      height: 0;
      transition: 0.5s;
      @media (min-width: 899px) {
        display: none;
      }
      &.open {
        opacity: 1;
        padding: 10px;
        height: auto;
        cursor: pointer;
      }
      &_left {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        img {
          width: 20px;
          margin-right: 5px;
        }
      }
      &_right {
        color: #ffb000;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;
