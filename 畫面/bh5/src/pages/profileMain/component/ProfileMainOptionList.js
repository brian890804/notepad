import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { adsKeys, colors } from "../../../constants";
// import { bottom_nav_height } from "../../component/BottomNavBar";
import ImageCarousel from "../../component/ImageCarousel";

import optionAppIcon from "../../../assets/profile/option_app.svg";
// import optionShareIcon from "../../../assets/profile/option_share.svg";
import optionGiftIcon from "../../../assets/profile/option_gift.svg";
import optionCollectIcon from "../../../assets/profile/option_collect.svg";
import optionServiceIcon from "../../../assets/profile/option_service.svg";

// import oprionOrderIcon from "../../../assets/profile/oprion_order.svg";
import optionMyorderIcon from "../../../assets/profile/option_myorder.svg";
import optionFeedbackIcon from "../../../assets/profile/option_feedback.svg";
// import optionHistoryIcon from "../../../assets/profile/option_history.svg";
// import optionManualRechargeIcon from "../../../assets/profile/option_manual_recharge.svg";
import optionMissionIcon from "../../../assets/profile/option_mission.svg";
import optionSwitchIcon from "../../../assets/profile/option_swtich.svg";
import optionNotificationIcon from "../../../assets/profile/option_notification.svg";
// import optionPaymentIcon from "../../../assets/profile/option_payment.svg";
import optionPurchaseIcon from "../../../assets/profile/option_purchase.svg";
import optionHistoryIcon from "../../../assets/profile/buy_history.svg";
// import optionRecordIcon from "../../../assets/profile/option_record.svg";
import optionSocialIcon from "../../../assets/profile/option_social.svg";
import buyDiscountIcon from "../../../assets/profile/buy_discount.svg";
import store from "../../../store";
import useMediaSetting from "../../../reackHook/useMediaSetting";

const ProfileMainOptionList = ({ optionEvent, buyDiscount }) => {
  const { isMobile } = useMediaSetting();
  const intl = useIntl();
  const optionListMiddle = [
    // {
    //   id: "app",
    //   icon: optionAppIcon,
    //   name: intl.formatMessage({ id: "PROFILE.MAIN.OPTION.APPLICATION" }),
    // },
    {
      id: "socialGroup",
      icon: optionSocialIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.OFFICIAL_FRIEND_GROUP",
      }),
    },
    {
      id: "buyDiscount",
      icon: buyDiscountIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.BUY_DISCOUNT",
      }),
    },
  ];

  const optionListBottom = [
    {
      id: "service",
      icon: optionServiceIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.COMMON_PROBLEM",
      }),
    },
    {
      id: "feedback",
      icon: optionFeedbackIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.FEEBACK",
      }),
    },
  ];
  let [optionListTop, setOptionListTop] = useState([
    {
      id: "collect",
      icon: optionCollectIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.OWN.COLLECT",
      }),
    },
    {
      id: "bundle",
      icon: optionGiftIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.OWN.GIFT",
      }),
      decoration: {
        show: false,
        type: 0,
        text: intl.formatMessage({
          id: "PROFILE.MAIN.OPTION.NEWS.DISCOUNT",
        }),
      },
    },
    {
      id: "purchase",
      icon: optionPurchaseIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.HISTORY.BUY",
      }),
    },
    {
      id: "watchHistory",
      icon: optionHistoryIcon,
      name: intl.formatMessage({
        id: "PROFILE.MAIN.OPTION.HISTORY.WATCH",
      }),
    },
    {
      id: "notification",
      icon: optionNotificationIcon,
      name: intl.formatMessage({ id: "PROFILE.MAIN.OPTION.NEWS" }),
    },
    {
      id: "myorder",
      icon: optionMyorderIcon,
      name: intl.formatMessage({ id: "PROFILE.MAIN.OPTION.MALL_ORDER" }),
    },
    {
      id: "mission",
      icon: optionMissionIcon,
      name: intl.formatMessage({ id: "PROFILE.MAIN.OPTION.TASK" }),
    },
    {
      id: "switchLanguage",
      icon: optionSwitchIcon,
      name: intl.formatMessage({ id: "PROFILE.MAIN.OPTION.SWITCH_LANGUAGE" }),
    },
    // {
    //   id: "manualRecharge",
    //   icon: optionManualRechargeIcon,
    //   name: "人工代充",
    // },
    // {
    //   id: "share",
    //   icon: optionShareIcon,
    //   name: "推广看片",
    // },
  ]);

  useEffect(() => {
    optionListTop[1].decoration.show =
      store.getState().user.new_coupon_notification;
    setOptionListTop(optionListTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileMainOptionListElement>
      <div className="list_container fw-m">
        <h3 className="list_container_title fw-l">
          {intl.formatMessage({ id: "PROFILE.MAIN.OPTION.COMMON_EFFECT" })}
        </h3>
        {optionListTop.map((data) => {
          return (
            <div
              className="list_container_item"
              key={data.id}
              onClick={() => {
                optionEvent[data.id]();
              }}
            >
              <div className="list_container_item_icon">
                <img
                  className="list_container_item_icon_img"
                  src={data.icon}
                  alt="mission"
                />
              </div>
              <div className="list_container_item_title">
                <span className="list_container_item_title_text">
                  {data.name}
                </span>
              </div>
              {data.decoration?.show ? (
                data.decoration.type === 0 ? (
                  <div className="list_container_item_decoration">
                    {data.decoration.text}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <div className="list_container_item_arrow">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          );
        })}
      </div>
      <ImageCarousel
        adsKey={adsKeys.profile_interval}
        threeInOneBanner={!isMobile}
      />
      <div className="list_container fw-m">
        <h3 className="list_container_title">
          {intl.formatMessage({ id: "PROFILE.MAIN.OPTION.GODD_STUFF" })}
        </h3>
        {optionListMiddle.map((data) => {
          return (
            <div
              className="list_container_item"
              key={data.id}
              onClick={() => {
                if (data.id === "buyDiscount") {
                  buyDiscount();
                } else {
                  optionEvent[data.id]();
                }
              }}
            >
              <div className="list_container_item_icon">
                <img
                  className="list_container_item_icon_img"
                  src={data.icon}
                  alt="mission"
                />
              </div>
              <div className="list_container_item_title">
                <span className="list_container_item_title_text">
                  {data.name}
                </span>
              </div>
              <div className="list_container_item_arrow">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="list_container fw-m">
        <h3 className="list_container_title">
          {intl.formatMessage({ id: "PROFILE.MAIN.OPTION.CALL_US" })}
        </h3>
        {optionListBottom.map((data) => {
          return (
            <div
              className="list_container_item"
              key={data.id}
              onClick={() => {
                optionEvent[data.id]();
              }}
            >
              <div className="list_container_item_icon">
                <img
                  className="list_container_item_icon_img"
                  src={data.icon}
                  alt="mission"
                />
              </div>
              <div className="list_container_item_title">
                <span className="list_container_item_title_text">
                  {data.name}
                </span>
              </div>
              <div className="list_container_item_arrow">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          );
        })}
      </div>
    </ProfileMainOptionListElement>
  );
};

export default ProfileMainOptionList;

export const ProfileMainOptionListElement = styled.div`
  /*  */
  padding: 2% 1% 1% 1%;
  background-color: ${colors.back_grey};

  .list_container {
    padding: 1%;
    background-color: #fff;
    font-size: 14px;

    @media (min-width: 599px) {
      font-size: 20px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &_title {
      font-size: 16px;
      padding-top: 14px;
      font-weight: 900;
      @media (min-width: 599px) {
        font-size: 24px;
      }
    }

    &_item {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      margin-top: 5px;
      border-bottom: 1px solid #aaa;

      &:last-child {
        border-bottom: none;
      }

      &_icon {
        margin-right: 5px;

        &_img {
          width: 34px;
          height: 34px;
          vertical-align: middle;
        }
      }

      &_title {
        margin-right: auto;
      }

      &_decoration {
        padding: 5px;
        margin-right: 10px;
        color: ${colors.dark_pink};
        background-color: ${colors.light_pink};
      }
    }
  }
`;
