import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PostsRecommendFriendPage from "./PostsRecommendFriendRender";

import { getPostListAction } from "./PostsRecommendFriendAction";
import store from "../../store";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import { postGetRecommendOriginal } from "../postsMoreOriginal/PostsMoreOriginalAction";

const { login, post } = pageUrlConstants;

const PostsRecommendFriendStateToProps = (state, ownProps) => {
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
    postRecommendList: state.postRecommendList.list,
    postListData: state.postRecommendFriendList,
  };
};

const PostsRecommendFriendDispatchToProps = (dispatch) => {
  return {
    updatePostListData: (scrollColdEnd = () => {}) => {
      dispatch(getPostListAction(scrollColdEnd, ""));
    },
    initPostListData: () => {
      dispatch(getPostListAction(() => {}, "init"));
    },
    floatBtnClick: () => {
      let user = store.getState().user;
      if (user.id === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(pushRoutes(post.pages.postMain.pages.postAdd));
      }
    },
    pushToNew: () => {
      dispatch(pushRoutes(pageUrlConstants.post.pages.postMain));
    },
    postGetRecommendOriginal: () => {
      dispatch(postGetRecommendOriginal("init", () => {}));
    },
  };
};

const PostsRecommendFriendHandle = connect(
  PostsRecommendFriendStateToProps,
  PostsRecommendFriendDispatchToProps
)(PostsRecommendFriendPage);

export default withRouter(PostsRecommendFriendHandle);
