import { useEffect, useRef, useCallback } from "react";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";
// import PropTypes from "prop-types";

import WavaButton from "../component/WavaButton";

import ImageCarousel from "../component/ImageCarousel";
import CoverCubeItem from "../component/CoverCubeItem";
import { adsKeys, colors } from "../../constants";

import scrollBottomCallEvent from "../../modules/scrollEvent";
import useMediaSetting from "../../reackHook/useMediaSetting";
import ScrollToTop from "../component/ScrollToTop";

const HomeVideosPage = ({
  user,
  containerRef,
  hideImageCarousel,
  nowTab,
  videoList: video_list,
  getVideoData,
  clickTabEvent,
  updateCateVideoData,
}) => {
  const { isMobile } = useMediaSetting();
  const videoTabListRef = useRef(null);
  const getVideo = useCallback(() => {
    getVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(video_list).length <= 1) {
      getVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let tabBar = videoTabListRef.current;
    tabBar.addEventListener("wheel", videoWheelEvent);
    window.addEventListener("scroll", scrollEvent);
    if (video_list[nowTab].page === 0) {
      updateCateVideoData(nowTab, () => {});
    }
    return () => {
      tabBar.removeEventListener("wheel", videoWheelEvent);
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowTab]);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      updateCateVideoData(nowTab, scrollColdEnd);
    });
  }

  function videoWheelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    videoTabListRef.current.scrollLeft += e.deltaY;
  }
  return (
    <HomeVideosPageElement>
      {!hideImageCarousel && (
        <ImageCarousel
          adsKey={adsKeys.home}
          threeInOneBanner={!isMobile}
          is_cover
          size="banner_main"
        />
      )}
      <div
        ref={videoTabListRef}
        className={`nav_list ${!isMobile && "mx-indent"}`}
        onWheel={videoWheelEvent}
      >
        {Object.keys(video_list).map((key, i) => {
          return (
            <div
              className={
                "nav_list_tag " +
                (nowTab === video_list[key].cateid ? "active" : "")
              }
              style={{
                order: video_list[key].sort,
              }}
              key={video_list[key].cateid + "_" + i}
              onClick={() => {
                clickTabEvent(video_list[key].cateid);
              }}
            >
              <WavaButton currentRefs={containerRef ? [containerRef] : []}>
                <p className="nav_list_tag_text">{video_list[key].title}</p>
              </WavaButton>
            </div>
          );
        })}
      </div>
      <div className={`video_content ${!isMobile && " px-indent"} mt-2 `}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={isMobile ? 1 : 4}
        >
          {video_list[nowTab]?.videolist
            .filter((key, index) => {
              return (
                !video_list[nowTab].isNew ||
                index < video_list[nowTab].page * 30
              );
            })
            .sort((a, b) => b.id - a.id)
            .map((data) => {
              return (
                <Grid item md={3} xs={6} key={data.title + "_" + data.id}>
                  <CoverCubeItem data={data} user={user} type="video" total_view_show/>
                </Grid>
              );
            })}
          <ScrollToTop />
        </Grid>
      </div>
    </HomeVideosPageElement>
  );
};

HomeVideosPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default HomeVideosPage;

export const HomeVideosPageElement = styled.div`
  /*  */
  .nav_list {
    display: flex;
    overflow: auto;
    white-space: nowrap;
    &_tag {
      cursor: pointer;
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      margin: 10px;
      color: ${colors.dark_pink};
      border: 1px solid ${colors.dark_pink};
      border-radius: 30px;

      &.active {
        color: #fff;
        background-color: ${colors.dark_pink};
      }

      &_text {
        padding: 5px 10px;
        font-size: 18px;
      }
    }
  }

  .video_content {
    display: flex;
    flex-wrap: wrap;
  }
`;
