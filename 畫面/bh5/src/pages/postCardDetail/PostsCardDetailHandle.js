import { connect } from "react-redux";
import { requestUrlConstants, userRank } from "../../constants";
import axiosRequest from "../../modules/axiosItem";
import callToast from "../../modules/toastCall";
import store from "../../store";
import { getPostCardDetailAction } from "./PostsCardDetailAction";
import PostCardDetail from "./PostsCardDetailRender";

const { postAddCommentUrl } = requestUrlConstants;

const PostsCardDetailStateToProps = (state) => {
  const location = state.router.location.pathname.split("/");
  return {
    user: state.user,
    postId: location[4],
    postCardData: state.postData[location[4]]
      ? state.postData[location[4]]
      : {
          create_time: Date.now(),
        },
  };
};

const PostsCardDetailDispatchToProps = (dispatch) => {
  const storeData = store.getState();
  const user = storeData.user;
  const formData = new FormData();
  return {
    submitCommentEvent: (comment, dynamic_id, callback = () => {}) => {
      if (comment.length === 0) {
        callToast("空...空的Σ( ° △ °|||)");
      } else if (comment.length > 30) {
        callToast("太...太长了受不了拉,,Ծ‸Ծ,,");
      } else {
        formData.append("uid", user.id);
        formData.append("dynamic_id", dynamic_id);
        formData.append("content", comment);
        axiosRequest.post(postAddCommentUrl, formData).then((data) => {
          callToast("已送出留言。");
          callback();
        });
      }
    },
    getPostCardDetail: (goodsId) => {
      dispatch(getPostCardDetailAction(goodsId));
    },
  };
};

export default connect(
  PostsCardDetailStateToProps,
  PostsCardDetailDispatchToProps
)(PostCardDetail);
