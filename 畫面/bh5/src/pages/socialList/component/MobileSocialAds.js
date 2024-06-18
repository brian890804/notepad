import { useEffect } from "react";
import styled from "@emotion/styled/macro";
import { useIntl } from "react-intl";

import { colors, officialContact, pageUrlConstants, socialForm } from "../../../constants";
import privacy from "../../../assets/social/privacy.svg";
import safe from "../../../assets/social/safe.svg";
import badge from "../../../assets/social/badge.svg";
import WavaButton from "../../component/WavaButton";
import { CSSTransition } from "react-transition-group";
import { main_height } from "../../component/TopBarContainer";
import { bottom_nav_height } from "../../component/BottomNavBar";
import {
  dismissPreventPageScroll,
  preventPageScroll,
} from "../../../reducers/actions/utilities";
import { useDispatch } from "react-redux";
import { pushRoutes } from "../../../reducers/actions/historyActions";

const { login } = pageUrlConstants;

const MobileSocialAds = ({ showStationed, setShowStationed, token }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const introduce = [
    {
      text: intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.PRIVACY" }),
      icon: privacy,
    },
    {
      text: intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.SAFE" }),
      icon: safe,
    },
    {
      text: intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.BADGE" }),
      icon: badge,
    },
  ];
  function onUrlClick(type) {
    // setShowStationed(true);
    switch (type) {
      case "social-form":
        return window.open(socialForm + "?id=" + token);
      case "service":
        return window.open(officialContact);
      case "login":
        return dispatch(pushRoutes(login.pages.loginMain));
      default:
        break;
    }
  }
  function closeAds() {
    setShowStationed(false);
    window.localStorage.setItem("MobileSocialAds", Date.now());
  }
  useEffect(() => {
    if (showStationed) {
      preventPageScroll();
    } else {
      dismissPreventPageScroll();
    }
    return () => {
      dismissPreventPageScroll();
    };
  }, [showStationed]); // 關閉手機滑動 事件
  return (
    <CSSTransition
      timeout={200}
      in={showStationed}
      classNames="CSSTransition_opacity"
      unmountOnExit
      key="CSSTransition_OutOfQuotaPortal"
    >
      <MobileSocialAdsElement onClick={(e) => e.stopPropagation()}>
        <div className="mobile_social_bg" />
        <div className="mobile_social_top_container pt-2">
          <div className="mobile_social_title">
            {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.TITLE" })}
          </div>
          <div className="mobile_social_description">
            {intl.formatMessage({
              id: "SOCIAL.LIST.INFO.LABEL.ADS.DESCRIPTION",
            })}
          </div>

          <div onClick={closeAds}>
            <WavaButton className="mobile_social_introduce_button">
              {intl.formatMessage({
                id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.MAKE_FRIENDS",
              })}
            </WavaButton>
          </div>
          <div className="mobile_social_introduce">
            {introduce.map((item) => (
              <div className="mobile_social_introduce_item">
                <div className="mobile_social_introduce_item_icon">
                  <img src={item.icon} alt={item.text} />
                </div>
                <div className="mobile_social_introduce_item_text">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mobile_social_join pt-2">
          <div className="mobile_social_join_left">
            <div className="mobile_social_join_left_description1">
              {intl.formatMessage({
                id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.CONTINUE",
              })}
            </div>
            <div className="mobile_social_join_left_description2">
              {intl.formatMessage({
                id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.DESCRIPTION_1",
              })}
            </div>
          </div>
          <div className="mobile_social_join_right  pb-2">
            {token !== undefined ? (
              <div onClick={() => onUrlClick("social-form")}>
                <WavaButton className="mobile_social_join_right_button">
                  {intl.formatMessage({
                    id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.HONEY",
                  })}
                </WavaButton>
              </div>
            ) : (
              <div onClick={() => onUrlClick("login")}>
                <WavaButton className="mobile_social_join_right_button">
                  {intl.formatMessage({
                    id: "LOGIN.LABEL.GO_LOGIN",
                  })}
                </WavaButton>
              </div>
            )}
            <div
              className="mobile_social_join_right_join_us"
              onClick={() => onUrlClick("service")}
            >
              {intl.formatMessage({ id: "SOCIAL.LIST.INFO.LABEL.ADS.JOIN.US" })}
            </div>
          </div>
        </div>
      </MobileSocialAdsElement>
    </CSSTransition>
  );
};

export default MobileSocialAds;
const MobileSocialAdsElement = styled.div`
  /*  */
  position: fixed;
  right: 0;
  top: ${main_height}px;
  bottom: ${bottom_nav_height}px;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  .mobile_social {
    &_bg {
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      position: absolute;
      background-color: #fff;
      opacity: 0.9;
      z-index: 9;
    }
    &_top_container {
      text-align: center;
      z-index: 10;
    }

    &_title {
      color: ${colors.back_dark_pink};
      font-size: 1.6rem;
      font-weight: 600;
      margin-bottom: 0.2em;
    }

    &_description {
      color: ${colors.text_grey};
      font-size: 1rem;
      font-weight: 600;
    }

    &_introduce {
      display: flex;
      justify-content: center;

      &_item {
        padding: 0.5em 2em;
        &_icon {
          display: flex;
          img {
            width: 50px;
            height: 50px;
          }
        }

        &_text {
          color: ${colors.text_grey};
          font-size: 1rem;
        }
      }

      &_button {
        color: ${colors.back_dark_pink};
        background-color: #fff;
        flex-shrink: 0;
        display: inline-block;
        overflow: hidden;
        border: 1px solid ${colors.dark_pink};
        border-radius: 50px;
        margin: 15px;
        padding: 0.5em 4em;
        font-weight: 600;
        font-size: 1.2rem;
      }
    }
    &_join {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-weight: 600;
      z-index: 10;
      &_left {
        text-align: center;
        &_description1 {
          color: ${colors.back_dark_pink};
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        &_description2 {
          color: ${colors.text_grey};
          font-weight: 600;
          font-size: 1rem;
        }
      }

      &_right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1.4rem;
        align-self: center;
        cursor: pointer;
        padding-top: 0.5em;

        &_button {
          flex-shrink: 0;
          display: inline-block;
          overflow: hidden;
          color: #fff;
          margin: 15px;
          padding: 0.5em 4em;
          background-color: ${colors.back_dark_pink};
          border: 1px solid ${colors.dark_pink};
          border-radius: 50px;
          font-size: 1.2rem;
        }

        &_join_us {
          align-self: center;
          color: #39b3fd;
          border-bottom: 1px solid #39b3fd;
        }
      }
    }
  }
`;
