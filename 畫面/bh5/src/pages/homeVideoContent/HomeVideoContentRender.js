import { useEffect } from "react";
// import { useEffect, useRef } from "react";
// import { useIntl } from "react-intl";
// import Grid from "@mui/material/Grid";
import styled from "@emotion/styled/macro";
import TopBarContainer from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import ReactPlayerComponent, { PlyrVideoType } from "../component/ReactPlayerComponent";
import { adsKeys, colors, side_padding } from "../../constants";
import ImageCarousel from "../component/ImageCarousel";
// import ImageComponent from "../component/ImageComponent";
import HomeVideos from "../homeVideos/HomeVideosHandle";
import useMediaSetting from "../../reackHook/useMediaSetting";

const HomeVideoContent = ({
  videoId,
  videoData,
  // getVideoContent,
  videoList: video_list,
  // toRecommendVideo,
  // getFavorVideo,
  toggleVideoCollect,
  checkUser,
}) => {
  // console.log(videoData,'videoData')
  // const intl = useIntl();
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    if (videoId) {
      checkUser({
        id: videoId,
      });
    }
    // getVideoContent(videoId, ()=>{
    //   getFavorVideo();
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  function collectEvent() {
    toggleVideoCollect({
      video_id: videoId,
      type: 0,
      status: videoData.is_collect ? 0 : 1,
      vod_name: videoData.title,
      vod_pic: videoData.img,
      vod_url: videoData.url,
    });
  }
  return (
    <HomeVideoContentElement>
      <TopBarContainer not_fixed={true} show_shadow={false} z_index={9}>
        <TopTitleBar
          showBack={true}
          back_color={"transparent"}
          show_back_color={"#fff"}
        />
      </TopBarContainer>
      <ReactPlayerComponent
        img={videoData.img}
        src={videoData.url}
        title={videoData.title}
        subTitle="相关影片"
        is_collect={videoData.is_collect}
        collectEvent={() => {
          collectEvent();
        }}
        videoType={PlyrVideoType.video}
        videoId={videoId}
      />
      <ImageCarousel
        adsKey={adsKeys.video_banner}
        threeInOneBanner={!isMobile}
      />
      <HomeVideos hideImageCarousel />
      {/* <div className="recommend px-indent mt-5">
        <Grid container direction="row" alignItems="center" spacing={4}>
          {videoData.recommend
            ? videoData.recommend.map((data) => {
                return (
                  <Grid item md={3} xs={12} key={data.id}>
                    <div
                      className="recommend_item"
                      onClick={() => {
                        toRecommendVideo(data.id, data.title);
                      }}
                    >
                      <div className="recommend_item_cover">
                        <ImageComponent
                          src={data.img}
                          alt={data.title}
                          title={data.title}
                          height={50}
                          cover={true}
                          is_cover={true}
                        />
                        <span className="recommend_item_cover_gold">
                          {data.need_jinbi}{" "}
                          {intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })}
                        </span>
                      </div>
                      <div className="recommend_item_info">
                        <div className="recommend_item_info_title">
                          <p className="recommend_item_info_title_text my-2">
                            {data.title}
                          </p>
                        </div>
                        <div className="recommend_item_info_description">
                          <p className="recommend_item_info_description_text">
                            {data.biaoqian}
                          </p>
                          <p className="recommend_item_info_description_text view">
                            {data.bfcs >= 1000
                              ? Math.floor(data.bfcs / 100) -
                                10 +
                                intl.formatMessage({
                                  id: "GLOBAL.NUMBER_PLAYS",
                                })
                              : data.bfcs}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </div> */}
    </HomeVideoContentElement>
  );
};

export default HomeVideoContent;

const HomeVideoContentElement = styled.div`
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
  .recommend {
    &_item {
      cursor: pointer;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        right: ${side_padding}px;
        bottom: -0.5px;
        left: ${side_padding}px;
        height: 1px;
        background-color: #e1e1e1;
      }

      &:last-of-type {
        &::after {
          content: unset;
        }
      }

      &_cover {
        flex-shrink: 0;
        position: relative;
        width: 100%;

        &_gold {
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 12px;
          color: #fff;
        }
      }

      &_info {
        &_title {
          &_text {
            overflow: hidden;
            height: 36px;
            font-size: 18px;
            line-height: 18px;
            letter-spacing: 1px;
            font-weight: 900;
          }
        }

        &_description,
        &_viewtime {
          &_text {
            font-size: 16px;
            letter-spacing: 1px;
            color: ${colors.text_grey};
            font-weight: 700;

            &.view {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
`;
