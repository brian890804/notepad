import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { dailyLoginAction } from "../profileMain/ProfileMainAction";

import ProfileMission from "./ProfileMissionRender";

const ProfileMissionStateToProps = (state) => {
  return {
    config: state.config
  };
};

const ProfileMissionDispatchToProps = (dispatch) => {
  const intl = useIntl();
  return {
    dailyEvent: () => {
      dispatch(dailyLoginAction(intl));
    },
    gosharef: () => {
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profileShare));
    }
  };
};

export default withRouter(
  connect(
    ProfileMissionStateToProps,
    ProfileMissionDispatchToProps
  )(ProfileMission)
);
