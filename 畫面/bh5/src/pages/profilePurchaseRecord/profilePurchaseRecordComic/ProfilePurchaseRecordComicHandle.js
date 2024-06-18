import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserBuyAction } from "../ProfilePurchaseRecord";

import ProfilePurchaseRecordComic from "./ProfilePurchaseRecordComicRender";

const ProfilePurchaseRecordComicStateToProps = (state, ownProps) => {
  return {
    type: "BAC",
    dataList: [...state.myBuyList["BAC"].list]
  }
};

const ProfilePurchaseRecordComicDispatchToProps = (dispatch) => {
  return {
    getListData: (type, scrollColdEnd) => {
      dispatch(getUserBuyAction(type, scrollColdEnd));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordComicStateToProps,
    ProfilePurchaseRecordComicDispatchToProps
  )(ProfilePurchaseRecordComic)
);
