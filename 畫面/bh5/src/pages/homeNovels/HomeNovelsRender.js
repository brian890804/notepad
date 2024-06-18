import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";
import ImageCarousel from "../component/ImageCarousel";
import { adsKeys, colors } from "../../constants";
import { pageUrlConstants } from "../../constants";
import useMediaSetting from "../../reackHook/useMediaSetting";
import scrollBottomCallEvent from "../../modules/scrollEvent";
import WavaButton from "../component/WavaButton";
import NovelCard from "../component/NovelCard";
import ScrollToTop from "../component/ScrollToTop";

const { home } = pageUrlConstants;

const HomeNovelsPage = ({
  novelsList,
  getNovelsTab,
  list,
  updateNovelsData,
  nowTab, //預設值為 陣列第一筆 id 4
  clickTabEvent,
}) => {
  const intl = useIntl();
  const novelTabListRef = useRef(null);
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    if (novelsList.length === 0) {
      getNovelsTab();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let tabBar = novelTabListRef.current;
    tabBar.addEventListener("wheel", novelWheelEvent);
    window.addEventListener("scroll", scrollEvent);
    if (list[nowTab]?.page === 0 || list[nowTab] === undefined) {
      updateNovelsData(nowTab, () => {});
    }
    return () => {
      tabBar.removeEventListener("wheel", novelWheelEvent);
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowTab]);
  useEffect(() => {
    updateNovelsData(nowTab, () => {});
  }, []);

  function scrollEvent() {
    scrollBottomCallEvent((scrollColdEnd) => {
      updateNovelsData(nowTab, scrollColdEnd);
    });
  }

  function novelWheelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    novelTabListRef.current.scrollLeft += e.deltaY;
  }
  return (
    <HomeNovelsPageElement>
      <ImageCarousel
        adsKey={adsKeys.home}
        threeInOneBanner={!isMobile}
        is_cover
        size="banner_main"
      />
      <div
        ref={novelTabListRef}
        className={`nav_list ${!isMobile && "mx-indent"}`}
        onWheel={novelWheelEvent}
      >
        {novelsList.map((item, i) => {
          return (
            <div
              className={"nav_list_tag " + (nowTab === item.id ? "active" : "")}
              style={
                {
                  // order: item.sort, 看要不要照後台排 目前沒有這打算
                }
              }
              key={item.id + "_" + i}
              onClick={() => {
                clickTabEvent(item.id);
              }}
            >
              <WavaButton>
                <p className="nav_list_tag_text">{item.title}</p>
              </WavaButton>
            </div>
          );
        })}
      </div>

      <Grid
        container
        direction="row"
        alignItems="center"
        className={`${!isMobile && "px-indent"} novel_content`}
        spacing={2}
      >
        {list[nowTab]?.list
          .filter((_, index) => {
            return !list[nowTab].isNew || index < list[nowTab].page * 10;
          })
          .sort((a, b) => b.id - a.id)
          .map((data) => {
            return (
              <Grid item md={2} xs={4} key={"小說 " + data.title}>
                <NovelCard key={data.id} data={data} total_view_show />
              </Grid>
            );
          })}
        <ScrollToTop />
      </Grid>
    </HomeNovelsPageElement>
  );
};

HomeNovelsPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default HomeNovelsPage;

export const HomeNovelsPageElement = styled.div`
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

  .novel_content {
    display: flex;
    flex-wrap: wrap;
  }
`;
