import { useState, useRef, useEffect, createRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import TopBarContainer, {
  main_height,
  sub_height,
} from "../component/TopBarContainer";
import TopBar from "./component/TopBar";
import WebTopBar from "./component/WebTopBar";
import TopTabBar from "../component/TopTabBar";
import SwitchRoute from "../component/SwitchRoute";
import { bottom_nav_height } from "../component/BottomNavBar";
import FloatAds from "./component/FloatAds";
import StickyShareButton from "../component/StickyShareButton";

import capsuleImg from "./capsule.svg";
import first_charge_img from "./first_charge.svg";
import closeIcon from "../../assets/public/close.png";
import bh5Icon from "../../assets/logo/bh5.jpg";
import useMediaSetting from "../../reackHook/useMediaSetting";

import { capsuleUrl, colors, downloadPage } from "../../constants";
import DraggableComponent from "./component/DraggableComponent";
import FirstRecharge from "../component/FirstRechargeCover";
import WavaButton from "../component/WavaButton";

// const number = 6 * 60 * 60;
const store = window.sessionStorage.getItem("downloadAppTipShowed");

const MobileBottomDownloadAppTip = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    var ua = navigator.userAgent;
    var android = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; // android
    if (android == true && store !== "true") {
      setShow(true);
    }
  }, []);
  function handleClose() {
    window.sessionStorage.setItem("downloadAppTipShowed", true);
    setShow(false);
  }
  function handleOpen() {
    window.open(downloadPage[0]);
  }

  return (
    <MobileBottomDownloadAppTipElement show={show}>
      <div className="download_bg" />
      <div className="download_container">
        <img
          src={closeIcon}
          alt="BH5 close"
          className="download_container_close"
          onClick={handleClose}
        />
        <img src={bh5Icon} alt="BH5 Logo" className="download_container_logo" />
        <div className="download_text">
          <div className="download_text_top">前往”B次元”APP</div>
          <div className="download_text_bottom">即刻顺畅观看最新动漫！</div>
        </div>
        <div onClick={handleOpen}>
          <WavaButton className="download_button">下載APP</WavaButton>
        </div>
      </div>
    </MobileBottomDownloadAppTipElement>
  );
};
const MobileBottomDownloadAppTipElement = styled.div`
  /*  */
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 999;
  height: ${bottom_nav_height + 20}px;
  display: ${({ show }) => (show ? "auto" : "none")};
  .download {
    &_bg {
      top: 0;
      bottom: 0;
      right: -1px;
      left: 0;
      background-color: #010001;
      position: absolute;
      opacity: 0.8;
    }

    &_container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      white-space: nowrap;
      height: 100%;
      gap: 0.5vw;
      @media (min-width: 599px) {
        justify-content: center;
      }
      &_close {
        width: 25px;
      }
      &_logo {
        border-radius: 10px;
        width: 60px;
      }
    }

    &_text {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &_top {
        color: #f24c7c;
        opacity: 0.9;
        font-weight: 600;
      }
      &_bottom {
        color: #a8a8a8;
      }
    }
    &_button {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      color: #fff;
      background-color: ${colors.back_dark_pink};
      border-radius: 50px;
      padding: 0.6em 1em;
    }
  }
`;

const HomeMainSwitchPage = ({
  clickSearch = (e) => e.stopPropagation(),
  clickAvatar,
  clickNew,
  clickHome,
  clickTabLabel,
  newNotice,
  routes,
  user,
  config,
  homeFloatAdsState,
  closeHomeFloatAds,
  highlightRechargeState,
  toPaymentPage,
}) => {
  const intl = useIntl();
  const containerRef = useRef(null);
  const shareThisRef = useRef(null);
  const firstChargeRef = createRef(null);
  const [slide_height, setSlide_height] = useState(0);

  // let storeTime = Number(window.localStorage.getItem("firstChargeTime"));
  // const [reciprocal, setReciprocal] = useState(storeTime);

  const { isMobile } = useMediaSetting();

  // const times = {
  //   hour: `${0}${~~(reciprocal / 60 / 60)}`,
  //   min: `${(reciprocal / 60) % 60 <= 10 ? 0 : ""}${~~(
  //     (reciprocal / 60) %
  //     60
  //   )}`,
  //   sec: `${~~(reciprocal % 60) <= 9 ? 0 : ""}${~~(reciprocal % 60)}`,
  // };
  // const { hour, min, sec } = times;

  // useEffect(() => {
  //   if (storeTime == null || storeTime <= 0) {
  //     window.localStorage.setItem("firstChargeTime", number);
  //   }
  //   const time = setInterval(() => {
  //     setReciprocal((prev) => {
  //       if (prev > 0) {
  //         window.localStorage.setItem("firstChargeTime", prev - 1);
  //         return prev - 1;
  //       } else {
  //         window.localStorage.setItem("firstChargeTime", number);
  //         return number;
  //       }
  //     });
  //   }, 1000);
  //   return () => time;
  // }, []);

  let labelList = {
    anime: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.ANIMATE_COMIC" }),
    },
    videos: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.VIDEO" }),
    },
    photos: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.MEITU" }),
    },
    novels: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.NOVEL" }),
    },
    // streams: {
    //   name: intl.formatMessage({ id: "TOP.NAVIGATOR.STREAM" }),
    // },
    // doujin 韓漫
    "k-comics": {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.KCOMICS" }),
    },
    // doujin 同人
    doujin: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.DOUJIN" }),
    },
    "3D": {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.3D" }),
    },
    ranking: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.RANKING" }),
    },
    free: {
      name: intl.formatMessage({ id: "TOP.NAVIGATOR.FREE_WATCH" }),
    },
  };
  labelList = isMobile
    ? {
        ...labelList,
        comic: {
          name: intl.formatMessage({ id: "GLOBAL.COMICS" }),
        },
        animes: {
          name: intl.formatMessage({ id: "GLOBAL.ANIMATE" }),
        },
        games: {
          name: intl.formatMessage({ id: "GAME.LABEL.GAME" }),
        },
      }
    : labelList;

  function sliderMove(el) {
    setSlide_height(el.el.offsetHeight);
  }

  useEffect(() => {
    //h5控制 shareThis位於底部nav上方位置
    function scrollEvent() {
      if (isMobile) {
        const shareRef = shareThisRef.current;
        if (shareRef) {
          const shareButtonRef = shareRef.buttons.current;
          shareButtonRef.style.display = "none";
          if (
            window.scrollY >
            document.body.clientHeight - window.innerHeight - bottom_nav_height
          ) {
            shareButtonRef.style.display = "flex";
            shareButtonRef.style.bottom = `${bottom_nav_height}px`;
            shareButtonRef.style.zIndex = 10;
          } else {
            shareButtonRef.style.display = "none";
          }
        }
      }
      return;
    }
    scrollEvent();
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [isMobile]);

  return (
    <HomeMainSwitchPageElement isMobile={isMobile} slide_height={slide_height}>
      <TopBarContainer>
        {isMobile ? (
          <TopBar
            isPlaceholder={true}
            newNotice={newNotice}
            clickSearch={clickSearch}
            clickHome={clickHome}
            clickAvatar={clickAvatar}
            clickNew={clickNew}
            shareMa={user.share_ma}
            avatar={user.avatar}
            userId={user.id}
            highlightRechargeState={highlightRechargeState}
            toPaymentPage={toPaymentPage}
          />
        ) : (
          <WebTopBar  />
        )}
        <TopTabBar labelList={labelList} callback={clickTabLabel} indexColumn />
      </TopBarContainer>
      <CSSTransition
        timeout={200}
        in={homeFloatAdsState}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_floatAds"
      >
        <FloatAds
          closeHomeFloatAds={() => {
            closeHomeFloatAds();
            setSlide_height(0);
          }}
          callback={sliderMove}
        />
      </CSSTransition>
      {/* PC H5 sharethis  無法熱更新 */}
      <StickyShareButton ref={shareThisRef} />
      <DraggableComponent
        type="capsule"
        slide_height={slide_height}
        key="CSSTransition_floatCapsule"
        position_style={{
          left: "auto",
          bottom: isMobile
            ? slide_height + bottom_nav_height + "px"
            : bottom_nav_height * 3 + "px",
          right: isMobile ? 0 : "85px",
        }}
        direct_route={
          capsuleUrl + "?id=" + user.id + "&free=" + user.free_gashapon
        }
        css_in={~~config.gashapon_status === 1}
      >
        <img
          draggable={false}
          className="capsule_container_link_img"
          src={capsuleImg}
          alt="capsule"
        />
      </DraggableComponent>

      {/* <DraggableComponent
        slide_height={slide_height}
        key="CSSTransition_float"
        css_in={~~user.pay_record === 0}
        position_style={{
          left: isMobile ? 0 : "auto",
          bottom: isMobile
            ? slide_height + bottom_nav_height + "px"
            : bottom_nav_height * 1.5 + "px",
          right: isMobile ? "auto" : "85px",
        }}
        onClick={openFirstCharge}
      >
        <div className="recharge">
          <img
            draggable={false}
            className="capsule_container_link_img cursor"
            src={first_charge_img}
            alt="first_charge_img"
          />
          <div className="recharge_float_time">
            <div className="recharge_float_time_bg" />
            <div className="recharge_float_time_text">
              {hour + ":" + min + ":" + sec}
            </div>
          </div>
        </div>
      </DraggableComponent> */}

      {/* <FirstRecharge ref={firstChargeRef} user={user} times={times} /> */}
      <div ref={containerRef} className="container">
        <SwitchRoute
          containerRef={containerRef}
          routes={routes}
          routesStep={3}
        />
      </div>
      {isMobile && <MobileBottomDownloadAppTip />}
    </HomeMainSwitchPageElement>
  );
};

HomeMainSwitchPage.propTypes = {
  newNotice: PropTypes.number.isRequired,
  routes: PropTypes.array.isRequired,
  clickSearch: PropTypes.func.isRequired,
  clickAvatar: PropTypes.func.isRequired,
  clickNew: PropTypes.func.isRequired,
  clickTabLabel: PropTypes.func.isRequired,
};

export default HomeMainSwitchPage;

const HomeMainSwitchPageElement = styled.div`
  /*  */
  padding-top: ${main_height + sub_height}px;
  @media (max-width: 899px) {
    padding-bottom: ${bottom_nav_height}px;
  }
  .float_category {
    position: fixed;
    overflow: scroll;
    top: ${main_height + sub_height}px;
    right: 0;
    z-index: 10;
    background-color: #fff;
    padding: 10px 0;
    border-radius: 5px;
  }

  .container {
    position: relative;
  }

  .recharge {
    cursor: pointer;
    position: relative;
    &_float_time {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      width: 100%;
      color: #fff;
      padding: 1px 0;
      &_bg {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        background-color: #010001;
        opacity: 0.55;
        z-index: 9;
      }
      &_text {
        z-index: 10;
      }
    }
  }
`;
