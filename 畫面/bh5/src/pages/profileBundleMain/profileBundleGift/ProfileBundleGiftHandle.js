import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ProfileBundleGift from "./ProfileBundleGiftRender";

const ProfileBundleGiftStateToProps = (state) => {
  return {};
};

const ProfileBundleGiftDispathToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    ProfileBundleGiftStateToProps,
    ProfileBundleGiftDispathToProps
  )(ProfileBundleGift)
);
