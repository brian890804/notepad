import { connect } from "react-redux";
import { withRouter } from "react-router";

import ProfilePaymentRecord from "./ProfilePaymentRecordRender";

const ProfilePaymentRecordStateToProps = (state) => {
  return {
    user: state.user
  };
};

const ProfilePaymentRecordDispatchToProps = (dispatch) => {
  return {
  };
};

export default withRouter(
  connect(
    ProfilePaymentRecordStateToProps,
    ProfilePaymentRecordDispatchToProps
  )(ProfilePaymentRecord)
);
