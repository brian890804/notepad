import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { backRoutes, pushRoutes } from "../../reducers/actions/historyActions";
import { pageUrlConstants } from "../../constants";
import PostsAddPage from "./PostsAddRender";
import { updateUserDataAction } from "../../reducers/actions/user";

const { post } = pageUrlConstants;
const PostsAddStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    nowSelectTags: [...state.postTags.selectTags],
  };
};

const PostsAddDispatchToProps = (dispatch) => {
  return {
    cancelToBack: () => {
      dispatch(backRoutes());
    },
    goToPostMainPage: () => {
      dispatch(pushRoutes(post.pages.postMain.pages.postMainNew));
    },
    goToSelectTagsPage: () => {
      dispatch(pushRoutes(post.pages.postMain.pages.postAddTags));
    },
    cleanSelectTagStorage: () => {
      dispatch({ type: "CLEAN_POSTSSELECTTAGS" });
    },
    updateUserDataAction: () => {
      dispatch(updateUserDataAction());
    },
  };
};

const PostsAddHandle = connect(
  PostsAddStateToProps,
  PostsAddDispatchToProps
)(PostsAddPage);

export default withRouter(PostsAddHandle);
