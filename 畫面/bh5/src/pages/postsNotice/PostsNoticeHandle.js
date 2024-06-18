import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { backRoutes } from "../../reducers/actions/historyActions";
import { postGetNotice } from "./PostsNoticeAction";

import PostsNoticePage from "./PostsNoticeRender";

const PostsNoticeStateToProps = (state, ownProps) => {
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
    user: state.user,
    postNotice: state.postNotice,
  };
};

const PostsNoticeDispatchToProps = (dispatch) => {
  return {
    postGetNotice: () => {
      dispatch(postGetNotice());
    },
    cancelToBack: () => {
      dispatch(backRoutes());
    },
  };
};

const PostsNoticeHandle = connect(
  PostsNoticeStateToProps,
  PostsNoticeDispatchToProps
)(PostsNoticePage);

export default withRouter(PostsNoticeHandle);
