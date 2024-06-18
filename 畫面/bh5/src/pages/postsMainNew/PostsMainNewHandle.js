import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PostsMainNewPage from "./PostsMainNewRender";

import { getPostListAction } from "./PostsMainNewAction";
import store from "../../store";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";

const { login, post } = pageUrlConstants;

const PostsMainNewStateToProps = (state, ownProps) => {
  const breadcrumbsLength = state.breadcrumbs.length;
  const newRoute = state.router.location.pathname;
  const notPath = state.breadcrumbs[breadcrumbsLength - 1]?.path;
  const lastPath = state.breadcrumbs[breadcrumbsLength - 2]?.path;
  const isFirstEnter = state.breadcrumbs.find((data, index) => {
    if (index < breadcrumbsLength - 1) return data.path === newRoute;
  });
  console.log(state.postListData,'state.postListData')
  return {
    user: state.user,
    refreshData:
      notPath === lastPath || !isFirstEnter || breadcrumbsLength <= 1,
    showTip:
      state.breadcrumbs[breadcrumbsLength - 2]?.path === "/posts/main/add" &&
      !state.user.is_creation,
    postListData: state.postListData,
  };
};

const PostsMainNewDispatchToProps = (dispatch) => {
  return {
    updatePostListData: (scrollColdEnd = () => {}) => {
      dispatch(getPostListAction(scrollColdEnd));
    },
    initPostListData: () => {
      dispatch(getPostListAction(() => {}, "", "init"));
    },
    floatBtnClick: () => {
      let user = store.getState().user;
      if (user.id === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(pushRoutes(post.pages.postMain.pages.postAdd));
      }
    },
  };
};

const PostsMainNewHandle = connect(
  PostsMainNewStateToProps,
  PostsMainNewDispatchToProps
)(PostsMainNewPage);

export default withRouter(PostsMainNewHandle);
