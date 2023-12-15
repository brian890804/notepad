import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomeComicListContent from "./HomeComicListContentRender";

import {
  collectComicAnimeContentAction,
  getComicAnimeContentAction,
} from "../../reducers/actions/comicAnimeActionData";
import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";

const HomeComicListContentStateToProps = (state) => {
  let comicId = state.router.location.pathname.split("/")[3];
  return {
    user: state.user,
    comicId,
    comicData: state.homeComicContentData[comicId]
      ? { ...state.homeComicContentData[comicId] }
      : {},
  };
};

const HomeComicListContentDispatchToProps = (dispatch) => {
  return {
    getComicContent: (id) => {
      dispatch(getComicAnimeContentAction(id, 1, "INIT_COMICCONTENT"));
    },
    buyComicBook: (data) => {
      dispatch(
        checkinPageConditioncheckAction({
          itemId: data.id,
          itemType: 2,
          episode: data.episode,
        })
      );
    },
    collectEvent: (id) => {
      dispatch(collectComicAnimeContentAction(id));
    },
  };
};

export default withRouter(
  connect(
    HomeComicListContentStateToProps,
    HomeComicListContentDispatchToProps
  )(HomeComicListContent)
);
