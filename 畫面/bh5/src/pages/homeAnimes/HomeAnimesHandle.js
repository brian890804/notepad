import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeAnimesPage from "./HomeAnimesRender";

import { getHomeAnimeData, refreshAnimeData } from "./HomeAnimesAction";

const HomeAnimesStateToProps = (state, ownProps) => {
  return {
    containerRef: ownProps.containerRef,
    category: state.homeCategory || [],
    comicList:
      state.homeAnimeData.comic ||
      Array.from({ length: 6 }).map((data, index) => {
        return { id: index };
      }),
    newList:
      state.homeAnimeData.new ||
      Array.from({ length: 10 }).map((data, index) => {
        return { id: index };
      }),
    videoList:
      state.homeAnimeData.video ||
      Array.from({ length: 8 }).map((data, index) => {
        return { id: index };
      }),
  };
};

const HomeAnimesDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(getHomeAnimeData());
    },
    refreshData: (key) => {
      dispatch(refreshAnimeData(key));
    },
  };
};

const HomeAnimesHandle = connect(
  HomeAnimesStateToProps,
  HomeAnimesDispatchToProps
)(HomeAnimesPage);

export default withRouter(HomeAnimesHandle);
