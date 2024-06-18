import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { main_height } from "../../component/TopBarContainer";
import Searchbar from "../../component/Searchbar";
import { colors, downloadPage, padding } from "../../../constants";
import ShareIcon from "@mui/icons-material/GroupAdd";

import service from "../../../assets/topbar/service.svg";
// import ShareIcon from "../../../assets/topbar/share.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageComponent from "../../component/ImageComponent";

import logo_w from "../../../assets/topbar/logo_w.svg";
import avatarPlaceholder from "../../../assets/imgPlaceholder/avatar.png";

import recharge from "../../../assets/home/recharge.svg";
import recharge_highlight from "../../../assets/home/recharge_highlight.svg";
import { navigatorShare } from "../../../reducers/actions/utilities";

const TopBar = ({
  isPlaceholder = false,
  clickSearch = (e) => e.stopPropagation(),
  clickAvatar,
  clickNew,
  newNotice,
  clickHome,
  avatar,
  userId,
  shareMa,
  highlightRechargeState,
  toPaymentPage,
}) => {
  const intl = useIntl();
  function handleShare() {
    navigatorShare({
      title: "",
      text:
        intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_1" }) +
        (shareMa
          ? intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_2" }) + shareMa
          : "") +
        intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_3" }),
      url: downloadPage[1] + "?utm_source=" + shareMa,
    });
  }
  function clickService() {
    window.open("https://bli2pay.com/8jcng");
  }
  return (
    <TopBarElement>
      <div className="search_bar">
        <div className="search_bar_logo ">
          <img src={logo_w} alt="bh5_logo" onClick={clickHome} />
        </div>
        <div className="search_bar_main">
          <Searchbar callback={clickSearch} isPlaceholder={isPlaceholder} />
        </div>
        {/* <div className="search_bar_share" onClick={toPaymentPage}>
          <img
            className={
              "search_bar_recharge_img " +
              (highlightRechargeState ? "" : "active")
            }
            src={highlightRechargeState ? recharge : recharge_highlight}
            alt="B次元分享连结"
          />
        </div> */}
        <div className="search_bar_recharge" onClick={toPaymentPage}>
          <img
            className={
              "search_bar_recharge_img " +
              (highlightRechargeState ? "" : "active")
            }
            src={highlightRechargeState ? recharge : recharge_highlight}
            alt="recharge"
          />
        </div>
        <div className="search_bar_avatar" onClick={clickAvatar}>
          {userId !== "guest" ? (
            <ImageComponent
              is_cover={true}
              src={avatar}
              background_color="transparent"
              border_radius="50%"
              placeholderImg={avatarPlaceholder}
            />
          ) : (
            <div className="search_bar_avatar_login">
              {intl.formatMessage({ id: "LOGIN" })}
            </div>
          )}
        </div>
        {/* <div className="search_bar_service" onClick={clickService}>
          <img
            src={service}
            alt="service"
            className="search_bar_service_icon"
          />
        </div> */}

        {/* <div className="search_bar_share" onClick={handleShare}>
          <ShareIcon className="search_bar_share_icon" />
        </div> */}

        {/* <div className="search_bar_news" onClick={clickNew}>
          <FontAwesomeIcon className="search_bar_news_img" icon={faBell} />
          {newNotice ? (
            <span className="search_bar_news_number">{newNotice}</span>
          ) : (
            ""
          )}
        </div> */}
      </div>
    </TopBarElement>
  );
};

export default TopBar;

export const TopBarElement = styled.div`
  /*  */
  padding: 0 5%;
  height: ${main_height}px;
  background-color: ${colors.dark_pink};

  .search_bar {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    height: 100%;

    &_news,
    &_share,
    &_recharge {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &_avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      width: ${main_height * 0.65}px;
      height: ${main_height * 0.65}px;
      font-size: 14px;
      color: ${colors.dark_pink};
      border-radius: 50%;
      font-weight: 900;
      text-shadow: 0.2px 0.2px ${colors.dark_pink};

      &_login {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #fffa;
      }
    }
    &_logo {
      flex: 30%;
      img {
        width: 90px;
      }
    }
    &_main {
      flex-grow: 1;
      margin: 0 10px;
    }

    &_share_icon {
      color: #fff;
      font-size: 30px;
      padding-bottom: 0.1em;
    }

    &_recharge {
      margin-right: 10px;

      &_img {
        width: 30px;
        height: 30px;

        &.active {
          animation: 1s recharge-move infinite;

          @keyframes recharge-move {
            0% {
              transform: rotate(0) translateX(0) translateY(5px);
            }

            10% {
              transform: rotate(20deg) translateX(5px) translateY(-5px);
            }

            20% {
              transform: rotate(0deg) translateX(0) translateY(5px);
            }

            30% {
              transform: rotate(-20deg) translateX(-5px) translateY(-5px);
            }

            40% {
              transform: rotate(0deg) translateX(0) translateY(5px);
            }

            50% {
              transform: rotate(0deg) translateX(0) translateY(0);
            }
          }
        }
      }
    }

    &_news {
      position: relative;

      &_img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        color: #fff;
      }

      &_number {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 14px;
        height: 14px;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        color: ${colors.dark_pink};
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }
  .search_bar_service_icon {
    width: 40px;
    margin-right: 6px;
  }
`;
