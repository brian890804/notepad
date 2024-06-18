import { connect } from "react-redux";
import { withRouter } from "react-router";
import { clearHistoryAction, getSearchTabAction } from "./HomeSearchMainAction";

import HomeSearchMainPage from "./HomeSearchMainRender";

const HomeSearchMainStateToProps = (state) => {
  return {
    hotTabList: state.homeSearchTabList.hotTab,
    historyList: state.homeSearchTabList.historyTab
  };
};

const HomeSearchMainDispatchToProps = (dispatch) => {
  return {

    getSearchTabData: () => {
      dispatch(getSearchTabAction());
    },

    clearHistory: () => {
      dispatch(clearHistoryAction());
    }
  };
};

const HomeSearchMainHandle = connect(
  HomeSearchMainStateToProps,
  HomeSearchMainDispatchToProps
)(HomeSearchMainPage);

export default withRouter(HomeSearchMainHandle);
