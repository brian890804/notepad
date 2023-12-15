import { connect } from "react-redux";
import { withRouter } from "react-router";
import { postSearchWatchHistoryAction } from "../ProfileWatchHistory";
import ProfileWatchHistoryComicRender from "./ProfileWatchHistoryComicRender";
const ProfileWatchHistoryComicStateToProps = (state, ownProps) => {
  return {
    dataList: state.myWatchHistory["anime_comic_list"] || [],
    disabledScrollRefresh: ownProps.disabledScrollRefresh,
  };
};

const ProfileWatchHistoryComicDispatchToProps = (dispatch) => {
  return {
    getWatchHistory: (type) => {
      dispatch(postSearchWatchHistoryAction(type));
    },
  };
};

export default withRouter(
  connect(
    ProfileWatchHistoryComicStateToProps,
    ProfileWatchHistoryComicDispatchToProps
  )(ProfileWatchHistoryComicRender)
);
