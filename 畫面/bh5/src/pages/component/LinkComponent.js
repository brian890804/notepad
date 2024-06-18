import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";

import {
  pushRoutes,
  replaceRoutes,
  routesPathMaker,
} from "../../reducers/actions/historyActions";
import store from "../../store";
import { pageUrlConstants } from "../../constants";

const { login, home, profile } = pageUrlConstants;

/**
 * @description when url maybe is Internal Link use this component
 *
 * @param {object} { routes, children, className, linkEvent}
 * @return {*}
 */
const LinkComponent = ({
  routes,
  children,
  className,
  linkEvent,
  replaceUrl,
  loginRequire,
  updateHomeMainCategoryTag,
}) => {
  function judgeNowPath() {
    const {
      link_type,
      inside_value,
      inside_category,
      inside_keyword,
      category_status,
      anime_category,
      anime_tag,
    } = routes.inside_data;
    switch (link_type) {
      case "1":
        //特定動畫播放頁
        return {
          dynamic: { animeId: inside_value, animeEp: 1 },
          path: home.pages.homeAnimesSwitch.pages.homeAnimesContent.path,
          name: home.pages.homeAnimesSwitch.pages.homeAnimesContent.name,
        };
      case "2":
        //特定漫畫介紹頁
        return {
          dynamic: { comicId: inside_value },
          path: home.pages.homeComicList.pages.homeComicListSwitch.pages
            .homeComicListContent.path,
          name: home.pages.homeComicList.pages.homeComicListSwitch.pages
            .homeComicListContent.name,
        };
      case "3":
        //特定視頻播放頁
        return {
          dynamic: { videoId: inside_value },
          path: home.pages.homeVideoSwitch.pages.homeVideoContent.path,
          name: home.pages.homeVideoSwitch.pages.homeVideoContent.name,
        };
      case "4":
        //特定小說頁
        return {
          dynamic: { novelId: inside_value },
          path: home.pages.homeNovelsContent.path,
          name: home.pages.homeNovelsContent.name,
        };
      case "5":
        //特定美圖頁
        return {
          dynamic: { photoId: inside_value },
          path: home.pages.homePhotosContent.path,
          name: home.pages.homePhotosContent.name,
        };
      case "6":
        //任務中心頁
        return {
          path: profile.pages.profileMission.path,
          name: profile.pages.profileMission.name,
        };
      case "7":
        //遊戲頁
        return {
          path: home.pages.homeGame.path,
          name: home.pages.homeGame.name,
        };
      case "8":
        //排行榜頁
        return {
          path: home.pages.homeLeaderboard.pages.homeLeaderboardComic.path,
          name: home.pages.homeLeaderboard.pages.homeLeaderboardComic.name,
        };
      case "9":
        //免費看頁
        return {
          dynamic: { tab: "免费看" },
          path: home.pages.homeMain.pages.homeCategory.path,
          name: home.pages.homeMain.pages.homeCategory.name,
        };
      case "10":
        //推廣分享頁
        return {
          path: profile.pages.profileShare.path,
          name: profile.pages.profileShare.name,
        };
      case "11":
        //直播頁面
        return {
          path: home.pages.homeMain.pages.homeStreams.path,
          name: home.pages.homeMain.pages.homeStreams.name,
        };
      case "12":
        return {
          //開通VIP頁面
          path: profile.pages.profileBuyVip.pages.profileBuyVipCommon.path,
          name: profile.pages.profileBuyVip.pages.profileBuyVipCommon.name,
        };
      case "13":
        //精鑽/金幣充值頁面
        return {
          path: profile.pages.profilePayment.path,
          name: profile.pages.profilePayment.name,
        };
      case "14":
        //特定搜索結果
        if (category_status == "1") {
          //:關鍵字搜尋
          return {
            dynamic: { search: inside_keyword },
            path:
              home.pages.homeSearch.pages.homeSearchResult.path +
              "/" +
              inside_category,
            name: home.pages.homeSearch.pages.homeSearchResult.name,
          };
        } else {
          updateHomeMainCategoryTag(anime_category, anime_tag);
          return {
            //:分類搜尋
            dynamic: { tab: anime_category },
            path: home.pages.homeMain.pages.homeCategory.path,
            name: home.pages.homeMain.pages.homeCategory.name,
          };
        }
      default:
        return {};
    }
  }
  return routes?.linkurl ? (
    //外部跳轉
    <a
      style={{ textDecoration: "none", cursor: "pointer" }}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      href={routes.linkurl}
    >
      {children}
    </a>
  ) : routes.path ? (
    //內部網址跳轉
    <Link
      style={{ textDecoration: "none", cursor: "pointer" }}
      className={className}
      // to={routesPathMaker(routes?.path, routes?.dynamic) || "#"}
      onClick={(e) => {
        e.preventDefault();
        linkEvent(routes, replaceUrl, loginRequire);
      }}
    >
      {children}
    </Link>
  ) : (
    //特別判斷內部網址跳轉
    <Link
      style={{ textDecoration: "none", cursor: "pointer" }}
      className={className}
      // to={routesPathMaker(routes?.path, routes?.dynamic) || "#"}
      onClick={(e) => {
        e.preventDefault();
        linkEvent(judgeNowPath(), replaceUrl, loginRequire);
      }}
    >
      {children}
    </Link>
  );
};

const LinkStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
    children: ownProps.children,
    className: ownProps.className || "",
    replaceUrl: ownProps.replaceUrl,
    loginRequire: ownProps.loginRequire,
  };
};

const LinkDispatchToProps = (dispatch) => {
  return {
    linkEvent: (routes, replaceUrl = false, loginRequire = false) => {
      const userId = store.getState().user.id;
      if (loginRequire) {
        if (userId === "guest") {
          dispatch(pushRoutes(login.pages.loginMain));
          return;
        }
      }

      if (replaceUrl) {
        dispatch(replaceRoutes(routes));
      } else {
        dispatch(pushRoutes(routes));
      }
    },
    updateHomeMainCategoryTag: (category, tagName) => {
      dispatch({
        type: "UPDATE_CATEGORYDATA_SELECT_TAG_GP",
        category: category,
        tag_name: tagName,
      });
    },
  };
};

LinkComponent.propTypes = {
  routes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default compose(connect(LinkStateToProps, LinkDispatchToProps))(
  LinkComponent
);
