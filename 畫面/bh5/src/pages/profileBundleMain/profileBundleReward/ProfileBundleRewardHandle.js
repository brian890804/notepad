import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ProfileBundleReward from "./ProfileBundleRewardRender";

const ProfileBundleRewardStateToProps = (state) => {
  return {};
};

const ProfileBundleRewardDispathToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    ProfileBundleRewardStateToProps,
    ProfileBundleRewardDispathToProps
  )(ProfileBundleReward)
);
