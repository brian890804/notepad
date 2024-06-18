import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { getPostListAction } from "../postsMainNew/PostsMainNewAction";

import PostsMainTrackPage from "./PostsMainTrackRender";

const PostsMainTrackStateToProps = (state, ownProps) => {
  const breadcrumbsLength = state.breadcrumbs.length;
  const nowRoute = state.router.location.pathname;
  const notPath = state.breadcrumbs[breadcrumbsLength - 1]?.path;
  const lastPath = state.breadcrumbs[breadcrumbsLength - 2]?.path;
  const isFirstEnter = state.breadcrumbs.find((data, index) => {
    if (index < breadcrumbsLength - 1) return data.path === nowRoute;
  });
  return {
    //第一次進入會更新資料
    refreshData:
      notPath === lastPath || !isFirstEnter || breadcrumbsLength <= 1,
    postTrackData: state.postTrackData,
    isBack: state.router.action === "POP",
  };
};

const PostsMainTrackDispatchToProps = (dispatch) => {
  return {
    updatePostTrackData: (scrollColdEnd = () => {}) => {
      dispatch(getPostListAction(scrollColdEnd, 1));
    },
    initPostTrackData: () => {
      dispatch(getPostListAction(() => {}, 1, "init"));
    },
    pushToNew: () => {
      dispatch(pushRoutes(pageUrlConstants.post.pages.postMain));
    },
  };
};

const PostsMainTrackHandle = connect(
  PostsMainTrackStateToProps,
  PostsMainTrackDispatchToProps
)(PostsMainTrackPage);

export default withRouter(PostsMainTrackHandle);
