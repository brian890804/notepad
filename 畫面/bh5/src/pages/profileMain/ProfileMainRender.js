import { useEffect, useState, useRef, createRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";

import ProfileMainHeader from "./component/ProfileMainHeader";
import ProfileMainNav from "./component/ProfileMainNav";
import ProfileMainMissionCenter from "./component/ProfileMainMissionCenter";
import ProfileMainOptionList from "./component/ProfileMainOptionList";
import {
  downloadPage,
  officialContact,
  pageUrlConstants,
  profileFeedback,
  profileService,
} from "../../constants";

import { ReactComponent as Downloadapp } from "../../assets/profile/phone.svg";
import { bottom_nav_height } from "../component/BottomNavBar";
import useMediaSetting from "../../reackHook/useMediaSetting";

import TopBarContainer from "../component/TopBarContainer";
import WebTopBar from "../homeMainSwitch/component/WebTopBar";
import { main_height } from "../component/TopBarContainer";
import FirstRecharge from "../component/FirstRechargeCover";
const number = 6 * 60 * 60;
const ProfileMain = ({
  user,
  config,
  group_cs,
  updataUser,
  dailyLogin,
  pushRoutes,
  showMentionAppCover,
  dailyEvent,
  gosharef,
}) => {
  const intl = useIntl();

  const mentionDescription = useRef();

  const {
    id,
    username,
    nick_name,
    avatar,
    sex,
    time,
    rank = "",
    day_usedviewcount,
    day_maxviewcount,
    day_share,
    sign,
    money,
    free_gashapon,
  } = user;
  let storeTime = Number(window.localStorage.getItem("firstChargeTime"));
  const [reciprocal, setReciprocal] = useState(storeTime);
  const times = {
    hour: `${0}${~~(reciprocal / 60 / 60)}`,
    min: `${(reciprocal / 60) % 60 <= 10 ? 0 : ""}${~~(
      (reciprocal / 60) %
      60
    )}`,
    sec: `${~~(reciprocal % 60) <= 9 ? 0 : ""}${~~(reciprocal % 60)}`,
  };
  const [mentionAppValue, setMentionAppValue] = useState(true);
  const firstChargeRef = createRef(null);
  const { size, isMobile } = useMediaSetting();
  const { width } = size;

  useEffect(() => {
    if (user.id !== "guest") {
      updataUser();
    }

    setOptionEvent({
      mission,
      switchLanguage,
      manualRecharge,
      myorder,
      purchase,
      feedback,
      socialGroup,
      notification,
      app,
      share,
      bundle,
      collect,
      watchHistory,
      service,
    });

    setTimeout(() => {
      setMentionAppValue(false);
      setTimeout(() => {
        if (mentionDescription.current)
          mentionDescription.current.style.display = "none";
      }, 1550);
    }, 6000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [optionEvent, setOptionEvent] = useState({});

  function mission() {
    pushRoutes(pageUrlConstants.profile.pages.profileMission);
  }
  function switchLanguage() {
    pushRoutes(pageUrlConstants.profile.pages.profileSwitchLanguage);
  }
  function redirectBuy() {
    pushRoutes(pageUrlConstants.profile.pages.profileDirectBuyVip);
  }
  function manualRecharge() {
    let link = document.createElement("a");
    link.href = group_cs;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }

  function app() {
    // pushRoutes(pageUrlConstants.profile.pages)
    // console.log("app");
    window.open(downloadPage[2]);
  }
  function share() {
    pushRoutes(pageUrlConstants.profile.pages.profileShare);
  }
  function bundle() {
    pushRoutes(
      pageUrlConstants.profile.pages.profileBundle.pages.profileBundleCoupon
    );
  }
  function collect() {
    pushRoutes(
      pageUrlConstants.profile.pages.profileMyCollect.pages
        .profileMyCollectComic
    );
  }
  function service() {
    window.open(profileService);
  }
  function myorder() {
    pushRoutes(pageUrlConstants.profile.pages.profileMyorder);
  }

  function watchHistory() {
    pushRoutes(
      pageUrlConstants.profile.pages.profileWatchHistory.pages
        .profileWatchHistoryComic
    );
  }

  function purchase() {
    pushRoutes(
      pageUrlConstants.profile.pages.profilePurchaseRecord.pages
        .profilePurchaseRecordComic
    );
  }
  function feedback() {
    window.open(profileFeedback);
  }

  function socialGroup() {
    window.open(officialContact);
  }
  function buyDiscount() {
    openFirstCharge();
  }

  function notification() {
    pushRoutes(pageUrlConstants.notice);
  }
  function openFirstCharge() {
    firstChargeRef.current.handleOpen();
  }

  useEffect(() => {
    if (storeTime == null || storeTime <= 0) {
      window.localStorage.setItem("firstChargeTime", number);
    }
    const time = setInterval(() => {
      setReciprocal((prev) => {
        if (prev > 0) {
          window.localStorage.setItem("firstChargeTime", prev - 1);
          return prev - 1;
        } else {
          window.localStorage.setItem("firstChargeTime", number);
          return number;
        }
      });
    }, 1000);
    return () => time;
  }, []);
  return (
    <ProfileMainElement>
      {!isMobile && (
        <TopBarContainer>
          <WebTopBar />
        </TopBarContainer>
      )}
      <FirstRecharge ref={firstChargeRef} user={user} times={times} />
      <ProfileMainHeader
        id={id}
        username={username}
        nick_name={nick_name}
        avatar={avatar}
        sex={sex}
        time={time}
        rank={rank}
        day_usedviewcount={day_usedviewcount}
        day_maxviewcount={day_maxviewcount}
        day_share={day_share}
        dailyLogin={dailyLogin}
        redirectBuy={redirectBuy}
      />
      <ProfileMainNav
        free_gashapon={free_gashapon}
        group_cs={group_cs}
        sign={sign}
        money={money}
      />
      {id !== "guest" && (
        <ProfileMainMissionCenter
          optionEvent={optionEvent}
          config={config}
          dailyEvent={dailyEvent}
          gosharef={gosharef}
        />
      )}
      <ProfileMainOptionList
        optionEvent={optionEvent}
        buyDiscount={buyDiscount}
      />
      <MentaionAppBannerElement root_width={width}>
        <div
          className="container"
          onClick={() => {
            showMentionAppCover();
            setMentionAppValue(false);
          }}
        >
          <div
            ref={mentionDescription}
            className={
              "container_description " + (mentionAppValue ? "open" : "")
            }
          >
            {intl.formatMessage({ id: "PROFILE.MAIN.label.DESCRIPTION" })}
            <div className="container_description_arrow">
              <div className="main_arrow">
                <div className="main_arrow_gap main_arrow_gap4"></div>
                <div className="main_arrow_body"></div>
                <div className="main_arrow_gap main_arrow_gap3"></div>
                <div className="main_arrow_body"></div>
                <div className="main_arrow_gap main_arrow_gap2"></div>
                <div className="main_arrow_body"></div>
                <div className="main_arrow_gap main_arrow_gap1"></div>
                <div className="main_arrow_body"></div>
                <div className="main_arrow_body"></div>
                <div className="main_arrow_arrowhead"></div>
              </div>
            </div>
          </div>
          <div className="container_icon">
            <Downloadapp className="container_icon_svg" alt="app" />
          </div>
        </div>
      </MentaionAppBannerElement>
    </ProfileMainElement>
  );
};

export default ProfileMain;

export const ProfileMainElement = styled.div`
  /*  */
  @media (min-width: 599px) {
    margin-top: ${main_height}px;
  }
  @media (max-width: 599px) {
    padding-bottom: 15%;
  }

  .social_group_cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #000a;

    &_container {
      padding: 10px 0 10px 30px;
      box-sizing: border-box;
      width: 20%;
      background-color: #fff;
      border-radius: 5px;

      &_item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 20px 0;
        text-decoration: none;
        color: #000;

        &_icon {
          width: 45px;
          height: 100%;

          &_img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }

        &_text {
          margin-left: 15px;
          font-size: 20px;
        }
      }
    }
  }
`;

const MentaionAppBannerElement = styled.div`
  /*  */
  position: fixed;
  right: 10px;
  bottom: calc(${bottom_nav_height}px + 5px);
  z-index: 1;

  @media only screen and (min-width: 599px) {
    right: 50%;
    bottom: 2%;
    transform: ${({ root_width }) => "translateX(" + root_width * 0.49 + "px)"};
    display: flex;
    justify-content: center;
  }

  .container {
    font-size: 12px;
    color: #fff;
    display: flex;
    justify-content: center;

    &_description,
    &_icon {
      cursor: pointer;
      display: inline-block;
    }

    &_icon {
      padding: 7px;
      background-color: #f14c7b;
      border-radius: 50%;

      &_svg {
        width: 24px;
        height: 24px;
        vertical-align: top;
        transition: 1s 1.5s;
      }
    }

    &_description {
      place-self: center;
      padding: 4px 10px;
      margin-right: 5px;
      box-sizing: border-box;
      clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
      background-color: #f14c7b;
      border-radius: 16px;
      opacity: 0%;
      transition: 1s 0.5s;

      &_arrow {
        display: inline-block;
        margin-left: 5px;
        width: 50px;
        vertical-align: text-top;
      }

      &.open {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        opacity: 100%;

        & + .container_icon .container_icon_svg {
          width: 24px;
          height: 24px;
          transition: 0s;
        }
      }
    }
  }

  .main_arrow {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .main_arrow_gap {
    width: 6%;
  }

  .main_arrow_gap1 {
    animation: 2s arrow-gap-1 infinite;
  }

  .main_arrow_gap2 {
    animation: 2s arrow-gap-2 infinite;
  }

  .main_arrow_gap3 {
    animation: 2s arrow-gap-3 infinite;
  }

  .main_arrow_gap4 {
    animation: 2s arrow-gap-4 infinite;
  }

  .main_arrow_body {
    width: 12%;
    height: 8px;
    background-color: #fff;
  }

  .main_arrow_arrowhead {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #fff;
    animation: 2s arrow-head infinite;
  }

  @keyframes arrow-gap-1 {
    0% {
      width: 4%;
    }

    50% {
      width: 4%;
    }

    85% {
      width: 6%;
    }

    88% {
      width: 3%;
    }

    100% {
      width: 4%;
    }
  }

  @keyframes arrow-gap-2 {
    0% {
      width: 4%;
    }

    50% {
      width: 4%;
    }

    85% {
      width: 6%;
    }

    91% {
      width: 3%;
    }

    100% {
      width: 4%;
    }
  }

  @keyframes arrow-gap-3 {
    0% {
      width: 4%;
    }

    50% {
      width: 4%;
    }

    85% {
      width: 6%;
    }

    94% {
      width: 3%;
    }

    100% {
      width: 4%;
    }
  }

  @keyframes arrow-gap-4 {
    0% {
      width: 4%;
    }

    50% {
      width: 4%;
    }

    85% {
      width: 6%;
    }

    97% {
      width: 3%;
    }

    100% {
      width: 4%;
    }
  }

  @keyframes arrow-head {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1, 0.8);
    }

    95% {
      transform: scale(1, 1.05);
    }

    100% {
      transform: scale(1, 1);
    }
  }
`;
