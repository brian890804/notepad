import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../../store";
import { getMyOrderListAction } from "./ProfileMyorderAction";

import ProfileMyorder from "./ProfileMyorderRender";

const ProfileMyorderStateToProps = (state) => {
  return {
    myorderData: state.myorderData,
  };
};

const ProfileMyorderDispatchToProps = (dispatch) => {
  return {
    getMyOrderList: () => {
      let uid = store.getState().user.id;
      dispatch(
        getMyOrderListAction({
          uid,
        })
      );
    },
  };
};

export default withRouter(
  connect(
    ProfileMyorderStateToProps,
    ProfileMyorderDispatchToProps
  )(ProfileMyorder)
);
