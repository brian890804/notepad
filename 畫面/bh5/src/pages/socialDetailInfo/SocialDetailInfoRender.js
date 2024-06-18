import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";

import { Pagination, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import ImageComponent from "../component/ImageComponent";

import femaleIcon from "../../assets/icons/female.svg";
import { colors, padding, side_padding } from "../../constants";

import officialGroupIcon from "../../assets/icons/official_group.png";
import likeIcon from "../../assets/icons/heart.svg";
import unLikeIcon from "../../assets/icons/empty_heart.svg";
import LinkComponent from "../component/LinkComponent";
import { CSSTransition } from "react-transition-group";

function SocialDetailInfo({
  profileId,
  profileData,
  getProfileData,
  addProfileCollect,
  unlockProfile,
  toBuySexVip,
}) {
  const intl = useIntl();
  const [info_select, set_info_select] = useState(0);

  const [showBuyVipCard, setShowBuyVipCard] = useState(false);

  useEffect(() => {
    getProfileData(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocialDetailInfoElement>
      <TopBarContainer not_fixed={true} show_shadow={false}>
        <TopTitleBar
          showBack={true}
          back_color="transparent"
          show_back_color="#fff"
        />
      </TopBarContainer>
      <CSSTransition
        timeout={200}
        in={showBuyVipCard}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_OutOfQuotaPortal"
      >
        <div className="buy_vip_cover">
          <div className="buy_vip_cover_container">
            <div className="buy_vip_cover_container_title">
              <span className="buy_vip_cover_container_title_text">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.SUBSCRIBE_SERVICE",
                })}
              </span>
            </div>
            <div className="buy_vip_cover_container_description">
              <p className="buy_vip_cover_container_description_text">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.AND_CHILL.DESCRIPTION_1",
                })}
              </p>
              <p className="buy_vip_cover_container_description_text">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.AND_CHILL.DESCRIPTION_2",
                })}
              </p>
            </div>
            <div className="buy_vip_cover_container_btn">
              <div
                className="buy_vip_cover_container_btn_button active"
                onClick={toBuySexVip}
              >
                <span className="buy_vip_cover_container_btn_button_text">
                  {intl.formatMessage({
                    id: "SOCIAL.DETAIL.INFO.LABEL.BUY.NOW",
                  })}
                </span>
              </div>
              <div
                className="buy_vip_cover_container_btn_button"
                onClick={() => {
                  setShowBuyVipCard(false);
                }}
              >
                <span className="buy_vip_cover_container_btn_button_text">
                  {intl.formatMessage({
                    id: "SOCIAL.DETAIL.INFO.LABEL.REJECT",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <div className="social">
        <div className="social_pictrue">
          <Swiper
            className="social_pictrue_slider"
            modules={[A11y, Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
          >
            {profileData.user_profile
              ? profileData.user_profile.map((data) => {
                  return (
                    <SwiperSlide
                      className="social_pictrue_slider_item"
                      key={data.source}
                    >
                      <ImageComponent
                        className="social_pictrue_slider_item_img"
                        border_radius={0}
                        src={data.source}
                        alt={profileData.nick_name}
                        title={profileData.nick_name}
                        height={112.5}
                      />
                    </SwiperSlide>
                  );
                })
              : ""}
          </Swiper>
        </div>
        <div className="social_title">
          <span className="social_title_text">{profileData.nick_name}</span>
          <img className="social_title_icon" src={femaleIcon} alt="sex icon" />
        </div>
        <div className="social_nav">
          <div
            className="social_nav_btn"
            onClick={() => {
              if (profileData.contact.lock !== 0) {
                unlockProfile(
                  profileData,
                  () => {
                    getProfileData(profileId);
                  },
                  () => {
                    setShowBuyVipCard(true);
                  }
                );
              }
            }}
          >
            <div className="social_nav_btn_button">
              {profileData.contact
                ? profileData.contact.lock
                  ? `${profileData.contact.money}${intl.formatMessage({
                      id: "GLOBAL.MONEY",
                    })} | ${intl.formatMessage({
                      id: "SOCIAL.DETAIL.INFO.LABEL.CONTACT_DETAILS.UNLOCK",
                    })}`
                  : intl.formatMessage({
                      id: "SOCIAL.DETAIL.INFO.LABEL.UNLOCKED",
                    })
                : ""}
            </div>
          </div>
          <div className="social_nav_list">
            <LinkComponent
              className="social_nav_list_item"
              routes={{
                linkurl:
                  "https://t.me/BBCAR2020?utm_campaign=sexinfo&utm_medium=app_unlouk&utm_source=telegram",
              }}
            >
              <div className="social_nav_list_item_icon">
                <img
                  className="social_nav_list_item_icon_img"
                  src={officialGroupIcon}
                  alt="officialGroupIcon"
                />
              </div>
              <div className="social_nav_list_item_text">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.OFFICIAL",
                })}
              </div>
            </LinkComponent>
            <div
              className="social_nav_list_item"
              onClick={() => {
                addProfileCollect(profileId);
              }}
            >
              <div className="social_nav_list_item_icon">
                <img
                  className="social_nav_list_item_icon_img"
                  src={profileData.is_like === "0" ? unLikeIcon : likeIcon}
                  alt="likeIcon"
                />
              </div>
              <div className="social_nav_list_item_text">
                {profileData.total_like
                  ? profileData.total_like
                  : intl.formatMessage({ id: "SOCIAL.DETAIL.INFO.LABEL.LIKE" })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile">
        <div className="profile_nav">
          <div className="profile_nav_option">
            <div
              className={
                "profile_nav_option_item " + (info_select === 0 ? "active" : "")
              }
              onClick={() => {
                set_info_select(0);
              }}
            >
              {intl.formatMessage({ id: "SOCIAL.DETAIL.INFO.LABEL.DATA" })}
            </div>
            <div
              className={
                "profile_nav_option_item " + (info_select === 1 ? "active" : "")
              }
              onClick={() => {
                set_info_select(1);
              }}
            >
              {intl.formatMessage({
                id: "SOCIAL.DETAIL.INFO.LABEL.INTRODUCTION",
              })}
            </div>
            <div
              className="profile_nav_option_bar"
              style={{
                left: info_select === 0 ? "0%" : "50%",
              }}
            />
          </div>
          <div className="profile_nav_create">
            <span className="profile_nav_create_text">
              {intl.formatMessage({
                id: "SOCIAL.DETAIL.INFO.LABEL.RELEASE_TIME",
              })}
              {profileData.create_time}
            </span>
          </div>
        </div>
        <div className="profile_window">
          <div
            className="profile_windoe_content"
            style={{
              transform:
                "translateX(" + (info_select === 0 ? "0%" : "-50%") + ")",
            }}
          >
            <div className="profile_windoe_content_card">
              <p className="profile_windoe_content_card_title">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.PERSONAL_INFORMATION",
                })}
              </p>
              <p className="profile_windoe_content_card_info">
                {intl.formatMessage({ id: "SOCIAL.DETAIL.INFO.LABEL.AGE" })}：
                {profileData.age}
                {intl.formatMessage({ id: "SOCIAL.DETAIL.INFO.UNIT.AGE" })}
              </p>
              <p className="profile_windoe_content_card_info">
                {intl.formatMessage({ id: "SOCIAL.DETAIL.INFO.LABEL.FIGURE" })}
                ： {profileData.height}
                {intl.formatMessage({ id: "SOCIAL.DETAIL.INFO.UNIT.CM" })}
              </p>
              <p className="profile_windoe_content_card_info">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.POSITION",
                })}
                ：{profileData.city}
              </p>
              <p className="profile_windoe_content_card_title">
                {intl.formatMessage({
                  id: "SOCIAL.DETAIL.INFO.LABEL.CONTACT_DETAILS",
                })}
              </p>
              {profileData.contact ? (
                profileData.contact.lock ? (
                  <p className="profile_windoe_content_card_info">
                    {intl.formatMessage({
                      id: "SOCIAL.DETAIL.INFO.LABEL.UNLOCKED.NOW",
                    })}
                  </p>
                ) : (
                  <>
                    <p className="profile_windoe_content_card_info">
                      {intl.formatMessage({
                        id: "SOCIAL.DETAIL.INFO.LABEL.PHONE",
                      })}
                      ：{profileData.contact.phone}
                    </p>
                    <p className="profile_windoe_content_card_info">
                      {intl.formatMessage({
                        id: "SOCIAL.DETAIL.INFO.LABEL.WECHAT",
                      })}
                      ：{profileData.contact.wechat}
                    </p>
                    <p className="profile_windoe_content_card_info">
                      {intl.formatMessage({
                        id: "SOCIAL.DETAIL.INFO.LABEL.QQ",
                      })}
                      ：{profileData.contact.qq}
                    </p>
                    <p className="profile_windoe_content_card_info">
                      {intl.formatMessage({
                        id: "SOCIAL.DETAIL.INFO.LABEL.TUDOU",
                      })}
                      ：{profileData.contact.tudou}
                    </p>
                    <p className="profile_windoe_content_card_info">
                      {intl.formatMessage({
                        id: "SOCIAL.DETAIL.INFO.LABEL.LINE",
                      })}
                      ：{profileData.contact.line}
                    </p>
                  </>
                )
              ) : (
                ""
              )}
            </div>
            <div
              className="profile_windoe_content_card"
              dangerouslySetInnerHTML={{
                __html: profileData.des,
              }}
            />
          </div>
        </div>
      </div>
    </SocialDetailInfoElement>
  );
}

export default SocialDetailInfo;

const SocialDetailInfoElement = styled.div`
  /*  */
  .buy_vip_cover {
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
    max-width: 599px;
    background-color: #000a;

    &_container {
      padding: ${padding}px;
      background-color: #fff;
      border-radius: 10px;

      &_title {
        text-align: center;

        &_text {
          font-size: 18px;
          font-weight: 900;
        }
      }

      &_description {
        margin-top: 20px;
        text-align: center;

        &_text {
          font-size: 14px;
        }
      }

      &_btn {
        margin-top: 20px;

        &_button {
          cursor: pointer;
          padding: 10px 30px;
          margin-top: 10px;
          width: 200px;
          text-align: center;
          border-radius: 50px;

          &_text {
            letter-spacing: 1px;
            color: ${colors.text_light_grey};
          }

          &.active {
            background-image: linear-gradient(to Top, #f24c7c, #f793b0);

            .buy_vip_cover_container_btn_button_text {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .social {
    text-align: -webkit-center;
    &_pictrue {
      display: flex;
      justify-content: center;
      align-self: center;
      align-content: center;
      @media (min-width: 899px) {
        width: 30%;
      }
      &_slider {
        overflow: hidden;
        width: 100%;
        height: min(100vw, 1000px);
        .swiper-pagination-bullet-active {
          background-color: #fff;
          box-shadow: 1px 1px 2px rgb(0 0 0 / 90%);
        }
        @media (min-width: 899px) {
          height: min(50vw, 600px);
        }

        &_item {
          &_img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }

    &_title {
      display: flex;
      align-items: center;
      padding: 10px ${padding}px;

      &_text {
        font-size: 16px;
        font-weight: 700;
      }

      &_icon {
        margin-left: 5px;
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
    }

    &_nav {
      display: flex;
      align-items: center;
      padding: 0 ${side_padding}px;

      &_btn {
        padding-left: ${padding}px;
        box-sizing: border-box;
        width: 55%;

        &_button {
          cursor: pointer;
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px 0;
          font-size: 14px;
          color: #f24c7c;
          background-color: rgb(250 113 154 / 20%);
          border: 1px solid #f24c7c;
          border-radius: 20px;
          font-weight: 800;
        }
      }

      &_list {
        display: flex;
        justify-content: space-evenly;
        width: 45%;

        &_item {
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          color: #000;

          &_icon {
            width: 50px;
            height: 50px;

            &_img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
              object-fit: contain;
            }
          }

          &_text {
            font-size: 12px;
          }
        }
      }
    }
  }

  .profile {
    &_nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 ${padding}px;
      color: ${colors.text_grey};
      border-bottom: 1px solid #000;

      &_option {
        position: relative;

        &_item {
          cursor: pointer;
          display: inline-block;
          padding: 15px 0;
          box-sizing: border-box;
          width: 50px;
          text-align: center;

          &.active {
            color: ${colors.dark_pink};
            transition: 0.2s;
          }
        }

        &_bar {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: ${colors.dark_pink};
          transition: 0.2s;
        }
      }

      &_create {
        &_text {
          font-size: 14px;
        }
      }
    }

    &_windoe {
      padding: ${padding}px;
      box-sizing: border-box;

      &_content {
        width: 200%;
        font-size: 0;
        vertical-align: top;
        transition: 0.2s;

        &_card {
          display: inline-block;
          padding: ${padding}px;
          box-sizing: border-box;
          width: 50%;
          font-size: 16px;
          vertical-align: top;

          &_title,
          &_info,
          p {
            padding: 10px 0;
          }

          &_title {
            color: ${colors.text_light_grey};
          }
        }
      }
    }
  }
`;
