import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { backRoutes, pushRoutes } from "../../reducers/actions/historyActions";
import store from "../../store";
import {
  postAttentionEventAction,
  postPayEventAction,
  postScribeEventAction,
} from "../postsMainNew/component/PostCardItemAction";
import { getPostListAction, postGetProfile } from "./PostsProfileAction";
import PostsProfilePage from "./PostsProfileRender";

const { login } = pageUrlConstants;
const PostsProfileStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    postProfile: state.postProfile || [],
    router: state.router.location.pathname.split("/")[4],
  };
};

const PostsProfileDispatchToProps = (dispatch) => {
  const userId = store.getState().user.id;
  return {
    postGetProfile: () => {
      dispatch(postGetProfile());
    },
    cancelToBack: () => {
      dispatch(backRoutes());
    },
    cleanProfile: () => {
      dispatch({ type: "CLEAN_POST_PROFILE" });
    },
    backRoutes: () => {
      dispatch(backRoutes());
    },
    getPostListAction: (scrollColdEnd = () => {}, type) => {
      dispatch(getPostListAction(scrollColdEnd, "", type));
    },
    initPostListAction: (type) => {
      dispatch(getPostListAction(() => {}, "init", type));
    },
    postCardAttentionEvent: (data) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(
          postAttentionEventAction({
            uid: data.id,
            is_attention: data.is_attention,
          })
        );
      }
    },
    toEditOwner: () => {
      dispatch(
        pushRoutes(
          pageUrlConstants.profile.pages.profileEdit.pages.profileEditInfo
        )
      );
    },
    postCardScribeMediaEvent: (data, type) => {
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postScribeEventAction({ uid: data.id }, type));
      }
    },
    pushToNew: () => {
      dispatch(pushRoutes(pageUrlConstants.post.pages.postMain));
    },
    postCardDonateEvent: (
      data = "",
      gold,
      callback,
      action = 3,
      pay_type = 1
    ) => {
      //data 不傳代表不打賞對應貼文
      if (userId === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postPayEventAction(data, gold, callback, action, pay_type));
      }
    },
  };
};

const PostsProfileHandle = connect(
  PostsProfileStateToProps,
  PostsProfileDispatchToProps
)(PostsProfilePage);

export default withRouter(PostsProfileHandle);
