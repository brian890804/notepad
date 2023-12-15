import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { buyVipMemberAction, setVipInfoAction } from "../profileBuyVipCommon/ProfileBuyVipCommonAction";

import ProfileBuyVipVideo from "./profileBuyVipVideoRender";

const ProfileBuyVipVideoStateToProps = (state, ownProps) => {

  return {
    user: state.user,
    vipInfoData: state.vipInfoData,
  }
}

const ProfileBuyVipVideoDispatch = (dispatch) => {
  const intl = useIntl();
  return {
    setVipInfo: () => {
      dispatch(setVipInfoAction());
    },
    buyVipMember: (vipInfo) => {
      dispatch(buyVipMemberAction(vipInfo,intl));
    },
    toBuyGoldPage: () => {
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profilePayment))
    }
  }
}

export default withRouter(connect(ProfileBuyVipVideoStateToProps, ProfileBuyVipVideoDispatch)(ProfileBuyVipVideo));
