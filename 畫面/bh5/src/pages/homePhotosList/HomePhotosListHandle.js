import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getPhotosDataAction } from "./HomePhotosListAction";

import HomePhotosListPage from "./HomePhotosListRender";

const HomePhotosListStateToProps = (state) => {
  let cateId = state.router.location.pathname.split("/")[3];

  return {
    title: state.router.location.query.title ? decodeURI(state.router.location.query.title) : "",
    cateId: cateId,
    list: state.homePhotosListData[cateId] ? [...state.homePhotosListData[cateId].list] : []

  }
}

const HomePhotosListDispatchToProps = (dispatch) => {
  return {
    updatePhotosData: (cateId, scrollColdEnd= () => {}) => {
      dispatch(getPhotosDataAction(cateId, scrollColdEnd));
    },
  }
}

export default withRouter(connect(HomePhotosListStateToProps, HomePhotosListDispatchToProps)(HomePhotosListPage));