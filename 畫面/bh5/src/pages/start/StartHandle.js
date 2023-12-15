import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StartPage from "./StartRender";
import { backRoutes } from "../../reducers/actions/historyActions";

const StartStateToProps = (state) => {
  return {
    // pcFooterShow: state.pcFooter,
    loadingStr: !state.adsList
      ? "正在读取"
      : !state.adsList.launch_random_banner
      ? "加载广告"
      : "图片加载中", // 加载广告, 图片加载中
    popAdsImg: !state.adsList ? "" : state.adsList.launch_random_banner,
    adsList: state.adsList,
  };
};

const StartDispatchToProps = (dispatch) => {
  return {
    closeAds: () => {
      dispatch(backRoutes());
    },
  };
};

const StartHandle = connect(StartStateToProps, StartDispatchToProps)(StartPage);

export default withRouter(StartHandle);
