import React, { useState, useEffect, memo } from "react";
import styled from "@emotion/styled/macro";
import PropTypes from "prop-types";

// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./swiper.css";
import { compose } from "redux";
import { connect } from "react-redux";
import LinkComponent from "./LinkComponent";
import { handleAdClick } from "../../modules/gtmEventHandle";
import useMediaSetting from "../../reackHook/useMediaSetting";

let auto_play_progress_move_time = 500;
let autoPlayProgressMoveTimeMultiple = 6;
let auto_play_time =
  auto_play_progress_move_time * autoPlayProgressMoveTimeMultiple;

const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};

const ImageCarousel = ({
  adsList,
  placeholder,
  threeInOneBanner,
  is_cover,
  size,
  callback = () => {},
}) => {
  const [swiper_progress, setSwiperProgress] = useState(0);
  const [timeClock, setTimeClock] = useState(null);
  const [height, setHeight] = useState("auto");
  const { isMobile } = useMediaSetting();

  useEffect(() => {
    return () => {
      if (swiper_progress > 0) {
        clearTimeout(timeClock);
        setTimeClock(
          setTimeout(() => {
            setSwiperProgress(
              swiper_progress -
                auto_play_time / (autoPlayProgressMoveTimeMultiple - 1)
            );
          }, auto_play_progress_move_time)
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper_progress]);

  useEffect(() => {
    window.addEventListener("focus", focusEvent);
    return () => {
      window.removeEventListener("focus", focusEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    switch (size) {
      case "banner_animated": //動畫頂部banner
        setHeight(isMobile ? "30vw" : "10vw");
        break;
      case "banner_ads": //廣告banner
        setHeight(isMobile ? "21vw" : "7vw");
        break;
      case "banner_float": //浮動廣告banner 
        setHeight("auto");//不這樣設定H5抽獎、首購會有問題
        break;
      case "banner_main": //上方主banner
        setHeight(isMobile ? "56vw" : "18vw");
        break;
      default: //浮動廣告banner
      setHeight("auto");
        break;
    }
  }, [isMobile]);
  function focusEvent() {
    setSwiperProgress(
      swiper_progress === auto_play_time ? auto_play_time - 1 : auto_play_time
    );
  }

  return (
    <ImageCarouselElement
      swiper_progress={swiper_progress}
      threeInOneBanner={threeInOneBanner}
      height={height}
    >
      <Swiper
        className="image_carousel swiper-pagination-center"
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={threeInOneBanner ? 0 : 50}
        slidesPerView={threeInOneBanner ? 3 : 1}
        loop
        autoHeight
        pagination={{ clickable: true }}
        autoplay={{
          delay: auto_play_time,
          disableOnInteraction: false,
        }}
        onSwiper={callback}
        onResize={callback}
        onSliderMove={(e) => {
          clearTimeout(timeClock);
        }}
        onTransitionEnd={() => {
          setSwiperProgress(
            swiper_progress === auto_play_time
              ? auto_play_time - 1
              : auto_play_time
          );
        }}
      >
        {adsList.map((data) => {
          return (
            <SwiperSlide
              key={data.name + "_" + data.cname + "_" + data.linkurl}
              onClick={() => {
                handleAdClick(data);
              }}
            >
              <LinkComponent
                routes={{
                  linkurl: data.linkurl,
                  inside_data: data.inside_data,
                }}
                className="image_carousel_slide"
              >
                <img
                  className="image_carousel_slide_img "
                  alt={data.cname}
                  src={data.picurl}
                  title={data.name}
                />
              </LinkComponent>
            </SwiperSlide>
          );
        })}
        {is_cover && threeInOneBanner && (
          <div className="cover">
            <div className="cover_r" />
            <div className="cover_l" />
          </div>
        )}

        <div
          style={{
            left:
              ((auto_play_time - swiper_progress) / auto_play_time) * 100 + "%",
          }}
          className="swiper-autoplay-progress"
        />
      </Swiper>
    </ImageCarouselElement>
  );
};

const ImageCarouselStateToProps = (state, ownProps) => {
  // let containerSize = "";
  // switch (
  //   ownProps.adsKey.key //抓廣告圖高度
  // ) {
  //   case "adsKeys.anime_top_banner":
  //     containerSize = isMobile?:"20vh";
  //     break;
  //   default:
  //     break;
  // }
  return {
    adsList: state.adsList[ownProps.adsKey.key] || [],
    placeholder: ownProps.adsKey.placeholder || "#",
    threeInOneBanner: ownProps.threeInOneBanner,
    size: ownProps.size,
  };
};

const ImageCarouselDispatchToProps = (dispatch) => {
  return {};
};

ImageCarousel.propTypes = {
  adsList: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  // iconCallback: PropTypes.func,
  // showBack: PropTypes.bool,
};

export default compose(
  connect(
    ImageCarouselStateToProps,
    ImageCarouselDispatchToProps
  )(memo(ImageCarousel, areEqual))
);

export const ImageCarouselElement = styled.div`
  /*  */
  .swiper-autoplay-progress {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 2px;
    background-color: #0009;
    transition: ${({ swiper_progress }) => {
        return swiper_progress <= auto_play_time - 10
          ? auto_play_progress_move_time / 1000
          : "0";
      }}
      linear;
  }
  .cover {
    pointer-events: none;
    &_r {
      position: absolute;
      z-index: 999;
      width: 34%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 66.6%;
      opacity: 0.5;
      background-color: black;
    }

    &_l {
      position: absolute;
      z-index: 999;
      width: 34%;
      top: 0;
      right: 0;
      bottom: 0;
      right: 66.6%;
      opacity: 0.5;
      background-color: black;
    }
  }

  .image_carousel {
    overflow: hidden;
    width: 100%;
    height: ${({ height }) => height !== "auto" && 0};
    padding-bottom: ${({ height }) => height !== "auto" && height};

    &_slide {
      width: 100%;
      &_img {
        width: 100%;
        vertical-align: middle;
      }
    }
  }
`;
