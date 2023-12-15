import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserCollectAction } from "../ProfileMyCollectAction";

import ProfileMyCollectVideo from "./ProfileMyCollectVideoRender";

const ProfileMyCollectVideoStateToProps = (state) => {
  return {
    type: "CV",
    dataList: [...state.myCollectList["CV"].list]
  }
}

const ProfileMyCollectVideoDispatchToProps = (dispatch) => {
  return {
    getListData: (type) => {
      dispatch(getUserCollectAction(type));
    }
  }
}


export default withRouter(connect(ProfileMyCollectVideoStateToProps, ProfileMyCollectVideoDispatchToProps)(ProfileMyCollectVideo));