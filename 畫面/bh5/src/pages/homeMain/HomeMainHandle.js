import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeMainPage from "./HomeMainRender";

import {
  getContinueWatchData,
  getHomeData,
  refreshAnimeData,
} from "./HomeMainAction";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import { useIntl } from "react-intl";
import {
  postAttentionEventAction,
  postScribeEventAction,
} from "../postsMainNew/component/PostCardItemAction";
import store from "../../store";

const { home, login } = pageUrlConstants;
const HomeMainStateToProps = (state, ownProps) => {
  function fillDataArray(item, length) {
    if (state.homeData[item] && state.homeData[item].length) {
      return [...state.homeData[item]];
    } else {
      return Array.from({ length: length || 8 }).map((data, index) => {
        return { id: index };
      });
    }
  }
  console.log(state.homeData, "state.homeData");
  return {
    user: state.user,
    anime_watch_history: state.homeData.anime_watch_history || [],
    comic_watch_history: state.homeData.comic_watch_history || [],
    weekComicList: fillDataArray("week_comic_list"),
    hot_comic_list: fillDataArray("hot_comic_list"),
    rank_comic_list: fillDataArray("rank_comic_list"),
    all_comic_list: fillDataArray("all_comic_list"),
    week_anime_list: fillDataArray("week_anime_list"),
    rank_anime_list: fillDataArray("rank_anime_list"),
    hot_anime_list: fillDataArray("hot_anime_list"),
    all_anime_list: fillDataArray("all_anime_list"),
    game_list: fillDataArray("game_list"),
    video_list: state.homeData.video_list || {},
    video_category_list: state.homeData.video_category_list || [],
    photo_category_list: state.homeData.photo_category_list || [],
    photo_list: state.homeData.photo_list || {},
    novel_list: fillDataArray("novel_list"),
    creation_list: fillDataArray("creation_list"),
  };
};

const HomeMainDispatchToProps = (dispatch) => {
  const intl = useIntl();
  const userId = store.getState().user.id;
  return {
    init: () => {
      dispatch(getHomeData());
    },
    getWatchHistory: () => {
      dispatch(getContinueWatchData());
    },
    refreshData: (key) => {
      dispatch(refreshAnimeData(key));
    },
    toDetailPage: (type) => {
      let url = "";
      let category = "";
      switch (type) {
        case "comic_ranking":
          url = home.pages.homeLeaderboard.pages.homeLeaderboardComic.path;
          break;
        case "all_comic_list":
          url = home.pages.homeMain.pages.homeCategory.path;
          category = {
            tab: intl.formatMessage({ id: "GLOBAL.COMICS" }),
          };
          break;
        case "anime_ranking":
          url = home.pages.homeLeaderboard.pages.homeLeaderboardAnime.path;
          break;
        case "all_anime_list":
          url = home.pages.homeMain.pages.homeCategory.path;
          category = {
            tab: intl.formatMessage({ id: "GLOBAL.ANIMATE" }),
          };
          break;
        case "feature_game":
          url = home.pages.homeGame.path;
          break;
        case "video":
          url = home.pages.homeMain.pages.homeVideos.path;
          break;
        case "photo":
          url = home.pages.homeMain.pages.homePhotos.path;
          break;
        case "novel_list":
          url = home.pages.homeMain.pages.homeNovels.path;
          break;
        // case "recommend_original":
        //   url = home.pages.homeLeaderboard;
        //   break;
        //   ;
        default:
          break;
      }
      dispatch(pushRoutes({ path: url, dynamic: category }));
    },
    postCardScribeMediaEvent: (data, type) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postScribeEventAction(data, type));
      }
    },
    postCardAttentionEvent: (data) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(
          postAttentionEventAction({
            uid: data.uid,
            is_attention: data.is_follow,
          })
        );
      }
    },
  };
};

const HomeMainHandle = connect(
  HomeMainStateToProps,
  HomeMainDispatchToProps
)(HomeMainPage);

export default withRouter(HomeMainHandle);
