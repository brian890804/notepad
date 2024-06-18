import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ProfileBundleCoupon from "./ProfileBundleCouponRender";

const ProfileBundleCouponStateToProps = (state) => {
  return {
    user: state.user
  };
};

const ProfileBundleCouponDispathToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    ProfileBundleCouponStateToProps,
    ProfileBundleCouponDispathToProps
  )(ProfileBundleCoupon)
);
