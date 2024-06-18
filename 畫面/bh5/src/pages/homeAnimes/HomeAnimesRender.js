import React, { useEffect, createContext, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { Box } from "@mui/material";
// import PropTypes from "prop-types";

import { adsKeys, colors, page_over_duration } from "../../constants";

import ImageCarousel from "../component/ImageCarousel";
import CoverCubeItem from "../component/CoverCubeItem";
import RefreshBtn from "./component/RefreshBtn";

import mangaIcon from "../../assets/home/manga.svg";
import newIcon from "../../assets/home/new.svg";
import animeIcon from "../../assets/home/manga.svg";

import meta from "../../assets/home/friend/meta.png";
import wubo from "../../assets/home/friend/wubo.png";
import linkin from "../../assets/home/friend/linkin.png";
import hhc2g from "../../assets/home/friend/hhc2g.png";
import kimani from "../../assets/home/friend/kimani.png";
import tuiju from "../../assets/home/friend/tuiju.png";

import useMediaSetting from "../../reackHook/useMediaSetting";
import { main_height, sub_height } from "../component/TopBarContainer";

export const Category = createContext("");
const Provider = Category.Provider;

const HomeAnimesPage = ({
  init,
  containerRef,
  category,
  comicList,
  newList,
  videoList,
  refreshData,
}) => {
  const intl = useIntl();
  const { size, isMobile } = useMediaSetting();
  const navRef = useRef(null);
  const [scroll_trigger, set_scroll_trigger] = useState(false);
  const [nav_style, set_nav_style] = useState({
    toTop: 999999999,
    height: 0,
  });
  const [friendly_url] = useState(() => [
    // {
    //   icon: meta,
    //   name: intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK.META" }),
    //   url: "https://5982mt7.com/",
    // },
    // {
    //   icon: wubo,
    //   name: intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK.WUBO" }),
    //   url: "https://wubo01.com/",
    // },
    // {
    //   icon: linkin,
    //   name: intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK.LINKIN" }),
    //   url: "https://link666in.com/",
    // },
    // {
    //   icon: hhc2g,
    //   name: intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK.HHC2G" }),
    //   url: "https://hhc2g.com/",
    // },
    // {
    //   icon: kimani,
    //   name: intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK.KIMANI" }),
    //   url: "https://kimani.tv/",
    // },
    // {
    //   icon: tuiju,
    //   name: intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK.TUIJU" }),
    //   url: "https://tuiju.fun/",
    // },
  ]);
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  useEffect(() => {
    setTimeout(() => {
      if (navRef.current) {
        set_nav_style({
          toTop: navRef.current.offsetTop,
          height: navRef.current.scrollHeight,
        });
      }
    }, page_over_duration - 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.removeEventListener("scroll", scrollEvent);
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav_style]);

  function scrollEvent(e) {
    if (
      document.documentElement.scrollTop - 150 >
      nav_style.toTop + nav_style.height
    ) {
      set_scroll_trigger(true);
    } else {
      set_scroll_trigger(false);
    }
  }

  function onOpenUrl(url) {
    window.open(url);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HomeAnimesPageElement>
        <ImageCarousel
          adsKey={adsKeys.anime_top_banner}
          threeInOneBanner={!isMobile}
          size="banner_animated"
          is_cover
        />
        {/* 粉紅色區域暫時移除 */}
        {/* <div
          className="nav_fill"
          style={{ height: scroll_trigger && nav_style.height && isMobile }}
        />
        <nav
          ref={navRef}
          className={scroll_trigger && !isMobile ? "fixed" : ""}
          style={{
            transform:
              scroll_trigger &&
              "translateY(" +
                (main_height + sub_height + 20) +
                `px) scale(${size.height >= 899 ? 1 : 0.8}`, // 768 - 805
            transitionDuration: scroll_trigger && "2s",
            transformOrigin: scroll_trigger && "right top",
          }}
        >
          <Provider value={{ category, containerRef }}>
            {isMobile ? (
              <MobileCategory />
            ) : (
              <WebCategory direction={scroll_trigger && "column"} />
            )}
          </Provider>
        </nav> */}
        <div className="home_animes_container home_animes_comic">
          <div className="home_animes_container_title">
            <p className="home_animes_container_title_text">
              <img
                className="home_animes_container_title_text_img"
                src={mangaIcon}
                alt={intl.formatMessage({ id: "HOME.MAIN.POPULAR_COMIC" })}
              />
              <span className="home_animes_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.POPULAR_COMIC" })}
              </span>
            </p>
          </div>
          <div className="home_animes_container_content">
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={isMobile ? 1 : 4}
            >
              {comicList.map((data) => {
                return (
                  <Grid item md={2} xs={4} lg={2} key={data.id}>
                    <CoverCubeItem data={data} total_view_show />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div
            className="home_animes_container_refresh"
            onClick={() => {
              refreshData("comic");
            }}
          >
            <RefreshBtn />
          </div>
        </div>
        <ImageCarousel
          adsKey={adsKeys.anime_interval}
          threeInOneBanner={!isMobile}
          size="banner_ads"
        />
        <div className="home_animes_container home_animes_new">
          <div className="home_animes_container_title">
            <p className="home_animes_container_title_text">
              <img
                className="home_animes_container_title_text_img"
                src={newIcon}
                alt={intl.formatMessage({ id: "HOME.MAIN.ADDED_THIS_WEEK" })}
              />
              <span className="home_animes_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.ADDED_THIS_WEEK" })}
              </span>
            </p>
          </div>
          <div className="home_animes_container_content">
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={isMobile ? 1 : 4}
              className="mb-2"
            >
              {newList.map((data) => {
                if (!data.type) {
                  return (
                    <Grid item md={3} xs={6} key={data.id}>
                      <CoverCubeItem
                        data={data}
                        type="animated"
                        total_view_show
                      />
                    </Grid>
                  );
                }
              })}
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={isMobile ? 1 : 4}
            >
              {newList.map((data) => {
                if (data.type) {
                  return (
                    <Grid item md={2} xs={4} key={data.id}>
                      <CoverCubeItem data={data} total_view_show />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </div>
          <div
            className="home_animes_container_refresh"
            onClick={() => {
              refreshData("new");
            }}
          >
            <RefreshBtn />
          </div>
        </div>
        <ImageCarousel
          adsKey={adsKeys.anime_interval}
          threeInOneBanner={!isMobile}
          size="banner_ads"
        />
        <div className="home_animes_container home_animes_video">
          <div className="home_animes_container_title">
            <p className="home_animes_container_title_text">
              <img
                className="home_animes_container_title_text_img"
                src={animeIcon}
                alt={intl.formatMessage({ id: "HOME.MAIN.POPULAR_ANIMATE" })}
              />
              <span className="home_animes_container_title_text_span">
                {intl.formatMessage({ id: "HOME.MAIN.POPULAR_ANIMATE" })}
              </span>
            </p>
          </div>
          <div className="home_animes_container_content">
            <Grid container direction="row" alignItems="center" spacing={2}>
              {videoList.map((data) => {
                return (
                  <Grid item md={3} xs={6} key={data.id}>
                    <CoverCubeItem data={data} type="animated" total_view_show />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div
            className="home_animes_container_refresh"
            onClick={() => {
              refreshData("video");
            }}
          >
            <RefreshBtn />
          </div>
        </div>
        {!isMobile && friendly_url.length > 0 && (
          <div className="pc_friendly_url">
            <div className="pc_friendly_url_title">
              {intl.formatMessage({ id: "PC.FOOTER.FRIENDLY.LINK" })}
            </div>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {friendly_url?.map((item) => (
                <Grid
                  item
                  sm
                  key={item.name}
                  className="pc_friendly_url_container"
                  onClick={() => onOpenUrl(item.url)}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="pc_friendly_url_icon"
                  />
                  <div className="pc_friendly_url_text">{item.name}</div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </HomeAnimesPageElement>
    </Box>
  );
};

HomeAnimesPage.propTypes = {};

export default HomeAnimesPage;

export const HomeAnimesPageElement = styled.div`
  /*  */
  .home_animes {
    &_carousel {
      width: 100%;
      display: flex;
      place-content: center;

      &_content {
        width: 100%;
      }
    }

    &_category {
      background-color: ${colors.light_pink};
      margin-top: 0.5%;

      @media (min-width: 599px) {
        border-bottom: 10px solid ${colors.back_grey};
        padding: 0% 10%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      &_box {
        &_item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: #000;
          &:hover {
            .home_animes_category_box_item_cover {
              animation: navbar-jump infinite 2s;
            }
            .home_animes_category_box_item_title_text {
              color: ${colors.back_dark_pink};
            }
          }

          &_cover {
            width: 60%;

            &_img {
              width: 100%;
              vertical-align: middle;
            }
          }

          &_title {
            &_text {
              margin-bottom: 10px;
              margin-top: 2px;
              font-size: 12px;
              font-weight: 800;

              @media (min-width: 599px) {
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    &_container {
      padding: 1em 0.5em;
      @media (min-width: 899px) {
        padding-right: 12%;
        padding-left: 12%;
      }

      &:last-child {
        margin-bottom: none;
        border-bottom: none;
      }

      &_title {
        margin-top: 10px;
        margin-bottom: 10px;

        &_text {
          font-size: 18px;
          font-weight: 900;
          &_img {
            width: 35px;
            height: 35px;
            vertical-align: middle;
          }

          &_span {
            margin-left: 5px;
            vertical-align: middle;
            font-size: 14px;

            @media (min-width: 599px) {
              font-size: 20px;
            }
          }
        }
      }

      &_content {
        display: flex;
        flex-wrap: wrap;
      }

      &_refresh {
        padding-top: 20px;
      }
    }
  }

  .fixed {
    width: 80px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    background-color: #fff;
    padding: 15px 0;
    border-radius: 5px;
    box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
    .home_animes {
      &_carousel {
        width: 100%;
        display: flex;
        place-content: center;
        justify-content: center;
        align-items: center;

        &_content {
          width: 100%;
        }
      }

      &_category {
        border-bottom: 0px;
        background-color: #fff;
        display: flex;
        margin: 0;
        &_box {
          &_item {
            padding-top: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #000;
            &_cover {
              &_img {
                width: 100%;
                vertical-align: middle;
              }
            }

            &_title {
              &_text {
                font-size: 12px;
              }
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
`;
