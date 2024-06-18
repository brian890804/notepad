import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserBuyAction } from "../ProfilePurchaseRecord";

import ProfilePurchaseRecordNovel from "./ProfilePurchaseRecordNovelRender";

const ProfilePurchaseRecordNovelStateToProps = (state, ownProps) => {
  return {
    type: "BX",
    dataList: [...state.myBuyList["BX"].list]
  }
};

const ProfilePurchaseRecordNovelDispatchToProps = (dispatch) => {
  return {
    getListData: (type, scrollColdEnd) => {
      dispatch(getUserBuyAction(type, scrollColdEnd));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordNovelStateToProps,
    ProfilePurchaseRecordNovelDispatchToProps
  )(ProfilePurchaseRecordNovel)
);
