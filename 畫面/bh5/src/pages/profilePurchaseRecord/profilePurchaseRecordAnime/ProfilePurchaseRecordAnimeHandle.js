import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUserBuyAction } from "../ProfilePurchaseRecord";

import ProfilePurchaseRecordAnime from "./ProfilePurchaseRecordAnimeRender";

const ProfilePurchaseRecordAnimeStateToProps = (state, ownProps) => {
  return {
    type: "BAV",
    dataList: [...state.myBuyList["BAV"].list]
  }
};

const ProfilePurchaseRecordAnimeDispatchToProps = (dispatch) => {
  return {
    getListData: (type) => {
      dispatch(getUserBuyAction(type));
    }
  };
};

export default withRouter(
  connect(
    ProfilePurchaseRecordAnimeStateToProps,
    ProfilePurchaseRecordAnimeDispatchToProps
  )(ProfilePurchaseRecordAnime)
);
