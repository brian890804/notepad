import React, { memo, useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import styled from "@emotion/styled/macro";
import QRCode from "qrcode.react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";

import store from "../../../store";
import { main_height } from "../../component/TopBarContainer";
import Searchbar from "../../component/Searchbar";
import {
  colors,
  downloadPage,
  padding,
  pageUrlConstants,
} from "../../../constants";
import {
  backRoutes,
  pushRoutes,
} from "../../../reducers/actions/historyActions";
import WavaButton from "../../component/WavaButton";
import { setLanguage, useLang } from "../../../i18n/Metronici18n";
import newsIcon from "../../../assets/topbar/news.svg";
import newsDarkIcon from "../../../assets/topbar/news_dark.svg";

import { updateRechargeStateAction } from "../../../reducers/actions/config";

import free from "../../../assets/topbar/free-nor.svg";
import fast from "../../../assets/topbar/fast-nor.svg";
import task from "../../../assets/topbar/task.svg";
import task_dark from "../../../assets/topbar/task_dark.svg";
import service from "../../../assets/topbar/service.svg";
import service_dark from "../../../assets/topbar/service_dark.svg";
import download from "../../../assets/topbar/download.svg";
import download_dark from "../../../assets/topbar/download_dark.svg";
import switch_lang_dark from "../../../assets/topbar/switch_lang_dark.svg";
import recharge_highlight_dark from "../../../assets/topbar/recharge_highlight_dark.svg";
import switch_lang from "../../../assets/topbar/switch_lang.svg";
import switch_lang_en_dark from "../../../assets/topbar/switch_lang_en_dark.svg";
import switch_lang_en from "../../../assets/topbar/switch_lang_en.svg";
import logo_w from "../../../assets/topbar/logo_w.svg";
import logo_p from "../../../assets/topbar/logo_p.svg";
import homeIcon from "../../../assets/topbar/home.svg";
import homeIconSelected from "../../../assets/bottomNav/home_selected_btn.png";
import feedIcon from "../../../assets/topbar/feed.svg";
import feedIconSelected from "../../../assets/bottomNav/feed_selected_btn.png";
import socialIcon from "../../../assets/topbar/social.svg";
import socialIconSelected from "../../../assets/bottomNav/social_selected_btn.png";
import vendorIcon from "../../../assets/topbar/vendor.svg";
import vendorIconSelected from "../../../assets/bottomNav/shop_selected_btn.png";
import coin from "../../../assets/icons/coin.svg";
import crownIcon from "../../../assets/icons/crown.png";
import history from "../../../assets/topbar/history.svg";
import history_dark from "../../../assets/topbar/history_dark.svg";

import ImageComponent from "../../component/ImageComponent";

import avatarPlaceholder from "../../../assets/imgPlaceholder/avatar.png";

import recharge from "../../../assets/home/recharge.svg";
import recharge_highlight from "../../../assets/home/recharge_highlight.svg";
import { dailyLoginAction } from "../../profileMain/ProfileMainAction";
import callToast from "../../../modules/toastCall";
import {
  userFBLoginOutAction,
  userLoginOutAction,
} from "../../../reducers/actions/user";
import { clearVipInfoAction } from "../../profileBuyVipCommon/ProfileBuyVipCommonAction";
import { initPostData } from "../../postsMain/PostMainAction";
import TopTabBar from "../../component/TopTabBar";
import { postSearchWatchHistoryAction } from "../../profileWatchHistory/ProfileWatchHistory";
import ProfileWatchHistoryAnimeHandle from "../../profileWatchHistory/profileWatchHistoryAnime/ProfileWatchHistoryAnimeHandle";
import ParallelCoverCubeItem from "../../component/ParallelCoverCubeItem";
import ProfileWatchHistoryComicHandle from "../../profileWatchHistory/profileWatchHistoryComic/ProfileWatchHistoryComicHandle";

const { home, post, social, vendor, profile, notice, login } = pageUrlConstants;
const areEqual = (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
};
let timer;
let touchduration = 500;

const QrCode = ({ scroll }) => {
  const intl = useIntl();
  function qrcodeStart(e) {
    timer = setTimeout(qrcodeLong, touchduration);
  }
  function qrcodeEnd(e) {
    if (timer) {
      clearTimeout(timer);
    }
  }

  function qrcodeLong() {
    let link = document.createElement("a");
    link.href = downloadPage[1];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }
  return (
    <QrCodeElement scroll={scroll}>
      <div className="qrcode">
        <img
          className={"search_bar_nav_item_btn_img"}
          src={scroll ? download_dark : download}
          alt={"download"}
        />
        {intl.formatMessage({ id: "GLOBAL.ACTION.DOWNLOAD.APP" })}
        <div className="qrcode_float">
          <div className="qrcode_float_left">
            <div className="qrcode_float_left_top">
              {intl.formatMessage({
                id: "GLOBAL.ACTION.DOWNLOAD.APP_DESCRIPTION",
              })}
            </div>
            <div className="qrcode_float_left_bottom">
              {intl.formatMessage({
                id: "GLOBAL.ACTION.DOWNLOAD.APP_DESCRIPTION_1",
              })}
            </div>
          </div>

          <QRCode
            className="qrcode_img"
            value={downloadPage[1]}
            onTouchStart={qrcodeStart}
            onTouchEnd={qrcodeEnd}
          />
        </div>
      </div>
    </QrCodeElement>
  );
};
const QrCodeElement = styled.div`
  /*  */
  display: flex;
  align-items: center;
  .qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    white-space: nowrap;
    font-size: 12px;
    border-radius: 4px;
    border: solid 2px ${({ scroll }) => (scroll ? colors.text_grey : "#fff")};
    padding: 5px;
    color: ${({ scroll }) => (scroll ? colors.text_grey : "#fff")};

    &_img {
      width: 70px !important;
      height: 70px !important;
    }

    &_float {
      display: none;

      &_left {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        &_top {
          font-weight: 600;
          color: ${colors.back_dark_pink};
          margin-bottom: 5px;
        }
        &_bottom {
          color: #d5d5d5;
        }
      }
    }
    li {
      margin: 5px;
    }
    &:hover {
      .qrcode_float {
        padding: 5px;
        gap: 10px;
        color: ${colors.text_grey};
        background-color: #fff;
        text-align: center;
        position: absolute;
        display: flex;
        top: 40px;
        right: 0;
        z-index: 999;
        border-radius: 5px;
        box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
        z-index: 1;
      }
    }
  }
`;

const LanguageList = [
  { name: "簡體中文", lang: "zh" },
  { name: "English", lang: "en" },
];

const TopSearchBar = ({
  isPlaceholder,
  clickSearch = (e) => e.stopPropagation(),
  clickAvatar,
  clickService,
  clickNew,
  newNotice,
  location,
  avatar,
  user,
  userId,
  highlightRechargeState,
  toPaymentPage,
  clickItem,
  dailyEvent,
  clickLogin,
  config,
  clearUserData,
  clickCollect,
  clickSetting,
  clickVip,
  postSearchWatchHistoryEvent,
  videoDataList,
  comicDataList,
}) => {
  const intl = useIntl();
  const lang = useLang();
  const ContainerRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [questInfoList, setQuestInfoList] = useState([]);
  const [membershipDate, setMembershipDate] = useState("");
  const [tabValue, setTabValue] = React.useState(1);

  const [navList] = useState(() => [
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.INDEX" }),
      name: home.pages.homeMain.name,
      path: home.pages.homeMain.path,
      image: homeIcon,
      activeImage: homeIconSelected,
    },
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.DYNAMIC" }),
      name: post.pages.postMain.name,
      path: post.pages.postMain.path,
      image: feedIcon,
      activeImage: feedIconSelected,
    },
    // {
    //   cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.AND_CHILL" }),
    //   name: social.name,
    //   path: social.path,
    //   image: socialIcon,
    //   activeImage: socialIconSelected,
    // },
    {
      cname: intl.formatMessage({ id: "BOTTOM.NAVIGATOR.MALL" }),
      name: vendor.name,
      path: vendor.path,
      image: vendorIcon,
      activeImage: vendorIconSelected,
    },
  ]);

  useEffect(() => {
    const onScroll = () => {
      let { scrollY } = window;
      setScroll(Boolean(scrollY));
      let TargetStyle = ContainerRef?.current?.style; //不加問號目前好像動作太快會故障
      if (TargetStyle) {
        TargetStyle.transition = "0.2s";
        if (scrollY) {
          TargetStyle.backgroundColor = "#fff";
          TargetStyle.borderBottom = "0.5px grey dotted";
        } else {
          TargetStyle.backgroundColor = colors.dark_pink;
          TargetStyle.borderBottom = "none";
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let daily = [
      {
        icon: coin,
        title: intl.formatMessage({ id: "PROFILE.PERMISSION.SIGNIN.EVERYDAY" }),
        content:
          config.signinbegin +
          "-" +
          config.signinend +
          intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" }),
        description: intl.formatMessage({
          id: "PROFILE.PERMISSION.SIGNIN.CLICK.AWARD",
        }),
        button: intl.formatMessage({
          id: user.id === "guest" ? "LOGIN" : "PROFILE.PERMISSION.SIGNIN.NOW",
        }),
        buttonEvent: user.id === "guest" ? toLoginPage : dailyEvent,
      },
      {
        title: intl.formatMessage({ id: "PROFILE.PERMISSION.INVITE.FRIEND" }),
        content:
          intl.formatMessage({
            id: "TOP.NAVIGATOR.FLOAT.INVITE.DESCRIPTION1",
          }) +
          " :" +
          (user.id === "guest" ? "------" : user.share_ma),
        description: intl.formatMessage({
          id: "TOP.NAVIGATOR.FLOAT.INVITE.DESCRIPTION",
        }),
        button: intl.formatMessage({
          id: user.id === "guest" ? "LOGIN" : "TOP.NAVIGATOR.FLOAT.INVITE",
        }),
        buttonEvent: user.id === "guest" ? toLoginPage : saveUrl,
      },
    ];
    setQuestInfoList(daily);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, user]);

  useEffect(() => {
    const variable =
      user.time === "-1"
        ? intl.formatMessage({ id: "PROFILE.BUY.WATCH.FOREVER_1" })
        : Date.now() > user.time * 1000
        ? intl.formatMessage({ id: "PROFILE.MAIN.VIP.MATURITY" })
        : new Date(user.time * 1000).toLocaleDateString().toString();
    setMembershipDate(variable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.time]);
  useEffect(() => {
    postSearchWatchHistoryEvent(tabValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  const judgeSwitchLangImg = scroll
    ? lang === "zh"
      ? switch_lang_dark
      : switch_lang_en_dark
    : lang === "zh"
    ? switch_lang
    : switch_lang_en;

  async function saveUrl() {
    // navigatorShare({
    //   title: "",
    //   text:
    //     intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_1" }) +
    //     (user.share_ma
    //       ? intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_2" }) +
    //         user.share_ma
    //       : "") +
    //     intl.formatMessage({ id: "PROFILE.SHARE.DESCRIPTION_3" }),
    //   url: downloadPage[1] + "?utm_source=" + user.share_ma,
    // });
    navigator.clipboard
      .writeText(downloadPage[1] + "?utm_source=" + user.share_ma)
      .then(() => {
        callToast("复制成功");
      })
      .catch((err) => {
        callToast("复制失敗");
      });
  }

  function toLoginPage() {
    clickLogin();
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <TopsearchBarElement ref={ContainerRef} scroll={scroll}>
      <div className="search_bar">
        <div className="search_bar_item">
          <img
            src={scroll ? logo_p : logo_w}
            alt="B次元 LOGO"
            className="logo cursor"
            onClick={() => clickItem(navList[0])}
          />
          {navList.map((navItem) => (
            <div
              className="search_bar_nav cursor"
              key={navItem.name}
              style={{
                animation: scroll ? "1s recharge-move 2" : "",
              }}
              onClick={(e) => {
                clickItem(navItem);
              }}
            >
              <WavaButton
                className={
                  "search_bar_nav_item_btn " +
                  (location.indexOf(navItem.path) !== -1 ? "active" : "")
                }
              >
                <div className="search_bar_nav_item_cover" />
                <img
                  className={"search_bar_nav_item_btn_img"}
                  src={scroll ? navItem.activeImage : navItem.image}
                  alt={navItem.name}
                />
                <div className="search_bar_nav_item_btn_title_text">
                  {navItem.cname}
                </div>
              </WavaButton>
            </div>
          ))}
        </div>
        <div className="search_bar_item" />
        <div className="search_bar_main cursor">
          <Searchbar
            callback={clickSearch}
            isPlaceholder={isPlaceholder}
            scroll={scroll}
          />
        </div>
        <div className="search_bar_item">
          <div className="search_bar_recharge">
            <img
              className={
                "search_bar_recharge_img " +
                (highlightRechargeState ? "" : "active")
              }
              onClick={toPaymentPage}
              src={
                !highlightRechargeState
                  ? recharge_highlight
                  : scroll
                  ? recharge_highlight_dark
                  : recharge
              }
              alt="recharge"
            />
            <div className="search_bar_recharge_float">
              <div>
                {intl.formatMessage({
                  id: "TOP.BAR.RECHARGE.DESCRIPTION",
                })}
              </div>
              <div className="search_bar_recharge_float_description">
                <span>
                  <img src={free} alt="free" />
                  {intl.formatMessage({
                    id: "TOP.BAR.RECHARGE.DESCRIPTION_1",
                  })}
                </span>
                <span>
                  <img src={fast} alt="fast" />
                  {intl.formatMessage({
                    id: "TOP.BAR.RECHARGE.DESCRIPTION_2",
                  })}
                </span>
              </div>
              <div
                className={"search_bar_recharge_button"}
                onClick={toPaymentPage}
              >
                <WavaButton>
                  {intl.formatMessage({
                    id:
                      userId === "guest"
                        ? "TOP.BAR.RECHARGE.BUTTON_NOTLOGIN"
                        : "TOP.BAR.RECHARGE.BUTTON",
                  })}
                </WavaButton>
              </div>
              <div
                className={"search_bar_recharge_button_light"}
                onClick={clickVip}
              >
                <WavaButton>
                  {intl.formatMessage({
                    id: "TOP.BAR.RECHARGE.BUTTON_1",
                  })}
                </WavaButton>
              </div>
            </div>
          </div>

          <div className="search_bar_history">
            <img
              src={scroll ? history_dark : history}
              alt="service"
              className="search_bar_history_img"
            />
            <div className="search_bar_history_cover">
              <TabContext value={tabValue}>
                <Box className="search_bar_history_tab_container">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="H漫" value={1} />
                    <Tab label="番剧" value={0} />
                  </TabList>
                </Box>
                <TabPanel value={1}>
                  <ProfileWatchHistoryComicHandle disabledScrollRefresh />
                </TabPanel>
                <TabPanel value={0}>
                  <ProfileWatchHistoryAnimeHandle disabledScrollRefresh />
                </TabPanel>
              </TabContext>
            </div>
          </div>

          <div className="search_bar_switch">
            <img
              src={judgeSwitchLangImg}
              alt="switch"
              className="search_bar_switch_img"
            />
            <div className="search_bar_switch_cover">
              <div className="search_bar_switch_cover_content">
                {LanguageList.map((list) => (
                  <div
                    key={list.name}
                    className="cursor"
                    onClick={() => setLanguage(list.lang)}
                  >
                    {list.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="search_bar_task ">
            <img
              src={scroll ? task_dark : task}
              alt="task"
              className="search_bar_float_img"
            />

            <div className={`search_bar_float`}>
              {questInfoList?.map((daliy, index) => (
                <React.Fragment key={index}>
                  <ol>
                    <li className="search_bar_float_title">{daliy.title}</li>
                    <li>{daliy.description}</li>
                    <li
                      className={`search_bar_float_content ${!index && "gold"}`}
                    >
                      {!index && (
                        <img
                          src={daliy.icon}
                          alt="coin"
                          className="search_bar_float_img"
                        />
                      )}

                      {daliy.content}
                    </li>
                    <li>
                      <div
                        className="search_bar_float_button"
                        onClick={daliy.buttonEvent}
                      >
                        {daliy.button}
                      </div>
                    </li>
                  </ol>
                  <ol style={{ display: index && "none" }}>
                    <div className="divider" />
                  </ol>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="search_bar_service" onClick={clickService}>
            <img
              src={scroll ? service_dark : service}
              alt="service"
              className="search_bar_service_img"
            />
          </div>

          <div className="search_bar_news" onClick={clickNew}>
            <img
              src={scroll ? newsDarkIcon : newsIcon}
              alt="news"
              className="search_bar_news_img"
            />
            {newNotice ? (
              <span className="search_bar_news_number">{newNotice}</span>
            ) : (
              ""
            )}
          </div>
          <div className="search_bar_avatar_container">
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
            <div className="search_bar_avatar_cover">
              {userId === "guest" ? (
                <>
                  <div className="search_bar_avatar_cover_user_info vertical">
                    <div>
                      {intl.formatMessage({
                        id: "LOGIN.HAVE_GOOD_EXPERIENCES",
                      })}
                    </div>
                  </div>
                  <div onClick={clickAvatar}>
                    <WavaButton className="search_bar_avatar_button_login">
                      {intl.formatMessage({ id: "LOGIN.NOW" })}
                    </WavaButton>
                  </div>
                </>
              ) : (
                <>
                  <div className="search_bar_avatar_cover_user_info">
                    <div className="search_bar_avatar_cover_user_info_avatar">
                      <ImageComponent
                        is_cover={true}
                        src={avatar}
                        background_color="transparent"
                        border_radius="50%"
                        placeholderImg={avatarPlaceholder}
                      />
                    </div>
                    <div className="search_bar_avatar_cover_user_info_item">
                      <div className="search_bar_avatar_cover_user_info_item_name">
                        {user.nick_name}
                      </div>
                      <div className="search_bar_avatar_cover_user_info_item_description g-center gap-1">
                        {user.time === "-1" || Date.now() < user.time * 1000 ? (
                          <img
                            className="search_bar_avatar_cover_user_info_crown"
                            src={crownIcon}
                            alt="crown"
                          />
                        ) : (
                          ""
                        )}
                        {membershipDate}
                      </div>
                    </div>
                    <div
                      className="search_bar_avatar_cover_user_info_setting cursor"
                      onClick={clickSetting}
                    >
                      {intl.formatMessage({
                        id: "PERSONAL.SETTING",
                      })}
                      >
                    </div>
                  </div>
                  <div onClick={clickCollect}>
                    <WavaButton className="search_bar_avatar_button_t ">
                      {intl.formatMessage({
                        id: "SEARCH.COLLECT.RECENT",
                      })}
                    </WavaButton>
                  </div>
                  <div onClick={clearUserData}>
                    <WavaButton className="search_bar_avatar_button_b">
                      {intl.formatMessage({
                        id: "LOGOUT",
                      })}
                    </WavaButton>
                  </div>
                </>
              )}
              {/* </div> */}
            </div>
          </div>
          <QrCode scroll={scroll} />
        </div>
      </div>
    </TopsearchBarElement>
  );
};

const TopSearchBarStateToProps = (state, ownProps) => {
  let newNotice = 0;
  let noticeList = state.noticeList || [];
  let noticeListRead = state.noticeListRead || [];
  for (let i = 0; i < noticeList.length; i++) {
    if (noticeListRead.indexOf(noticeList[i].id) === -1) {
      newNotice++;
    }
  }

  return {
    config: state.config,
    user: state.user,
    isPlaceholder: true,
    location: state.router.location.pathname || "",
    newNotice: newNotice,
    avatar: state.user.avatar,
    userId: state.user.id,
    highlightRechargeState: state.config.highlightRechargeState,
    videoDataList: state.myWatchHistory["anime_video_list"] || [],
    comicDataList: state.myWatchHistory["anime_comic_list"] || [],
  };
};

const TopSearchBarDispatchToProps = (dispatch) => {
  const intl = useIntl();
  return {
    clickItem: (routes) => {
      dispatch(pushRoutes(routes));
    },
    clearUserData: () => {
      dispatch(userLoginOutAction());
      dispatch(clearVipInfoAction());
      dispatch(backRoutes());
      dispatch(userFBLoginOutAction());
      dispatch(initPostData());
    },
    clickSearch: () => {
      dispatch(pushRoutes(home.pages.homeSearch));
    },
    clickService: () => {
      window.open("https://bli2pay.com/8jcng");
    },
    toPaymentPage: () => {
      dispatch(updateRechargeStateAction(true));
      dispatch(pushRoutes(profile.pages.profilePayment));
    },
    clickNew: () => {
      dispatch(pushRoutes(notice));
    },
    clickAvatar: () => {
      const userData = store.getState().user;
      if (userData.id !== "guest") {
        dispatch(pushRoutes(profile.pages.profileMain));
      } else {
        dispatch(pushRoutes(login));
      }
    },
    clickLogin: () => {
      dispatch(pushRoutes(login));
    },
    clickCollect: () => {
      dispatch(
        pushRoutes(profile.pages.profileMyCollect.pages.profileMyCollectComic)
      );
    },
    clickSetting: () => {
      dispatch(pushRoutes(profile.pages.profileEdit.pages.profileEditInfo));
    },
    clickVip: () => {
      dispatch(
        pushRoutes(profile.pages.profileBuyVip.pages.profileBuyVipCommon)
      );
    },
    dailyEvent: () => {
      dispatch(dailyLoginAction(intl));
    },
    postSearchWatchHistoryEvent: (type) => {
      dispatch(postSearchWatchHistoryAction(type));
    },
  };
};

export default connect(
  TopSearchBarStateToProps,
  TopSearchBarDispatchToProps
)(memo(TopSearchBar, areEqual));

export const TopsearchBarElement = styled.div`
  /*  */
  padding-right: ${padding}px;
  padding-left: ${padding}px;
  height: ${main_height}px;
  background-color: ${colors.dark_pink};

  .logo {
    width: 110px;
    margin-right: 15px;
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  .search_bar_task {
    display: flex;
    align-items: center;
    position: relative;
    white-space: nowrap;
    font-size: 14px;
    color: ${({ scroll }) => (scroll ? colors.text_grey : "#fff")};
    &_float {
      position: absolute;
      z-index: 999;
      visibility: hidden;
    }
    li {
      margin: 5px;
    }
    &:hover {
      .search_bar_float_img {
        animation: navbar-jump 1.5s;
      }
      .qrcode_float {
        color: ${colors.text_grey};
        background-color: #fff;
        padding: 5px;
        text-align: center;
        display: flex;
        top: 50px;
        border-radius: 5px;
        box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
        z-index: 1;
      }
    }
  }

  .search_bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    &_main {
      display: flex;
      justify-content: end;
    }
    &_item {
      display: flex;
    }

    &_nav {
      white-space: nowrap;
      margin-right: 0.5em;

      &_item {
        position: relative;
        cursor: pointer;
        user-select: none;
        &_cover {
          display: none;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: #fff;
          opacity: 20%;
          border-radius: 5px;
        }

        &_btn {
          display: flex;
          padding: 4px 8px;
          &:hover {
            animation: navbar-jump infinite 1.5s;
          }
          &_img {
            width: 22px;
            height: 22px;
            margin-right: 2px;
            vertical-align: middle;
            transition: 0.3s;
          }
          &_title {
            &_text {
              align-self: center;
              font-size: 14px;
              color: #fff;
              font-weight: 600;
              color: ${({ scroll }) => (scroll ? colors.text_grey : "#fff")};
            }
          }

          &.active {
            cursor: default;
            transform: translateY(-3px) scale(1.05);
            transform-origin: bottom center;
            font-size: 16px;
            color: ${colors.text_grey};
            text-shadow: 0.09px 0px ${colors.text_grey};

            .search_bar_nav_item_cover {
              display: block;
            }
          }
        }
      }
    }

    &_avatar,
    &_main,
    &_news,
    &_service,
    &_switch,
    &_history,
    &_recharge {
      margin-right: 10px;
    }
    &_avatar {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-self: center;
      margin-left: 10px;
      width: ${main_height * 0.55}px;
      height: ${main_height * 0.55}px;
      font-size: 14px;
      color: ${colors.dark_pink};
      font-weight: 900;
      text-shadow: 0.2px 0.2px ${colors.dark_pink};
      align-self: center;
      &_login {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: #fffa;
      }

      &_cover {
        position: absolute;
        z-index: 999;
        visibility: hidden;
        min-width: 250px;
        &_user_info {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 15px;
          white-space: nowrap;
          color: black;
          font-weight: 500;
          margin-bottom: 5px;
          font-size: 13px;
          &.vertical {
            flex-direction: column;
          }

          &_item {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-weight: 600;
          }

          &_setting {
            color: ${colors.text_grey};
          }
        }
      }

      &_container {
        position: relative;
        align-self: center;

        &:hover {
          .search_bar_avatar_login,
          img {
            animation: navbar-jump 1.5s;
          }
          .search_bar_avatar_cover {
            background-color: #fff;
            padding: 20px 25px;
            text-align: center;
            visibility: visible;
            display: flex;
            flex-direction: column;
            top: 40px;
            right: 0;
            gap: 10px;
            border-radius: 5px;
            box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
            &_user_info {
              &_crown {
                width: 20px;
                margin-right: 5px;
              }
              &_avatar {
                width: 42px;
                height: 42px;
              }
            }
          }

          .search_bar_avatar {
            &_button {
              &_login,
              &_t,
              &_b {
                cursor: pointer;
                word-break: keep-all;
                font-size: 12px;
                padding: 5px 10px;
                border-radius: 100px;
              }
              &_login {
                background: ${colors.back_dark_pink};
                color: #fff;
                border: solid 1px ${colors.dark_pink};
              }
              &_t {
                color: ${colors.dark_pink};
                border: solid 1px ${colors.dark_pink};
              }
              &_b {
                color: ${colors.text_light_grey};
                border: solid 1px #f3f4f5;
                background: #f3f4f5;
                border: solid 1px #f3f4f5;
              }
            }
          }
        }
      }
    }

    &_main {
      flex-grow: 0.5;
      white-space: nowrap;
    }

    &_switch {
      align-self: center;
      position: relative;

      &_cover {
        position: absolute;
        display: none;
        z-index: 999;
      }

      &:hover {
        .search_bar_switch_img {
          animation: navbar-jump 1.5s;
        }
        .search_bar_switch_cover {
          left: -10px;
          display: block;
          position: absolute;
          &_content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 10px 0;
            gap: 5px;
            top: 40px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
            white-space: nowrap;
            &:hover {
              .search_bar_switch_cover {
                display: block;
              }
            }
            > div {
              margin: 5px;
              width: 100%;
              font-size: 14px;
              &:hover {
                background-color: #f3f4f5;
              }
            }
          }
        }
      }
      &_img {
        width: 35px;
        height: 35px;
      }
    }

    &_history {
      position: relative;
      align-self: center;
      &_img {
        cursor: pointer;
        width: 35px;
      }
      &_cover {
        z-index: 999;
        display: none;
        cursor: default;
      }
      &:hover {
        .search_bar_history {
          &_img {
            animation: navbar-jump 1.5s;
          }
          &_cover {
            background-color: #fff;
            padding: 15px;
            font-size: 12px;
            text-align: center;
            position: absolute;
            gap: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            top: 40px;
            right: -20em;
            width: 25em;
            border-radius: 5px;
            box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
          }
          &_tab_container {
            border-bottom: 1;
            border-color: divider;
            width: 100%;
          }
        }
        .MuiTabPanel-root  {
          padding: 0px !important;
        }
        .MuiTab-root {
          color: #000000;
          width: 50%;
        }

        .Mui-selected {
          color: ${colors.back_dark_pink};
        }

        .MuiTabs-indicator {
          background: ${colors.back_dark_pink};
        }
      }
    }

    &_service {
      cursor: pointer;
      &:hover {
        animation: navbar-jump infinite 1.5s;
      }
    }

    &_float,
    &_recharge {
      align-self: center;
      margin-right: 10px;
      position: relative;
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

    &_recharge {
      &_float {
        z-index: 999;
        display: none;
        cursor: default;
        &_description {
          display: flex;
          gap: 15px;
          > span {
            gap: 5px;
            display: flex;
            align-items: center;
            > img {
              width: 25px;
              height: 25px;
            }
          }
        }
      }

      &:hover {
        .search_bar_recharge_float {
          background-color: #fff;
          padding: 15px 35px;
          font-size: 12px;
          text-align: center;
          position: absolute;
          gap: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          white-space: nowrap;
          top: 40px;
          left: -370%;
          border-radius: 5px;
          box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
        }
      }
      &_button,
      &_button_light {
        cursor: pointer;
        padding: 10px 0;
        margin: auto;
        margin-top: 5px;
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: #fff;
        background-color: ${colors.dark_pink};
        border-radius: 30px;
      }
      &_button_light {
        background-color: #fff;
        color: ${colors.dark_pink};
        border-radius: 21px;
        border: solid 1px ${colors.dark_pink};
      }
    }

    &_task {
      // margin: 0px 6px;
      &:hover {
        .search_bar_float {
          z-index: 999;
          visibility: visible;
        }
      }
    }
    &_news {
      position: relative;
      margin-right: 10px;
      align-self: center;
      cursor: pointer;
      &:hover {
        animation: navbar-jump infinite 1.5s;
      }
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
        padding: 1%;
        color: ${({ scroll }) => (scroll ? "#fff" : colors.dark_pink)};
        background-color: ${({ scroll }) => (scroll ? "red" : "#fff")};
        border-radius: 50%;
      }
    }
    &_float {
      z-index: 999;
      position: absolute;
      visibility: hidden;
      display: flex;
      top: 30px;
      right: -230px;
      cursor: default;

      &_title {
        color: black;
        font-weight: 700;
      }

      .gold {
        color: #f4eb0b;
      }

      &_content {
        color: black;
        font-weight: 700;
        img {
          width: 15px;
          height: 15px;
        }
      }

      &_img {
        margin-right: 5px;
      }

      &_button {
        cursor: pointer;
        word-break: keep-all;
        color: ${colors.dark_pink};
        font-size: 14px;
        padding: 10px 14px;
        width: 100%;
        border: solid 1px ${colors.dark_pink};
        border-radius: 100px;
      }
      ol {
        color: ${colors.text_light_grey};
      }
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1% 0%;
      }
      color: ${colors.text_grey};
      background-color: #fff;
      padding: 5px;
      text-align: center;
      position: absolute;
      top: 45px;
      border-radius: 5px;
      box-shadow: 0px 3px 6px 0px RGB(100, 100, 100, 0.36);
    }
  }

  .divider {
    height: 100%;
    margin: 0% 1em;
    width: 0.2px;
    background-color: gray;
  }

  @media (min-width: 899px) {
    .search_bar_news_img {
      height: 30px;
      width: 30px;
    }

    .search_bar_recharge_img {
      height: 35px;
      width: 35px;
    }
    .search_bar_avatar_login {
      background-color: ${({ scroll }) => scroll && "#1a2950"};
      color: ${({ scroll }) => scroll && "#fff"};
      font-size: 16px;
    }
  }
`;
