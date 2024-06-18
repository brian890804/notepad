import { connect } from "react-redux";
import { backRoutes } from "../../reducers/actions/historyActions";
import { getPostAddTags, setPostSelectTags } from "./PostAddTagsAction";
import PostCardDetail from "./PostAddTagsRender";

const PostAddTagsStateToProps = (state) => {
  return {
    postTags: state.postTags.postTags,
    nowSelectTags: [...state.postTags.selectTags],
  };
};

const PostAddTagsDispatchToProps = (dispatch) => {
  return {
    getPostAddTags: (goodsId) => {
      dispatch(getPostAddTags(goodsId));
    },
    setPostSelectTags: (data) => {
      dispatch(setPostSelectTags(data));
    },
    goBackRoutes: () => {
      dispatch(backRoutes());
    },
  };
};

export default connect(
  PostAddTagsStateToProps,
  PostAddTagsDispatchToProps
)(PostCardDetail);
