import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  collectComicAnimeContentAction,
  getComicAnimeContentAction,
} from "../../reducers/actions/comicAnimeActionData";
import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";
// import { getAnimeContentAction } from "./HomeAnimesContentAction";

import HomeAnimesContent from "./HomeAnimesContentRender";

const HomeAnimesContentStateToProps = (state) => {
  const location = state.router.location.pathname.split("/");
  let animeId = parseInt(location[3]);
  let animeEp = parseInt(location[4]);
  return {
    user: state.user,
    animeId: animeId,
    animeEp: animeEp,
    //動漫內容
    animeData: state.homeAnimesContentData[animeId]
      ? { ...state.homeAnimesContentData[animeId] }
      : {},
    //動漫m3u8網址
    animeView: state.homeAnimesViewData[animeId]
      ? state.homeAnimesViewData[animeId][animeEp]
      : "",
    animeNextRecommend: state.homeAnimesViewData[animeId]
      ? state.homeAnimesViewData[animeId]["recommend"]
      : {},
  };
};

const HomeAnimesContentDispatch = (dispatch) => {
  return {
    getAnimeContent: (id, ep, callback) => {
      dispatch(
        getComicAnimeContentAction(id, ep, "INIT_ANIMESCONTENT", callback)
      );
      // dispatch(getAnimeContentAction(id, ep));
    },
    checkUser: (data) => {
      dispatch(
        checkinPageConditioncheckAction({
          itemId: data.id,
          itemType: 3,
          episode: data.episode,
          checkOnPage: true,
          animeLastWatchTime: data.animeLastWatchTime,
        })
      );
    },
    buyAnimes: (data) => {
      dispatch(
        checkinPageConditioncheckAction({
          itemId: data.id,
          itemType: 3,
          episode: data.episode,
        })
      );
    },
    collectEvent: (id) => {
      dispatch(collectComicAnimeContentAction(id, 2));
    },
  };
};

export default withRouter(
  connect(
    HomeAnimesContentStateToProps,
    HomeAnimesContentDispatch
  )(HomeAnimesContent)
);
