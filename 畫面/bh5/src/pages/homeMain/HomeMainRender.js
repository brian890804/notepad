import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { Box, Tab, Tabs, Typography } from "@mui/material";
// import PropTypes from "prop-types";

import { adsKeys, colors, pageUrlConstants } from "../../constants";

import ImageCarousel from "../component/ImageCarousel";
import CoverCubeItem from "../component/CoverCubeItem";
import RefreshBtn from "./component/RefreshBtn";

import mangaIcon from "../../assets/home/manga.svg";
import newIcon from "../../assets/home/new.svg";
import AllIcon from "../../assets/home/list.svg";
import starIcon from "../../assets/home/star.svg";
import gameIcon from "../../assets/home/game.svg";
import picIcon from "../../assets/home/pic.svg";
import videoIcon from "../../assets/home/video.svg";
import novelIcon from "../../assets/home/novel.svg";

import useMediaSetting from "../../reackHook/useMediaSetting";
import SlideCarousel from "./component/SlideCarousel";
import ComicRankingItem from "./component/ComicRankingItem";
import { AntTab, StyledTabs, TabPanel } from "./component/MuiTabItem";
import NovelCard from "../component/NovelCard";
import OriginalCarousel from "./component/OriginalCarousel";
import ShowItem from "./component/ShowItem";
import ContinueWatchSlideCarousel from "./component/ContinueWatchSlideCarousel";
import store from "../../store";

const HomeMainPage = ({
  user,
  init,
  anime_watch_history,
  comic_watch_history,
  weekComicList,
  hot_comic_list,
  rank_comic_list,
  all_comic_list,
  week_anime_list,
  rank_anime_list,
  hot_anime_list,
  all_anime_list,
  game_list,
  video_list,
  video_category_list,
  photo_category_list,
  photo_list,
  novel_list,
  creation_list,
  refreshData,
  toDetailPage,
  postCardScribeMediaEvent,
  postCardAttentionEvent,
  getWatchHistory,
}) => {
  const intl = useIntl();
  const [videoTabValue, setVideoTabValue] = useState();
  const [photoTabValue, setPhotoTabValue] = useState();
  const { isMobile } = useMediaSetting();

  useEffect(() => {
    if (video_category_list.length <= 0) init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleVideoIndexChange = (event, newValue) => {
    setVideoTabValue(newValue);
  };

  const handlePhotoIndexChange = (event, newValue) => {
    setPhotoTabValue(newValue);
  };

  useEffect(() => {
    if (video_category_list.length)
      setVideoTabValue(video_category_list[video_category_list.length - 1].id);
    if (photo_category_list.length)
      setPhotoTabValue(photo_category_list[photo_category_list.length - 1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video_category_list.length, photo_category_list.length]);

  useEffect(() => {
    getWatchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  return (
    <HomeMainPageElement>
      <ImageCarousel
        adsKey={adsKeys.anime_top_banner}
        threeInOneBanner={!isMobile}
        size="banner_animated"
        is_cover
      />
      {user.id !== "guest" &&
      (anime_watch_history.length > 0 || comic_watch_history.length) ? (
        <article className="anime_continue_watch_history_area">
          <section className="home_Main_container home_Main_new_comic">
            <div className="home_Main_container_title">
              <p className="home_Main_container_title_text">
                <img
                  className="home_Main_container_title_text_img"
                  src={newIcon}
                  alt={intl.formatMessage({
                    id: "HOME.MAIN.CONTINUE_WATCH",
                  })}
                />
                <span className="home_Main_container_title_text_span">
                  {intl.formatMessage({ id: "HOME.MAIN.CONTINUE_WATCH" })}
                </span>
              </p>
            </div>
            <ContinueWatchSlideCarousel
              itemsAnime={anime_watch_history}
              itemsComic={comic_watch_history}
              continueWatch
            />
          </section>
        </article>
      ) : (
        ""
      )}

      <article className="comic_area">
        <section className="home_Main_container home_Main_new_comic">
          <div className="home_Main_container_title">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={newIcon}
                alt={intl.formatMessage({
                  id: "HOME.MAIN.ADDED_THIS_WEEK_COMIC",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.ADDED_THIS_WEEK" })}
                <span className="home_Main_container_title_text_span_marked">
                  {intl.formatMessage({ id: "GLOBAL.COMICS" })}
                </span>
              </span>
            </p>
          </div>
          <SlideCarousel items={weekComicList} />
        </section>

        <section
          className={`home_Main_container home_Main_hot_comic ${
            isMobile ? " g-flex-column-start " : "g-start"
          }  gap-3`}
        >
          <section className={`${isMobile ? "w-100" : "f-60"}`}>
            <div className="home_Main_container_title">
              <p className="home_Main_container_title_text">
                <img
                  className="home_Main_container_title_text_img"
                  src={mangaIcon}
                  alt={intl.formatMessage({ id: "HOME.MAIN.POPULAR_COMIC" })}
                />
                <span className="home_Main_container_title_text_span">
                  {intl.formatMessage({ id: "HOME.MAIN.POPULAR_COMIC" })}
                </span>
              </p>
              <div
                className="home_Main_container_refresh"
                onClick={() => {
                  refreshData("hot_comic_list");
                }}
              >
                <RefreshBtn />
              </div>
            </div>
            <ShowItem list={hot_comic_list} />
          </section>

          <section
            className={`home_main_container_ranking g-flex-column-start ${
              isMobile ? "w-100" : "f-35"
            } `}
          >
            <span className="home_Main_container_ranking_top g-flex-space-between  w-100 align-items-center px-3 py-1 ">
              <p className="home_Main_container_ranking_top_title fw-m">
                {intl.formatMessage({ id: "HOME.MAIN.RANKING.COMIC" })}
              </p>
              <p
                className="home_Main_container_subtitle"
                onClick={() => toDetailPage("comic_ranking")}
              >
                {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
              </p>
            </span>
            <span
              className={`g-flex-column-space-around h-100 ${
                isMobile && "w-100 g-overflow-auto"
              } gap-2`}
            >
              <ComicRankingItem list={rank_comic_list} />
            </span>
          </section>
        </section>

        <section className="home_Main_container home_Main_all_comic">
          <div className="home_Main_container_title g-flex-space-between">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={AllIcon}
                alt={intl.formatMessage({
                  id: "HOME.MAIN.ALL_COMIC",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.ALL_COMIC" })}
              </span>
            </p>
            <p
              className="home_Main_container_subtitle"
              onClick={() => toDetailPage("all_comic_list")}
            >
              {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
            </p>
          </div>

          <SlideCarousel items={all_comic_list} />
        </section>
      </article>

      <article className="anime_area">
        <section className="home_Main_container home_Main_new_anime">
          <div className="home_Main_container_title">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={newIcon}
                alt={intl.formatMessage({
                  id: "HOME.MAIN.ADDED_THIS_WEEK_ANIME",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.ADDED_THIS_WEEK" })}
                <span className="home_Main_container_title_text_span_marked">
                  {intl.formatMessage({ id: "GLOBAL.ANIMATE" })}
                </span>
              </span>
            </p>
          </div>
          <SlideCarousel items={week_anime_list} type="animated" />
        </section>

        <section className="home_Main_container home_Main_rank_anime">
          <div className="home_Main_container_title g-flex-space-between">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={starIcon}
                alt={intl.formatMessage({
                  id: "HOME.MAIN.RANKING.ANIME",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({
                  id: "HOME.MAIN.RANKING.ANIME",
                })}
              </span>
            </p>
            <p
              className="home_Main_container_subtitle"
              onClick={() => toDetailPage("anime_ranking")}
            >
              {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
            </p>
          </div>
          <SlideCarousel items={rank_anime_list} type="animated" rankStyle />
        </section>

        <section className="home_Main_container home_Main_hot_anime">
          <div className="home_Main_container_title">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={mangaIcon}
                alt={intl.formatMessage({
                  id: "HOME.MAIN.POPULAR_ANIMATE",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.POPULAR_ANIMATE" })}
              </span>
            </p>
            <div
              className="home_Main_container_refresh"
              onClick={() => {
                refreshData("hot_anime_list");
              }}
            >
              <RefreshBtn />
            </div>
          </div>
          <ShowItem list={hot_anime_list} type="animated" />
        </section>

        <section className="home_Main_container home_Main_all_anime">
          <div className="home_Main_container_title g-flex-space-between">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={AllIcon}
                alt={intl.formatMessage({
                  id: "HOME.MAIN.ADDED_THIS_WEEK_ANIME",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.ALL_ANIME" })}
              </span>
            </p>
            <p
              className="home_Main_container_subtitle"
              onClick={() => toDetailPage("all_anime_list")}
            >
              {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
            </p>
          </div>
          <SlideCarousel items={all_anime_list} type="animated" />
        </section>
      </article>

      <article className="anime_area">
        <section className="home_Main_container home_Main_feature_game">
          <div className="home_Main_container_title g-flex-space-between ">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={gameIcon}
                alt={intl.formatMessage({
                  id: "GAME.LABEL.FEATURED_GAME",
                })}
              />
              <span className="home_Main_container_title_text_span">
                {intl.formatMessage({ id: "GAME.LABEL.FEATURED_GAME" })}
              </span>
            </p>
            <p
              className="home_Main_container_subtitle"
              onClick={() => toDetailPage("feature_game")}
            >
              {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
            </p>
          </div>
          <SlideCarousel items={game_list} type="game" />
        </section>

        <section className="home_Main_container home_Main_video">
          <div className="home_Main_container_title g-flex-space-between">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={videoIcon}
                alt={intl.formatMessage({
                  id: "GLOBAL.VIDEO",
                })}
              />
              <span className="home_Main_container_title_text_span mr-2">
                {intl.formatMessage({ id: "GLOBAL.VIDEO" })}
              </span>
              {!isMobile && (
                <StyledTabs
                  value={videoTabValue}
                  onChange={handleVideoIndexChange}
                  aria-label="lab API tabs example"
                >
                  {video_category_list.reverse().map((category) => {
                    if (video_list[category.id].length) {
                      return (
                        <AntTab
                          label={category.title}
                          value={category.id}
                          key={category.id}
                        />
                      );
                    }
                  })}
                </StyledTabs>
              )}
            </p>
            <p
              className="home_Main_container_subtitle"
              onClick={() => toDetailPage("video")}
            >
              {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
            </p>
          </div>
          {isMobile && (
            <StyledTabs
              value={videoTabValue}
              onChange={handleVideoIndexChange}
              aria-label="lab API tabs example"
            >
              {[...video_category_list].reverse().map((category) => {
                if (video_list[category.id].length) {
                  return (
                    <AntTab
                      label={category.title}
                      value={category.id}
                      key={category.id}
                    />
                  );
                }
              })}
            </StyledTabs>
          )}
          {video_category_list.map((category) => {
            return (
              <TabPanel
                value={videoTabValue}
                index={category.id}
                key={category.id}
              >
                <SlideCarousel items={video_list[category.id]} type="video" />
              </TabPanel>
            );
          })}
        </section>

        <section className="home_Main_container home_Main_feature_photo">
          <div className="home_Main_container_title g-flex-space-between">
            <p className="home_Main_container_title_text">
              <img
                className="home_Main_container_title_text_img"
                src={picIcon}
                alt={intl.formatMessage({
                  id: "TOP.NAVIGATOR.MEITU",
                })}
              />
              <span className="home_Main_container_title_text_span mr-2">
                {intl.formatMessage({ id: "TOP.NAVIGATOR.MEITU" })}
              </span>
              {!isMobile && (
                <StyledTabs
                  value={photoTabValue}
                  onChange={handlePhotoIndexChange}
                  aria-label="lab API tabs example"
                >
                  {[...photo_category_list].reverse().map((category) => {
                    if (photo_list[category.id].length) {
                      return (
                        <AntTab
                          label={category.title}
                          value={category.id}
                          key={category.id}
                        />
                      );
                    }
                  })}
                </StyledTabs>
              )}
            </p>
            <p
              className="home_Main_container_subtitle"
              onClick={() => toDetailPage("photo")}
            >
              {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
            </p>
          </div>
          {isMobile && (
            <StyledTabs
              value={photoTabValue}
              onChange={handlePhotoIndexChange}
              aria-label="lab API tabs example"
            >
              {[...photo_category_list].reverse().map((category) => {
                if (photo_list[category.id].length) {
                  return (
                    <AntTab
                      label={category.title}
                      value={category.id}
                      key={category.id}
                    />
                  );
                }
              })}
            </StyledTabs>
          )}
          {photo_category_list.map((category) => {
            return (
              <TabPanel
                value={photoTabValue}
                index={category.id}
                key={category.id}
              >
                <SlideCarousel items={photo_list[category.id]} type="photo" />
              </TabPanel>
            );
          })}
        </section>

        <section
          className={`home_Main_container home_Main_novel ${
            isMobile ? " g-flex-column-start column-reverse" : "g-start"
          }  gap-3`}
        >
          <section className={`${isMobile ? " w-100" : "f-60"}`}>
            <div className="home_Main_container_title">
              <p className="home_Main_container_title_text">
                <img
                  className="home_Main_container_title_text_img"
                  src={novelIcon}
                  alt={intl.formatMessage({ id: "TOP.NAVIGATOR.NOVEL" })}
                />
                <span className="home_Main_container_title_text_span">
                  {intl.formatMessage({ id: "TOP.NAVIGATOR.NOVEL" })}
                </span>
              </p>
              <p
                className="home_Main_container_subtitle"
                onClick={() => toDetailPage("novel_list")}
              >
                {intl.formatMessage({ id: "GLOBAL.SEE_ALL" })}>
              </p>
            </div>
            <ShowItem list={novel_list} type="novel" />
          </section>

          <section
            className={`home_main_container_ranking   ${
              isMobile ? " w-100" : "f-35"
            }
            } `}
          >
            <OriginalCarousel
              items={creation_list}
              postCardScribeMediaEvent={postCardScribeMediaEvent}
              postCardAttentionEvent={postCardAttentionEvent}
            />
          </section>
        </section>
      </article>
      {/* <ImageCarousel
        adsKey={adsKeys.anime_interval}
        threeInOneBanner={!isMobile}
        size="banner_ads"
      />

      <ImageCarousel
        adsKey={adsKeys.anime_interval}
        threeInOneBanner={!isMobile}
        size="banner_ads"
      />
      <section className="home_Main_container home_Main_video">
        <div className="home_Main_container_title">
          <p className="home_Main_container_title_text">
            <img
              className="home_Main_container_title_text_img"
              src={animeIcon}
              alt={intl.formatMessage({ id: "HOME.MAIN.POPULAR_ANIMATE" })}
            />
            <span className="home_Main_container_title_text_span">
              {intl.formatMessage({ id: "HOME.MAIN.POPULAR_ANIMATE" })}
            </span>
          </p>
        </div>
        <div className="home_Main_container_content">
          <Grid container direction="row" alignItems="center" spacing={2}>
            {videoList.map((data) => {
              return (
                <Grid item md={3} xs={6} key={data.id}>
                  <CoverCubeItem data={data} type="animated" />
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div
          className="home_Main_container_refresh"
          onClick={() => {
            refreshData("video");
          }}
        >
          <RefreshBtn />
        </div>
      </section> */}
    </HomeMainPageElement>
  );
};

HomeMainPage.propTypes = {};

export default HomeMainPage;

export const HomeMainPageElement = styled.div`
  /*  */
  overflow: hidden;
  background: #f3f4f5;
  display: flex;
  flex-direction: column;
  article {
    background: #fff;
    margin-bottom: 0.5rem;
  }
  .home_Main {
    &_container {
      padding: 1em 0.5em;
      padding-right: 12%;
      padding-left: 12%;
      @media (max-width: 899px) {
        padding: 0.5em;
      }

      &:last-child {
        margin-bottom: none;
        border-bottom: none;
      }

      &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        @media (max-width: 899px) {
          margin-bottom: 0px;
        }

        &_text {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 900;
          &_img {
            width: 35px;
            height: 35px;
            vertical-align: middle;
            @media (max-width: 899px) {
              width: 25px;
              height: 25px;
            }
          }

          &_span {
            margin-left: 5px;
            vertical-align: middle;
            font-size: 20px;
            font-weight: 600;
            @media (max-width: 899px) {
              font-size: 14px;
            }
            &_marked {
              color: ${colors.back_dark_pink};
            }
          }
        }
      }

      &_subtitle {
        cursor: pointer;
        font-size: 10px;
        @media (min-width: 899px) {
          font-size: 16px;
        }
      }

      &_refresh {
      }

      &_ranking {
        &_top {
          color: #fff;
          border-radius: 5px;
          background-image: linear-gradient(99deg, #86b7f7 49%, #5a65f2);
          margin-bottom: 10px;
          box-sizing: border-box;
          &_title {
            font-size: 14px;
            @media (min-width: 899px) {
              font-size: 20px;
            }
          }
        }
      }
    }
  }

  .pc_friendly_url {
    text-align: center;
    padding: 0 10em;

    &_title {
      font-size: 1.6rem;
      font-weight: 600;
      padding: 1em 0;
    }

    &_container {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
    }

    &_icon {
      margin-right: 0.5em;
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }

    &_text {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
  .MuiTab-root {
    padding: 5px;
    font-size: 12px;
    min-height: 30px;
  }
  .MuiTabs-root {
    min-height: 30px;
  }
`;
