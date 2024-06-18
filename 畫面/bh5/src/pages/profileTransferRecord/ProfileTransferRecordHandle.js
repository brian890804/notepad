import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getTransferHistory,
} from "./ProfileTransferRecordAction";

import ProfileTransferRecordRender from "./ProfileTransferRecordRender";
const ProfileTransferRecordStateToProps = (state) => {
  return { user: state.user, transferRule: state.getTransferMoney };
};

const ProfileTransferRecordDispatchToProps = (dispatch) => {
  return {
    getTransferHistory: (props,set,scrollColdEnd) => {
      dispatch(getTransferHistory(props,set,scrollColdEnd));
    },
   
  };
};

export default withRouter(
  connect(
    ProfileTransferRecordStateToProps,
    ProfileTransferRecordDispatchToProps
  )(ProfileTransferRecordRender)
);
