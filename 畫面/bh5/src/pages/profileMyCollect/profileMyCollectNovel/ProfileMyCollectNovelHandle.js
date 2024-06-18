import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserCollectAction } from "../ProfileMyCollectAction";

import ProfileMyCollectNovel from "./ProfileMyCollectNovelRender";


const ProfileMyCollectNovelStateToProps = (state) => {
  return {
    type: "CX",
    dataList: [...state.myCollectList["CX"].list]
  }
}

const ProfileMyCollectNovelDispatchToProps = (dispatch) => {
  return {
    getListData: (type) => {
      dispatch(getUserCollectAction(type));
    }
  }
}


export default withRouter(connect(ProfileMyCollectNovelStateToProps, ProfileMyCollectNovelDispatchToProps)(ProfileMyCollectNovel));