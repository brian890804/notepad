import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserBuyAction } from "../ProfilePurchaseRecord";

import ProfilePurchaseRecordSocial from "./ProfilePurchaseRecordSocialRender";

const ProfilePurchaseRecordSocialStateToProps = (state, ownProps) => {
  return {
    type: "BO",
    dataList: [...state.myBuyList["BO"].list]
  }
};

const ProfilePurchaseRecordSocialDispatchToProps = (dispatch) => {
  return {
    getListData: (type, scrollColdEnd) => {
      dispatch(getUserBuyAction(type, scrollColdEnd));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordSocialStateToProps,
    ProfilePurchaseRecordSocialDispatchToProps
  )(ProfilePurchaseRecordSocial)
);
