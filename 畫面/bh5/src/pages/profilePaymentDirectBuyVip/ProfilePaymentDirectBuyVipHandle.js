import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pushRoutes } from "../../reducers/actions/historyActions";

import ProfilePayment from "./ProfilePaymentDirectBuyVipRender";
import {
  postDirectPurchase,
  postDirectPurchaseList,
} from "./ProfilePaymentDirectBuyVipAction";

const ProfilePaymentStateToProps = (state) => {
  console.log(state.profileDirectBuy, "state.profileDirectBuy");
  return {
    pay_channel_list: state.profileDirectBuy.pay_channel_list,
    item_list: state.profileDirectBuy.item_list,
    user: state.user,
  };
};

const ProfilePaymentDispatchToProps = (dispatch) => {
  return {
    goHistory: (route) => {
      dispatch(pushRoutes(route));
    },
    getDirectPurchaseList: () => {
      dispatch(postDirectPurchaseList());
    },
    getDirectPurchase: (data, callback = () => {}) => {
      dispatch(postDirectPurchase(data, callback));
    },
  };
};

export default withRouter(
  connect(
    ProfilePaymentStateToProps,
    ProfilePaymentDispatchToProps
  )(ProfilePayment)
);
