import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserBuyAction } from "../ProfilePurchaseRecord";

import ProfilePurchaseRecordPhoto from "./ProfilePurchaseRecordPhotoRender";

const ProfilePurchaseRecordPhotoStateToProps = (state, ownProps) => {
  return {
    type: "BT",
    dataList: [...state.myBuyList["BT"].list]
  }
};

const ProfilePurchaseRecordPhotoDispatchToProps = (dispatch) => {
  return {
    getListData: (type, scrollColdEnd) => {
      dispatch(getUserBuyAction(type, scrollColdEnd));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordPhotoStateToProps,
    ProfilePurchaseRecordPhotoDispatchToProps
  )(ProfilePurchaseRecordPhoto)
);
