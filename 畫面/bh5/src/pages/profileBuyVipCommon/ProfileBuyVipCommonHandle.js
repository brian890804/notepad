import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import callToast from "../../modules/toastCall";
import { pushRoutes } from "../../reducers/actions/historyActions";
import {
  buyVipMemberAction,
  exchangeVipCodeAction,
  setVipInfoAction,
} from "./ProfileBuyVipCommonAction";

import ProfileBuyVipCommon from "./ProfileBuyVipCommonRender";

const ProfileBuyVipCommonStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    vipInfoData: state.vipInfoData,
    containerRef: ownProps.containerRef,
  };
};

const ProfileBuyVipCommonDispatch = (dispatch) => {
  const intl = useIntl();
  return {
    setVipInfo: () => {
      dispatch(setVipInfoAction());
    },
    exchangeVipCode: (exchangeCode) => {
      if (exchangeCode.length === 0) {
        callToast(
          intl.formatMessage({ id: "TOAST.TIP.UNSUCCESS.UNACTIVIE_CODE" })
        );
      } else {
        dispatch(exchangeVipCodeAction(exchangeCode));
      }
    },
    buyVipMember: (vipInfo) => {
      dispatch(buyVipMemberAction(vipInfo,intl));
    },
    toBuyGoldPage: () => {
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profilePayment));
    },
  };
};

export default withRouter(
  connect(
    ProfileBuyVipCommonStateToProps,
    ProfileBuyVipCommonDispatch
  )(ProfileBuyVipCommon)
);
