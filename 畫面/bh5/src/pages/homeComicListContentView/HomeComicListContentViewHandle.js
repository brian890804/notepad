import { connect } from "react-redux";
import { withRouter } from "react-router";
import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";

import { collectComicAnimeContentAction, getComicAnimeContentAction } from "../../reducers/actions/comicAnimeActionData";

import HomeComicListContentView from "./HomeComicListContentViewRender";
// import { getComicViewPhotosAction } from "./HomeComicListContentViewAction";

const HomeComicListContentViewStateToProps = (state) => {
  let comicId = state.router.location.pathname.split('/')[3];
  let comicEp = state.router.location.pathname.split('/')[4];
  return {
    user: state.user,
    comicId,
    comicEp,
    comicData: state.homeComicContentData[comicId] ? {...state.homeComicContentData[comicId]} : {},
    comic_view: state.homeComicViewData[comicId] ? (state.homeComicViewData[comicId][comicEp] ? state.homeComicViewData[comicId][comicEp] : []) : []
  }
}

const HomeComicListContentViewDispatchToProps = (dispatch) => {
  return {
    checkUser: (data) => {
      dispatch(checkinPageConditioncheckAction({
        itemId: data.id, 
        itemType: 2,
        episode: data.episode,
        checkOnPage: true
      }))
    },
    getComicContent: (id,episode, callback) => {
      dispatch(getComicAnimeContentAction(id,episode, "INIT_COMICCONTENT", callback));
    },
    // getComicViewPhotos: (id, ep) => {
    //   dispatch(getComicViewPhotosAction(id, ep));
    // },
    collectEvent: (id) => {
      dispatch(collectComicAnimeContentAction(parseInt(id)));
    },
    toComicEpPage: (id, ep) => {
      dispatch(checkinPageConditioncheckAction({
        itemId: id, 
        itemType: 2,
        episode: ep
      }))
    }
  }
}

export default withRouter(connect( HomeComicListContentViewStateToProps, HomeComicListContentViewDispatchToProps)(HomeComicListContentView));