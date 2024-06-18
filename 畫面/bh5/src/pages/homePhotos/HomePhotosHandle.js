import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPhotosDataAction } from "../homePhotosList/HomePhotosListAction";
import { getPhotosTabAction, setNowTabList } from "./HomePhotosAction";

import HomePhotosPage from "./HomePhotosRender";

const HomePhotosStateToProps = (state) => {
  let nowTab = state.homePhoto.nowTab;
  return {
    photosList: state.homePhotosList,
    nowTab: state.homePhoto.nowTab,
    list: state.homePhotosListData[nowTab]
      ? [...state.homePhotosListData[nowTab].list]
      : [],
  };
};

const HomePhotosDispatchToProps = (dispatch) => {
  return {
    getPhotosTab: () => {
      dispatch(getPhotosTabAction());
    },
    clickTabEvent(id) {
      dispatch(setNowTabList(id));
    },
    updatePhotosData: (cateId, scrollColdEnd = () => {}) => {
      dispatch(getPhotosDataAction(cateId, scrollColdEnd));
    },
  };
};

const HomePhotosHandle = connect(
  HomePhotosStateToProps,
  HomePhotosDispatchToProps
)(HomePhotosPage);

export default withRouter(HomePhotosHandle);
