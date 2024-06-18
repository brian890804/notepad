import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useIntl } from "react-intl";
import Button from "@mui/material/Button";
import WavaButton from "./WavaButton";
import { connect } from "react-redux";
import styled from "@emotion/styled/macro";
import { styled as muiStyled } from "@mui/material/styles";

import CategoryTab from "./CategoryTab";
import { colors, padding, pageUrlConstants } from "../../constants";
import InlineShareButton from "./InlineShareButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStar as fillStart,
  faShareNodes,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

import { faStar } from "@fortawesome/free-regular-svg-icons";
import { CSSTransition } from "react-transition-group";
import ImageComponent from "./ImageComponent";
import LinkComponent from "./LinkComponent";
import ReportCoverComponent from "./ReportCoverComponent";

import placeholderImg from "../../assets/imgPlaceholder/720x400.jpg";
import { handleAdClick } from "../../modules/gtmEventHandle";
import {
  navigatorShare,
  postAddWatchHistory,
} from "../../reducers/actions/utilities";
import store from "../../store";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { getContinueWatchData } from "../homeMain/HomeMainAction";

export const PlyrVideoType = {
  anime: 1,
  video: 2,
  1: "anime",
  2: "video",
};

const MuiButton = muiStyled((props) => <Button {...props} />)(({}) => ({
  "&.MuiButton-root": {
    color: "#fff",
    borderRadius: 35,
    backgroundColor: colors.back_dark_pink,
    width: "120px",
    margin: "0px 15px 15px",
    border: "1px solid #646464 ",
    fontSize: "1rem",
  },
}));
const { login } = pageUrlConstants;
let recommendTimmer;
let progressTimmer;
const ReactPlayerComponent = ({
  title,
  img,
  subTitle = "",
  tabList,
  description,
  src,
  collectEvent,
  is_collect,
  stopVideoBanner,
  videoType = PlyrVideoType.anime,
  videoId,
  videoEp,
  toLogin,
  toAnimePage,
  notLogin,
  postAddWatchHistory,
  getUpdateWatchHistory,
  type = "video", // anime 影片播完會有下一個提示
  animeNextRecommend = {}, //anime播完之後會有的下一集
  animeLastWatchTime,
}) => {
  const { isMobile } = useMediaSetting();
  const reactPlayerRef = useRef();
  const intl = useIntl();
  const [showAdsCover, setShowAdsCover] = useState(false);
  const [showAdsRandom, setShowAdsRandom] = useState(0);
  const [share_ma] = useState(store.getState().user.share_ma);
  const [reportCoverShow, setReportCoverShow] = useState(false);
  //動漫用useState
  const [showRecommendAnime, setShowRecommendAnime] = useState(false);
  const [recommendAnimeCounter, setRecommendAnimeCounter] = useState(15);

  useEffect(() => {
    recommendAnimeTimmer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRecommendAnime]);

  useEffect(() => {
    console.log(animeLastWatchTime, "animeLastWatchTime", type);
    if (type === "anime" && src)
      if (reactPlayerRef.current) {
        if (animeLastWatchTime >= 180) {
          reactPlayerRef.current.seekTo(animeLastWatchTime);
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeLastWatchTime, src]);

  function recommendAnimeTimmer() {
    setRecommendAnimeCounter(15);
    clearInterval(recommendTimmer);
    recommendTimmer = setInterval(() => {
      if (showRecommendAnime && recommendAnimeCounter > 0) {
        return setRecommendAnimeCounter((pre) => {
          if (pre > 0) {
            return pre - 1;
          } else {
            onConfirmNextAnimePlay();
            clearInterval(recommendTimmer);
            return 0;
          }
        });
      }
    }, 1000);
  }

  function shareUrl() {
    navigatorShare({
      title: title,
      text:
        "B次元真的超好看！看看我在上面发现的" +
        title +
        "\n\n立刻免费成为B次元的小伙伴" +
        (share_ma ? "，输入我的邀请码" + share_ma : "") +
        "\n",
      url: window.location.href,
    });
  }

  function reportEvent() {
    setReportCoverShow(true);
  }
  function plyrPause() {
    setShowAdsCover(true);
    setShowAdsRandom(Math.floor(Math.random() * stopVideoBanner.length));
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  function onPlayEnd() {
    exitFullscreen();
    if (type === "anime") {
      setShowRecommendAnime(true);
    }
  }

  function onCancelNextAnimePlay() {
    setShowRecommendAnime(false);
  }

  function onConfirmNextAnimePlay() {
    setShowRecommendAnime(false);
    toAnimePage(
      animeNextRecommend.id,
      animeNextRecommend.title,
      animeNextRecommend.episode
    );
  }

  function onProgress(e) {
    if (type === "anime") {
      clearTimeout(progressTimmer);
      if (e.playedSeconds > 60 * 3) {
        //3min
        progressTimmer = setTimeout(() => {
          // 執行 API 呼叫，將觀看進度儲存到伺服器
          postAddWatchHistory(videoId, videoEp, e.playedSeconds);
          getUpdateWatchHistory();
          // Your API call here...
        }, 1001); // 延遲 1 秒
      }
    }
  }
  return (
    <PlyrComponentElement isMobile={isMobile}>
      <CSSTransition
        timeout={200}
        in={reportCoverShow}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_OutOfQuotaPortal"
      >
        <ReportCoverComponent
          report_type={videoType}
          reportId={videoId}
          reportEp={videoEp}
          setReportCoverShow={setReportCoverShow}
        />
      </CSSTransition>
      <article className="g-center" style={{ backgroundColor: "black" }}>
        {!src || notLogin ? (
          <section className="ply_container">
            <div className="ply_cover" />
            {notLogin && (
              <div className="ply_tip">
                <ol>
                  <li>
                    {intl.formatMessage({
                      id: "GLOBAL.NOT_LOGIN.TIP.DESCRIPTION_1",
                    })}
                  </li>
                  <li>
                    {intl.formatMessage({
                      id: "GLOBAL.NOT_LOGIN.TIP.DESCRIPTION_2",
                    })}
                  </li>
                  <li>
                    <MuiButton onClick={toLogin}>
                      {intl.formatMessage({
                        id: "GLOBAL.NOT_LOGIN.TIP.BUTTON",
                      })}
                    </MuiButton>
                  </li>
                </ol>
              </div>
            )}

            <div ref={reactPlayerRef} style={{ display: "none" }} />
            <img src={img} className="ply_img" alt="請購買會員觀看影片" />
          </section>
        ) : (
          <section className="react_player_container">
            <ReactPlayer
              ref={reactPlayerRef}
              url={src}
              onPause={plyrPause}
              className="react_player"
              onEnded={onPlayEnd}
              loop={false}
              controls
              onProgress={onProgress}
              playing
            />
            {showRecommendAnime && (
              <section className="g-flex">
                <section className="react_player_next_container">
                  <section className="react_player_next_area ">
                    <section>
                      下一部影片将在 {recommendAnimeCounter} 秒后播放
                    </section>
                    <ImageComponent
                      cover={true}
                      src={animeNextRecommend.img}
                      alt={animeNextRecommend.title}
                      title={animeNextRecommend.title}
                      is_cover
                      height={65}
                      toFixSize
                    />
                    <section className="fw-m">
                      {animeNextRecommend.title}
                    </section>
                    <section className="g-flex-space-around mt-2">
                      <div
                        className="react_player_next_button cancel"
                        onClick={onCancelNextAnimePlay}
                      >
                        <WavaButton>
                          <div className="react_player_next_text ">取消</div>
                        </WavaButton>
                      </div>
                      <div
                        className="react_player_next_button"
                        onClick={onConfirmNextAnimePlay}
                      >
                        <WavaButton>
                          <div className="react_player_next_text">立即播放</div>
                        </WavaButton>
                      </div>
                    </section>
                  </section>
                </section>
              </section>
            )}
          </section>
        )}
      </article>
      <CSSTransition
        timeout={200}
        in={showAdsCover}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_buy_cover"
      >
        <div className="video_ads">
          <div
            className="video_ads_item"
            onClick={() => {
              handleAdClick(stopVideoBanner[showAdsRandom]);
            }}
          >
            <LinkComponent
              className="video_ads_item_a"
              routes={{
                linkurl: stopVideoBanner[showAdsRandom]
                  ? stopVideoBanner[showAdsRandom].linkurl
                  : "",
              }}
            >
              <div className="video_ads_item_title">
                <p className="video_ads_item_title_text">
                  {stopVideoBanner[showAdsRandom]
                    ? stopVideoBanner[showAdsRandom].name
                    : ""}
                </p>
              </div>
              <div className="video_ads_item_cover">
                <ImageComponent
                  src={
                    stopVideoBanner[showAdsRandom]
                      ? stopVideoBanner[showAdsRandom].picurl
                      : ""
                  }
                  alt={
                    stopVideoBanner[showAdsRandom]
                      ? stopVideoBanner[showAdsRandom].name
                      : ""
                  }
                  title={
                    stopVideoBanner[showAdsRandom]
                      ? stopVideoBanner[showAdsRandom].name
                      : ""
                  }
                  placeholderImg={placeholderImg}
                  toFixSize={true}
                  height={0}
                  border_radius={0}
                />
              </div>
            </LinkComponent>

            <div
              className="video_ads_item_close"
              onClick={(e) => {
                e.stopPropagation();
                setShowAdsCover(false);
              }}
            >
              <FontAwesomeIcon
                className="video_ads_item_close_play"
                icon={faPlay}
              />
              <span className="video_ads_item_close_text">
                {intl.formatMessage({ id: "PLY.LABEL.WATCH.CONTINUE" })}
              </span>
            </div>
          </div>
        </div>
      </CSSTransition>
      <div className="description">
        {tabList ? (
          <div className="description_tablist ">
            {tabList.map((title) => {
              return <CategoryTab title={title} type={0} key={title} />;
            })}
          </div>
        ) : (
          ""
        )}
        <div className="description_title fw-l">{title}</div>
        <div className="description_content mb-2">
          <div className="description_content_main">
            <div className="description_content_text fw-m">{description}</div>
            <div className="description_content_subTitle">{subTitle}</div>
          </div>
        </div>
        {isMobile && <InlineShareButton />}
        <div className="description_content_effect">
          <div className="description_content_effect_left">
            {!isMobile && <InlineShareButton />}
          </div>
          <div className="description_content_effect_right">
            <div className="description_content_btn" onClick={reportEvent}>
              <div className="description_content_btn_button">
                <FontAwesomeIcon
                  className="description_content_btn_button_icon"
                  icon={faBullhorn}
                />
                <span className="description_content_btn_button_text mr-3">
                  {intl.formatMessage({ id: "PLY.LABEL.REPORT" })}
                </span>
              </div>
            </div>
            <div className="description_content_btn" onClick={shareUrl}>
              <div className="description_content_btn_button">
                <FontAwesomeIcon
                  className="description_content_btn_button_icon"
                  icon={faShareNodes}
                />
                <span className="description_content_btn_button_text mr-3">
                  {intl.formatMessage({ id: "GLOBAL.ACTION.SHARE" })}
                </span>
              </div>
            </div>
            <div className="description_content_btn" onClick={collectEvent}>
              <div className="description_content_btn_button">
                <FontAwesomeIcon
                  className={
                    "description_content_btn_button_icon " +
                    (is_collect ? "light" : "")
                  }
                  icon={is_collect ? fillStart : faStar}
                />
                <span className="description_content_btn_button_text">
                  {intl.formatMessage({ id: "GLOBAL.ACTION.COLLECT" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlyrComponentElement>
  );
};

const ReactPlayerComponentStateToProps = (state, ownProps) => {
  return {
    notLogin: state.user.id == "guest",
    img: ownProps.img,
    title: ownProps.title,
    subTitle: ownProps.subTitle,
    tabList: ownProps.tabList || [],
    description: ownProps.description,
    src: ownProps.src,
    collectEvent: ownProps.collectEvent,
    is_collect: ownProps.is_collect,
    stopVideoBanner: state.adsList.stop_video_banner
      ? [...state.adsList.stop_video_banner]
      : [],
  };
};

const ReactPlayerComponentDispatchToProps = (dispatch) => {
  const { home } = pageUrlConstants;
  return {
    toLogin: () => {
      dispatch(pushRoutes(login));
    },
    toAnimePage: (id, title, episode) => {
      dispatch(
        pushRoutes({
          name:
            home.pages.homeAnimesSwitch.pages.homeAnimesContent.name +
            title +
            "-" +
            episode,
          path: home.pages.homeAnimesSwitch.pages.homeAnimesContent.path,
          dynamic: {
            animeId: id,
            animeEp: episode,
          },
        })
      );
    },
    postAddWatchHistory: (id, episode, watchSecond) => {
      dispatch(postAddWatchHistory(id, episode, watchSecond));
    },
    getUpdateWatchHistory: () => {
      dispatch(getContinueWatchData());
    },
  };
};

export default connect(
  ReactPlayerComponentStateToProps,
  ReactPlayerComponentDispatchToProps
)(ReactPlayerComponent);

export const PlyrComponentElement = styled.div`
  /*  */
  border-bottom: 1px solid #bbb;

  .video_ads {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #000a;

    &_item {
      width: 80%;
      max-width: 500px;

      &_a {
        text-decoration: none;
      }

      &_title {
        background-color: #0004;

        &_text {
          padding: 2px;
          font-size: 18px;
          color: #fff;
        }
      }

      &_close {
        cursor: pointer;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 20px);
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        color: #fff;
        background-color: #0009;
        border-radius: 10px;
        @media (min-width: 599px) {
          padding-left: 80px;
          padding-right: 80px;
        }
        &_play {
          font-size: 22px;
          vertical-align: bottom;
        }

        &_text {
          margin-left: 5px;
          font-size: 22px;
        }
      }
    }
  }

  .description {
    padding: 10px ${padding}px;
    display: flex;
    flex-direction: column;

    &_title {
      margin-top: 4px;
      font-size: 20px;
      font-weight: 900;
      margin: 2% 0%;
      @media (min-width: 599px) {
        margin: 1% 0%;
        font-size: 22px;
      }
    }

    &_content {
      color: ${colors.text_grey};
      @media (min-width: 599px) {
        display: flex;
        justify-content: space-between;
      }
      &_effect {
        display: flex;
        justify-content: space-between;
        margin: 6% 0 0 0;
        @media (min-width: 599px) {
          margin: 1% 0 0 0;
        }
        &_left,
        &_right {
          display: flex;
        }
      }
      &_text {
        font-size: 12px;
        @media (min-width: 599px) {
          margin: 0;
          font-size: 14px;
        }
      }

      &_subTitle {
        margin-right: auto;
        font-size: 14px;
        color: ${colors.dark_pink};
        font-weight: 700;
      }

      &_btn {
        display: flex;
        align-items: center;
        word-break: keep-all;

        &_button {
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 20px;

          &_icon {
            margin-right: 10px;
            font-size: 18px;

            &.light {
              color: ${colors.light_star};
            }
          }

          &_text {
            font-weight: 900;
          }
        }
      }
    }
  }

  .ply {
    &_container {
      position: relative;
      height: 200px;
      @media (min-width: 599px) {
        height: 50vh;
      }
    }
    &_cover {
      position: absolute;
      background-color: black;
      opacity: 0.5;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    &_tip {
      color: #fff;
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &_img {
      width: 100%;
      height: 100%;
    }
  }
  ol {
    list-style: none;
  }
  li {
    margin: 20px;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    @media (min-width: 599px) {
      font-size: 2rem;
    }
  }

  .react_player {
    min-height: ${({ isMobile }) => (isMobile ? "300px" : "360px")}!important;
    height: ${({ isMobile }) => (isMobile ? "300px" : "100%")}!important;
    width: 100% !important;
    &_container {
      position: relative;
      width: 50%;
      @media (max-width: 899px) {
        width: 100%;
      }
    }
    &_next {
      &_container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        background-color: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
        color: rgba(255, 255, 255, 0.76);
        padding: 1rem 0;
      }
      &_area {
        width: ${({ isMobile }) => !isMobile && "50%"};
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      &_button {
        width: 40%;
        cursor: pointer;
        flex-shrink: 0;
        display: inline-block;
        overflow: hidden;
        color: #fff;
        background-color: ${colors.dark_pink};
        border-radius: 30px;
        &.cancel {
          background-color: rgba(250, 113, 154, 0.2);
        }
      }
      &_text {
        text-align: center;
        padding: 0.5em 0.25em;
        font-size: 1rem;
        color: #fff;
      }
    }
  }
`;
