import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserCollectAction } from "../ProfileMyCollectAction";

import ProfileMyCollectComic from "./ProfileMyCollectComicRender";


const ProfileMyCollectComicStateToProps = (state) => {
  return {
    type: "CAC",
    dataList: [...state.myCollectList["CAC"].list]
  }
}

const ProfileMyCollectComicDispatchToProps = (dispatch) => {
  return {
    getListData: (type) => {
      dispatch(getUserCollectAction(type));
    }
  }
}


export default withRouter(connect(ProfileMyCollectComicStateToProps, ProfileMyCollectComicDispatchToProps)(ProfileMyCollectComic));