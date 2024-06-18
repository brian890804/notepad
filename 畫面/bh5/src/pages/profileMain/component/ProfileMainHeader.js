import { useState, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import Lottie from "lottie-react";
import styled from "@emotion/styled/macro";

import banner_bg from "../../../assets/profile/banner_bg.jpg";
import ImageComponent from "../../component/ImageComponent";

import maleIcon from "../../../assets/icons/male_alt.svg";
import femaleIcon from "../../../assets/icons/female_alt.svg";
import crownIcon from "../../../assets/icons/crown.png";

import badge_bg_lv1 from "../../../assets/profile/badge_bg_lv_1.png";
import badge_bg_lv2 from "../../../assets/profile/badge_bg_lv_2.png";
import badge_bg_lv3 from "../../../assets/profile/badge_bg_lv_3.png";
import badge_bg_lv4 from "../../../assets/profile/badge_bg_lv_4.png";
import badge_bg_lv5 from "../../../assets/profile/badge_bg_lv_5.png";
import openVip from "../../../assets/profile/open_vip.json";

import power_free from "../../../assets/profile/power_free.svg";
import power_watch from "../../../assets/profile/power-watch.svg";
import power_service from "../../../assets/profile/power-service.svg";
import power_sign from "../../../assets/profile/power_sign.svg";

import buyBag from "../../../assets/profile/buy_bag.svg";

import gearIcon from "../../../assets/profile/gear.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  colors,
  padding,
  pageUrlConstants,
  userRank,
} from "../../../constants";
import LinkComponent from "../../component/LinkComponent";
import useMediaSetting from "../../../reackHook/useMediaSetting";
import PostsAddModalPage from "../../component/ModalRender";

const { profile, login } = pageUrlConstants;

const ProfileMainHeader = ({
  id,
  time,
  avatar,
  username,
  nick_name,
  sex,
  rank,
  day_usedviewcount,
  day_maxviewcount,
  day_share,
  dailyLogin,
  redirectBuy,
}) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  const [badge, setBadge] = useState("");
  const [membershipDate, setMembershipDate] = useState("");
  const [expirationTip, setExpirationTip] = useState(false);

  useEffect(() => {
    const variable =
      time === "-1"
        ? intl.formatMessage({ id: "PROFILE.BUY.WATCH.FOREVER_1" })
        : Date.now() > time * 1000
        ? intl.formatMessage({ id: "PROFILE.MAIN.VIP.MATURITY" })
        : new Date(time * 1000).toLocaleDateString().toString();
    setMembershipDate(variable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  function judgeMembershipExpiration() {
    if (id !== "guest") {
      if (time !== "-1" || Date.now() > time * 1000) {
        setExpirationTip(true);
      } else {
        setExpirationTip(false);
      }
    }
  }
  useEffect(() => {
    //判斷是否要跳出會員權益提醒
    const storedData = window.localStorage.getItem("member_expired_float_show");
    if (storedData) {
      const expirationTime = JSON.parse(storedData);
      // 檢查值是否已過期
      if (new Date().getTime() > expirationTime) {
        // 值已過期，執行相應的處理
        judgeMembershipExpiration();
      } else {
        // 值尚未過期，可以繼續使用
        setExpirationTip(false);
      }
    } else {
      judgeMembershipExpiration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const getBadge = useCallback(
    (rank) => {
      switch (rank) {
        case userRank[0]:
          return badge_bg_lv1;
        case userRank[1]:
          return badge_bg_lv2;
        case userRank[2]:
          return badge_bg_lv3;
        case userRank[3]:
          return badge_bg_lv4;
        default:
          return badge_bg_lv5;
      }
    },
    [rank]
  );

  useEffect(() => {
    setBadge(getBadge(rank));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank]);

  const memberPowerItem = [
    {
      icon: power_free,
      text: intl.formatMessage({ id: "PROFILE.BUY.LABEL.FREE" }),
    },
    {
      icon: power_watch,
      text: intl.formatMessage({ id: "PROFILE.BUY.LABEL.WATCH.FOREVER" }),
    },
    {
      icon: power_service,
      text: intl.formatMessage({ id: "PROFILE.BUY.LABEL.EXCLUSIVE" }),
    },
    {
      icon: power_sign,
      text: intl.formatMessage({ id: "PROFILE.BUY.LABEL.PREMIUM_ICON" }),
    },
  ];
  return (
    <ProfileMainHeaderElement isMobile={isMobile}>
      <LinkComponent
        className="profile_gear "
        routes={profile.pages.profileSetInfo}
      >
        <img className="profile_gear_img " src={gearIcon} alt="gear iicon" />
      </LinkComponent>
      <LinkComponent
        className="profile_header_info"
        routes={
          id === "guest"
            ? login.pages.loginMain
            : profile.pages.profileEdit.pages.profileEditInfo
        }
      >
        <div className="profile_header_info_avatar ml-3 mt-5">
          <ImageComponent
            is_cover={true}
            src={avatar}
            placeholderImg={avatar}
            alt={nick_name}
            title={nick_name}
            border_radius={"50%"}
            background_color="transparent"
          />
          <img
            className="profile_header_info_avatar_sex"
            src={sex === 1 ? femaleIcon : maleIcon}
            alt="sex"
          />
        </div>
        <div className="profile_header_info_detill mt-5">
          <div className="profile_header_info_detill_title">
            {id === "guest"
              ? intl.formatMessage({ id: "PROFILE.MAIN.CLICK.LOGIN" })
              : nick_name || username}
          </div>
          {rank ? (
            <div
              className="profile_header_info_detill_title_badge my-2 fw-m"
              style={{
                backgroundImage: "url(" + badge + ")",
              }}
            >
              {/* {rank.replace(
                intl.formatMessage({ id: "PROFILE.MAIN.LABEL.MEMBER" }),
                ""
              )} */}
              {rank.replace("会员", "")}
            </div>
          ) : (
            ""
          )}
          {id !== "guest" ? (
            <div className="profile_header_info_detill_time">
              {time === "-1" || Date.now() < time * 1000 ? (
                <img
                  className="profile_header_info_detill_time_crown"
                  src={crownIcon}
                  alt="crown"
                />
              ) : (
                ""
              )}
              <span className="profile_header_info_detill_time_text fw-m">
                {membershipDate}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="profile_header_info_arrow mt-5 mr-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </LinkComponent>
      <div className="profile_header_daily">
        <div className="profile_header_daily_view">
          <p className="profile_header_daily_view_amount fw-m">
            {id !== "guest" ? (
              time === "-1" || Date.now() < time * 1000 ? (
                intl.formatMessage({ id: "PROFILE.MAIN.LABEL.INFINITE" })
              ) : (
                day_usedviewcount + "/" + day_maxviewcount
              )
            ) : (
              <>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </>
            )}
          </p>
          <p className="profile_header_daily_view_text">
            {intl.formatMessage({ id: "PROFILE.MAIN.WATCH.MOUNT.TODAY" })}
          </p>
        </div>
        <div className="profile_header_daily_share">
          <p className="profile_header_daily_share_amount fw-m">
            {id !== "guest" ? (
              day_share
            ) : (
              <>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </>
            )}
          </p>
          <p className="profile_header_daily_share_text ">
            {intl.formatMessage({ id: "PROFILE.MAIN.HEAP.SHARE.ACCOUNT" })}
          </p>
        </div>
        <LinkComponent
          className="profile_header_daily_vendor"
          routes={pageUrlConstants.vendor}
        >
          <img
            className="profile_header_daily_vendor_icon"
            src={buyBag}
            alt="buy bag"
          />
          <span className="profile_header_daily_vendor_text fw-m">
            {intl.formatMessage({ id: "PROFILE.MAIN.LABEL.GO_MALL" })}
            <FontAwesomeIcon
              className="profile_header_daily_vendor_text_arrow"
              icon={faAngleRight}
            />
          </span>
        </LinkComponent>
      </div>
      <LinkComponent
        className="profile_header_vip g-center"
        routes={
          pageUrlConstants.profile.pages.profileBuyVip.pages.profileBuyVipCommon
        }
      >
        <Lottie
          animationData={openVip}
          loop={true}
          className="profile_header_vip_img"
          alt="open vip"
        />
      </LinkComponent>
      <PostsAddModalPage
        initStatus={expirationTip}
        title={intl.formatMessage({
          id: "PROFILE.MAIN.LABEL.MEMBER_BENEFIT_TIP",
        })}
        buttonProps={{
          text: intl.formatMessage({
            id: "PROFILE.MAIN.LABEL.CONTINUE_BUY",
          }),
          onButtonClick: () => redirectBuy(),
          localStorageName: "member_expired_float_show",
        }}
      >
        <div className="profile_main_cover">
          <div className="profile_main_cover_tip">
            {intl.formatMessage({
              id: "PROFILE.MAIN.LABEL.MEMBER_DESCRIPTION",
            })}
          </div>
          <div className="profile_main_cover_power">
            <div className="profile_main_cover_power_subtitle">
              {intl.formatMessage({
                id: "PROFILE.DIRECT_BUY_VIP.MEMBER_PERMISSIONS",
              })}
            </div>
            <div className="profile_main_cover_power_items">
              {memberPowerItem.map((item) => (
                <div className="profile_main_cover_power_item">
                  <img src={item.icon} alt={item.text} />
                  {item.text}
                </div>
              ))}
            </div>
            <div className="profile_main_cover_power_description">
              {intl.formatMessage({
                id: "PROFILE.MAIN.LABEL.MEMBER_DESCRIPTION_1",
              })}
            </div>
          </div>
        </div>
      </PostsAddModalPage>
    </ProfileMainHeaderElement>
  );
};

export default ProfileMainHeader;

const ProfileMainHeaderElement = styled.div`
  /*  */
  position: relative;
  color: #fff;
  background-position: center;
  background-size: cover;
  background-image: url(${banner_bg});

  .profile_gear {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;

    &_img {
      width: 27px;
      height: 27px;
      vertical-align: middle;

      @media (max-width: 599px) {
        width: 20px;
        height: 20px;
      }
    }
  }

  .profile_header {
    &_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px ${padding}px 10px;
      font-size: ${({ isMobile }) => (isMobile ? "20px" : "22px")};
      text-decoration: none;
      color: #fff;
      @media (max-width: 599px) {
        padding: 0px ${padding}px 10px 0;
      }
      &_avatar {
        flex-shrink: 0;
        position: relative;
        margin-right: 30px;
        width: 80px;
        height: 80px;
        border-radius: 50%;

        &_sex {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 20px;
          height: 20px;
        }
      }

      &_detill {
        flex-grow: 1;

        &_title {
          &_badge {
            padding-top: 7px;
            padding-left: 24px;
            text-align: center;
            max-width: 50px;
            height: 18px;
            font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
            line-height: 11px;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }

        &_time {
          display: flex;
          align-items: center;
          margin-top: 5px;

          &_crown {
            margin-right: 10px;
            width: 30px;
          }

          &_text {
            font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
          }
        }
      }
    }

    &_daily {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 10px;

      &_view,
      &_share {
        &_amount {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: ${({ isMobile }) => (isMobile ? "14px" : "20px")};
          text-align: center;
        }

        &_text {
          margin-top: 10px;
          font-size: ${({ isMobile }) => (isMobile ? "14px" : "20px")};
        }
      }

      &_vendor {
        margin-top: 35px;
        cursor: pointer;
        padding: 6px 6px 6px 55px;
        text-decoration: none;
        color: #fff;
        border: 1px solid #39b3fd;
        border-radius: 5px;

        @media (max-width: 599px) {
          margin-top: 20px;
        }

        &_icon {
          margin: -50px 2px -15px -60px;
          max-width: 58px;
          @media (max-width: 599px) {
            max-width: 40px;
          }
        }

        &_text {
          font-size: ${({ isMobile }) => (isMobile ? "18px" : "20px")};

          &_arrow {
            margin-left: 5px;
            vertical-align: bottom;
          }
        }
      }

      /* &_check {
      cursor: pointer;
      padding: 3px 7px;
      width: auto;
      border: 1px solid white;
      border-radius: 20px;

      &_text {
        font-size:${({ isMobile }) => (isMobile ? "14px" : "16px")};
      }
    } */
    }

    &_vip {
      &_img {
        cursor: pointer;
        width: ${({ isMobile }) => (isMobile ? "90%" : "30%")};
        vertical-align: middle;
      }
    }
  }
  .profile_main_cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    &_tip {
      color: ${colors.text_grey};
      padding: 0 2em;
      font-size: 18px;
    }
    &_power {
      &_subtitle {
        position: relative;
        color: #000;
        font-weight: 700;

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 20%;
          border: solid 1px ${colors.text_light_grey};
        }

        &::before {
          right: 10%;
        }

        &::after {
          left: 10%;
        }
      }

      &_items {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-top: 10px;
      }
      &_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: ${colors.text_light_grey};
        font-size: 14px;
        img {
          width: 40px;
        }
      }

      &_description {
        color: ${colors.text_light_grey};
        margin-top: 5px;
        font-size: 16px;
      }
    }
  }
`;
