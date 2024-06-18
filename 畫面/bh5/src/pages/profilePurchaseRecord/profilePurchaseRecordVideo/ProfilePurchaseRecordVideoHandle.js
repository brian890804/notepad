import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserBuyAction } from "../ProfilePurchaseRecord";

import ProfilePurchaseRecordVideo from "./ProfilePurchaseRecordVideoRender";

const ProfilePurchaseRecordVideoStateToProps = (state, ownProps) => {
  return {
    type: "BV",
    dataList: [...state.myBuyList["BV"].list]
  }
};

const ProfilePurchaseRecordVideoDispatchToProps = (dispatch) => {
  return {
    getListData: (type, scrollColdEnd) => {
      dispatch(getUserBuyAction(type, scrollColdEnd));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordVideoStateToProps,
    ProfilePurchaseRecordVideoDispatchToProps
  )(ProfilePurchaseRecordVideo)
);
