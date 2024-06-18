import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getNovelsDataAction } from "../homeNovelsList/HomeNovelsListAction";
import { getNovelsTabAction, setNowTabList } from "./HomeNovelsAction";

import HomeNovelsPage from "./HomeNovelsRender";

const HomeNovelsStateToProps = (state) => {
  return {
    nowTab: state.homeNovel.nowTab,
    novelsList: state.homeNovelsList,
    list: state.homeNovelsListData 
  };
};

const HomeNovelsDispatchToProps = (dispatch) => {
  return {
    getNovelsTab: () => {
      dispatch(getNovelsTabAction());
    },
    updateNovelsData: (id, scrollColdEnd = () => {}) => {
      dispatch(getNovelsDataAction(id, scrollColdEnd));
    },
    clickTabEvent(id) {
      dispatch(setNowTabList(id));
    },
  };
};

const HomeNovelsHandle = connect(
  HomeNovelsStateToProps,
  HomeNovelsDispatchToProps
)(HomeNovelsPage);

export default withRouter(HomeNovelsHandle);
