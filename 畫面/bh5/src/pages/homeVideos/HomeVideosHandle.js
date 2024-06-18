import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getCateVideoData,
  getHomeVideoData,
  setNowTabList,
} from "./HomeVideoAction";

import HomeVideosPage from "./HomeVideosRender";

const HomeVideosStateToProps = (state, ownProps) => {
  const nowTab = state.homeVideo.nowTab;
  return {
    user: state.user,
    containerRef: ownProps.containerRef,
    hideImageCarousel: ownProps.hideImageCarousel,
    nowTab: nowTab,
    videoList: state.homeVideoList,
  };
};

const HomeVideosDispatchToProps = (dispatch) => {
  return {
    getVideoData() {
      dispatch(getHomeVideoData());
    },
    clickTabEvent(cateid) {
      dispatch(setNowTabList(cateid));
    },
    updateCateVideoData(cateid, scrollColdEnd = () => {}) {
      dispatch(getCateVideoData(cateid, scrollColdEnd));
    },
  };
};

const HomeVideosHandle = connect(
  HomeVideosStateToProps,
  HomeVideosDispatchToProps
)(HomeVideosPage);

export default withRouter(HomeVideosHandle);
