import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
// import { getUserVideoFavorListAction } from "../../reducers/actions/user";
import { checkinPageConditioncheckAction } from "../../reducers/actions/utilities";
import {
  getVideoContentAction,
  toggleVideoCollectAction,
} from "./HomeVideoContentAction";

import HomeVideoContent from "./HomeVideoContentRender";

const { home } = pageUrlConstants;

const HomeVideoContentStateToProps = (state, ownProps) => {
  const location = state.router.location.pathname.split("/");

  return {
    videoList: state.homeVideoList,
    videoId: location[3],
    videoData: state.homeVideoContent[location[3]]
      ? { ...state.homeVideoContent[location[3]] }
      : {
          ...state.homeVideoList[state.homeVideo.nowTab]?.videolist.filter(
            (data) => data.id == location[3]
          )[0],
        },
  };
};

const HomeVideoContentDispatchToProps = (dispatch) => {
  return {
    // getVideoContent: (id, callback) => {
    //   dispatch(getVideoContentAction(id, callback));
    // },
    toRecommendVideo: (id, title) => {
      dispatch(
        pushRoutes({
          name: home.pages.homeMain.pages.homeVideoContent.name + title,
          path: home.pages.homeMain.pages.homeVideoContent.path,
          dynamic: {
            videoId: id,
          },
        })
      );
    },
    // getFavorVideo: () => {
    //   dispatch(getUserVideoFavorListAction());
    // },
    toggleVideoCollect: (data) => {
      dispatch(toggleVideoCollectAction(data));
    },
    checkUser: (data) => {
      dispatch(
        checkinPageConditioncheckAction({
          itemId: data.id,
          itemType: 4,
          checkOnPage: true,
        })
      );
    },
  };
};

export default withRouter(
  connect(
    HomeVideoContentStateToProps,
    HomeVideoContentDispatchToProps
  )(HomeVideoContent)
);
