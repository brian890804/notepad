import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PostsSameTagListPage from "./PostsSameTagListRender";

import {
  getPostSameTagListAction,
  getPostTags,
} from "./PostsSameTagListAction";
import store from "../../store";
import { backRoutes, pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";

const { login, post } = pageUrlConstants;

const PostsSameTagListStateToProps = (state, ownProps) => {
  return {
    postSameTagList: state.postSameTagList || [],
    title:
      state.postTags.postTags.filter(
        (data) => data.id == state.router.location.pathname.split("/")[4]
      )[0]?.name || [],
  };
};

const PostsSameTagListDispatchToProps = (dispatch) => {
  return {
    updatePostSameListTagData: (scrollColdEnd = () => {}) => {
      dispatch(getPostSameTagListAction(scrollColdEnd));
    },
    initPostSameListTagData: () => {
      dispatch(getPostSameTagListAction(() => {}, "init"));
    },
    floatBtnClick: () => {
      let user = store.getState().user;
      if (user.id === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(pushRoutes(post.pages.postMain.pages.postAdd));
      }
    },
    backRoutes: () => {
      dispatch(backRoutes());
    },
    getPostTags: () => {
      dispatch(getPostTags());
    },
  };
};

const PostsSameTagListHandle = connect(
  PostsSameTagListStateToProps,
  PostsSameTagListDispatchToProps
)(PostsSameTagListPage);

export default withRouter(PostsSameTagListHandle);
