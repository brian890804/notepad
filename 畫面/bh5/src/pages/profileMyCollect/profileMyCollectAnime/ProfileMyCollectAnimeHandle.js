import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserCollectAction } from "../ProfileMyCollectAction";

import ProfileMyCollectAnime from "./ProfileMyCollectAnimeRender";


const ProfileMyCollectAnimeStateToProps = (state) => {
  return {
    type: "CAV",
    dataList: [...state.myCollectList["CAV"].list]
  }
}

const ProfileMyCollectAnimeDispatchToProps = (dispatch) => {
  return {
    getListData: (type) => {
      dispatch(getUserCollectAction(type));
    }
  }
}


export default withRouter(connect(ProfileMyCollectAnimeStateToProps, ProfileMyCollectAnimeDispatchToProps)(ProfileMyCollectAnime));