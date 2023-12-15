import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { buyVipMemberAction, setVipInfoAction } from "../profileBuyVipCommon/ProfileBuyVipCommonAction";

import ProfileBuyVipSex from "./ProfileBuyVipSexRender";

const ProfileBuyVipSexStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    vipInfoData: state.vipInfoData,
  }
}

const ProfileBuyVipSexDispatch = (dispatch) => {
  return {
    setVipInfo: () => {
      dispatch(setVipInfoAction());
    },
    buyVipMember: (vipInfo) => {
      dispatch(buyVipMemberAction(vipInfo));
    },
    toBuyGoldPage: () => {
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profilePayment))
    }
  }
}

export default withRouter(connect(ProfileBuyVipSexStateToProps, ProfileBuyVipSexDispatch)(ProfileBuyVipSex));
