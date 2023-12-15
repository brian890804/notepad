import { connect } from "react-redux";
import { withRouter } from "react-router";
import { postSearchWatchHistoryAction } from "../ProfileWatchHistory";
import ProfileWatchHistoryAnimeRender from "./ProfileWatchHistoryAnimeRender";
const ProfileWatchHistoryAnimeStateToProps = (state, ownProps) => {
  return {
    dataList: state.myWatchHistory["anime_video_list"] || [],
    disabledScrollRefresh: ownProps.disabledScrollRefresh,
  };
};

const ProfileWatchHistoryAnimeDispatchToProps = (dispatch) => {
  return {
    getWatchHistory: (type) => {
      dispatch(postSearchWatchHistoryAction(type));
    },
  };
};

export default withRouter(
  connect(
    ProfileWatchHistoryAnimeStateToProps,
    ProfileWatchHistoryAnimeDispatchToProps
  )(ProfileWatchHistoryAnimeRender)
);
