import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../../store";
import { getMyorderDetailAction } from "./ProfileMyorderDetailAction";

import ProfileMyorderDetail from "./ProfileMyorderDetailRender";

const ProfileMyorderDetailStateToProps = (state) => {
  let goodsId = state.router.location.pathname.split('/')[3];
  return {
    goodsId: goodsId,
    goodsData: state.myorderDataDetail[goodsId] ? state.myorderDataDetail[goodsId] : {}
  }
};

const ProfileMyorderDetailDispatchToProps = (dispatch) => {
  return {
    getMyorderDetail: (goodsId) => {
      dispatch(getMyorderDetailAction({
        uid: store.getState().user.id,
        oderid: goodsId,
      }));
    }
  }
};

export default withRouter(
  connect(
    ProfileMyorderDetailStateToProps,
    ProfileMyorderDetailDispatchToProps
  )(ProfileMyorderDetail)
);
