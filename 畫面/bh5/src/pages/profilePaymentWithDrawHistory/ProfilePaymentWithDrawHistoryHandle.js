import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getTransferHistory } from "./ProfilePaymentWithDrawHistoryAction";

import ProfilePaymentWithDrawHistoryRender from "./ProfilePaymentWithDrawHistoryRender";
const ProfilePaymentWithDrawHistoryStateToProps = (state) => {
  return { user: state.user, transferRule: state.getTransferMoney };
};

const ProfilePaymentWithDrawHistoryDispatchToProps = (dispatch) => {
  return {
    getTransferHistory: (props, set, scrollColdEnd) => {
      dispatch(getTransferHistory(props, set, scrollColdEnd));
    },
  };
};

export default withRouter(
  connect(
    ProfilePaymentWithDrawHistoryStateToProps,
    ProfilePaymentWithDrawHistoryDispatchToProps
  )(ProfilePaymentWithDrawHistoryRender)
);
