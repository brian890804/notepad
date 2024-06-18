import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeNovelsListPage from "./HomeNovelsListRender";

import { getNovelsDataAction } from "./HomeNovelsListAction";

const HomeNovelsListStateToProps = (state) => {
  let cateId = state.router.location.pathname.split("/")[3];

  return {
    title: state.router.location.query.title ? decodeURI(state.router.location.query.title) : "",
    cateId: cateId,
    list: state.homeNovelsListData[cateId] ? [...state.homeNovelsListData[cateId].list] : []
  }
};

const HomeNovelsListDispatchToProps = (dispatch) => {
  return {
    updateNovelsData: (cateId, scrollColdEnd= () => {}) => {
      dispatch(getNovelsDataAction(cateId, scrollColdEnd));
    },
  }
}

const HomeNovelsListHandle = connect( HomeNovelsListStateToProps, HomeNovelsListDispatchToProps )(HomeNovelsListPage);

export default withRouter(HomeNovelsListHandle);