import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserCollectAction } from "../ProfileMyCollectAction";

import ProfileMyCollectPhoto from "./ProfileMyCollectPhotoRender";

const ProfileMyCollectPhotoStateToProps = (state) => {
  return {
    type: "CT",
    dataList: [...state.myCollectList["CT"].list]
  }
}

const ProfileMyCollectPhotoDispatchToProps = (dispatch) => {
  return {
    getListData: (type) => {
      dispatch(getUserCollectAction(type));
    }
  }
}


export default withRouter(connect(ProfileMyCollectPhotoStateToProps, ProfileMyCollectPhotoDispatchToProps)(ProfileMyCollectPhoto));