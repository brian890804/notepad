import { useEffect, useRef } from "react";
import styled from "@emotion/styled/macro";
import { useLocation } from "react-router";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import { colors, pageUrlConstants } from "../../constants";
import TopTitleBar from "../component/TopTitleBar";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { useIntl } from "react-intl";
import LinkComponent from "../component/LinkComponent";
import { clearScrollPage } from "../../reducers/actions/historyActions";
import girl404 from "../../assets/imgPlaceholder/girl404.png";
import ImageComponent from "../component/ImageComponent";

const PostsNoticePage = ({
  postGetNotice,
  postNotice,
  refreshData,
  pushToNew,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const { isMobile } = useMediaSetting();
  useEffect(() => {
    postGetNotice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //如果再當前頁面在點一次側欄
    if (refreshData || isMobile || postNotice.length === 0) {
      postGetNotice();
      clearScrollPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <PostsNoticePageElement>
      <TopBarContainer not_fixed={!isMobile} z_index={5}>
        <TopTitleBar
          title={intl.formatMessage({ id: "POST.NOTIFY" })}
          showBack={true}
          show_back_color={isMobile ? "#ffffff" : "#000"}
          back_color={isMobile ? colors.dark_pink : "#fff"}
          color={isMobile ? "#fff" : "#000"}
        />
      </TopBarContainer>
      <div className="post_notice">
        {postNotice.map((data, index) => (
          <div className="post_notice_card" key={data.id}>
            <div className="post_notice_items">
              <div className="post_notice_items_area_left">
                {data.pay_type === 1 || data.pay_type === 2 ? (
                  <div className="post_notice_items_avatar">
                    <LinkComponent
                      routes={{
                        name: pageUrlConstants.post.pages.postMain.pages
                          .postProfile.name,
                        path: pageUrlConstants.post.pages.postMain.pages
                          .postProfile.path,
                        dynamic: {
                          profileId: data.from_uid,
                        },
                      }}
                    >
                      <ImageComponent
                        is_cover={true}
                        src={data.from_avatar}
                        alt={data.title}
                        title={data.title}
                        cursor="default"
                        border_radius="50%"
                        lazyLoad={false}
                      />
                    </LinkComponent>
                  </div>
                ) : (
                  <img
                    src={data.from_avatar}
                    alt={data.title}
                    title={data.title}
                    draggable={false}
                    className="post_notice_items_avatar"
                  />
                )}

                <div className="post_notice_items_description">
                  <div className="post_notice_items_description_content">
                    {data.pay_type === 1 || data.pay_type === 2 ? (
                      <span>
                        <span className="post_notice_items_description_content_name">
                          {data.from_nickname}&nbsp;
                        </span>
                        <span>
                          {data.title.replace(data.from_nickname, "")}
                        </span>
                      </span>
                    ) : (
                      data.title
                    )}
                  </div>
                  <div className="post_notice_items_description_time">
                    {data.show_time}
                  </div>
                </div>
              </div>
              <div className="post_notice_items_area_right">
                {data.content &&
                  (data.content.indexOf("video") > -1 ? (
                    <video src={data.content} alt="" />
                  ) : (
                    <img src={data.content} alt="" />
                  ))}
              </div>
            </div>
            <div
              className="divider"
              style={{
                background:
                  postNotice.length - 1 === index ? "transparent" : "#a8a8a8",
              }}
            ></div>
          </div>
        ))}
        {postNotice.length === 0 ? (
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
            <div className="container_empty_btn" onClick={pushToNew}>
              <span className="container_empty_btn_text">
                {intl.formatMessage({ id: "POST.GO_SEARCH" })}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </PostsNoticePageElement>
  );
};

PostsNoticePage.propTypes = {
  // title: PropTypes.string,
  // content: PropTypes.string,
  // noticeId: PropTypes.number
};

export default PostsNoticePage;

export const PostsNoticePageElement = styled.div`
  /*  */
  background: #fff;
  min-height: 100%;
  .post_notice {
    padding-top: ${main_height}px;
    min-height: calc(100vh);
    &_card {
      padding: 10px 20px;
    }

    &_items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &_avatar {
        width: 55px;
        height: 55px;
        object-fit: cover;
        border-radius: 50px;
        user-select: none;
        -webkit-touch-callout: none;
      }
      &_description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        align-self: center;
        &_content {
          font-size: 16px;
          color: ${colors.text_grey};
          &_name {
            color: black;
            font-weight: bold;
          }
        }
        &_time {
          font-size: 14px;
          color: ${colors.text_light_grey};
        }
      }

      &_area {
        &_left {
          display: flex;
          gap: 10px;
        }
        &_right {
          video,
          img {
            width: 55px;
            height: 55px;
            object-fit: cover;
            user-select: none;
            -webkit-touch-callout: none;
          }
        }
      }
    }
  }

  .divider {
    height: 1px;
    width: 100%;
    background-color: #a8a8a8;
    margin-top: 20px;
  }

  .container_empty {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;

    &_girl {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &_img {
        margin-top: 20px;
        width: 150px;
        @media (max-width: 899px) {
          width: 100px;
        }
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
      @media (max-width: 899px) {
        width: 150px;
        padding: 5px 10px;
        font-size: 18px;
      }
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
