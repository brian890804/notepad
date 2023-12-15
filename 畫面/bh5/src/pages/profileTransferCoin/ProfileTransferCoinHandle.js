import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { getTransferMoneyRule, postTransferMoney } from "./ProfileTransferCoinAction";

import ProfileTransferCoinRender from "./ProfileTransferCoinRender";
const ProfileTransferCoinStateToProps = (state) => {
  return { user: state.user, transferRule: state.getTransferMoney };
};

const ProfileTransferCoinDispatchToProps = (dispatch) => {
  return {
    goHistory: (route) => {
      dispatch(pushRoutes(route));
    },
    getTransferMoneyRule: () => {
      dispatch(getTransferMoneyRule());
    },
    postTransferMoney:(rule,callback)=>{
      dispatch(postTransferMoney(rule,callback))
    }
  };
};

export default withRouter(
  connect(
    ProfileTransferCoinStateToProps,
    ProfileTransferCoinDispatchToProps
  )(ProfileTransferCoinRender)
);
