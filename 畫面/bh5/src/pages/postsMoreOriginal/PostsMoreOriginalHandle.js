import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postGetRecommendOriginal } from "./PostsMoreOriginalAction";

import PostsMoreOriginalPage from "./PostsMoreOriginalRender";

const PostsMoreOriginalStateToProps = (state, ownProps) => {
  return {
    postRecommendList: state.postRecommendList,
    user: state.user,
  };
};

const PostsMoreOriginalDispatchToProps = (dispatch) => {
  return {
    postGetRecommendOriginal: (status,scrollColdEnd) => {
      dispatch(postGetRecommendOriginal(status,scrollColdEnd));
    },
  };
};

const PostsMoreOriginalHandle = connect(
  PostsMoreOriginalStateToProps,
  PostsMoreOriginalDispatchToProps
)(PostsMoreOriginalPage);

export default withRouter(PostsMoreOriginalHandle);
