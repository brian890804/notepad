import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setPcFooter } from "../../reducers/actions/controlPcFooter";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { postWithDrawAction } from "./ProfilePaymentWithDrawAction";

import ProfilePaymentWithDraw from "./ProfilePaymentWithDrawRender";

const ProfilePaymentWithDrawStateToProps = (state) => {
  return {
    user: state.user,
    PCFooterStatus: state.pcFooter.show,
  };
};

const ProfilePaymentWithDrawDispatchToProps = (dispatch) => {
  return {
    setPcFooter: (boolean) => {
      dispatch(setPcFooter(boolean));
    },
    postWithDrawAction: (amount, QQAccount) => {
      dispatch(postWithDrawAction(amount, QQAccount));
    },
    goHistory: (route) => {
      dispatch(pushRoutes(route));
    },
  };
};

export default withRouter(
  connect(
    ProfilePaymentWithDrawStateToProps,
    ProfilePaymentWithDrawDispatchToProps
  )(ProfilePaymentWithDraw)
);
