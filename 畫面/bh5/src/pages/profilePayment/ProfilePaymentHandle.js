import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pushRoutes } from "../../reducers/actions/historyActions";

import ProfilePayment from "./ProfilePaymentRender";

const ProfilePaymentStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const ProfilePaymentDispatchToProps = (dispatch) => {
  return {
    goHistory: (route) => {
      dispatch(pushRoutes(route));
    },
  };
};

export default withRouter(
  connect(
    ProfilePaymentStateToProps,
    ProfilePaymentDispatchToProps
  )(ProfilePayment)
);
