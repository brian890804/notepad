import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import { toggleMentionAppCoverAction } from "../../reducers/actions/showCoverCenter";
import { updateUserDataAction } from "../../reducers/actions/user";
import store from "../../store";
import { dailyLoginAction } from "./ProfileMainAction";

import ProfileMain from "./ProfileMainRender";

const ProfileMainStateToProps = (state) => {
  return {
    user: state.user,
    config: state.config,
    group_cs: state.config ? state.config.group_cs : "",
  };
};

const ProfileMainDispatch = (dispatch) => {
  const intl = useIntl();
  return {
    updataUser: () => {
      dispatch(updateUserDataAction());
    },
    dailyLogin: () => {
      if (store.getState().user.id === "guest") {
        dispatch(pushRoutes(pageUrlConstants.login));
      } else {
        dispatch(dailyLoginAction(intl));
      }
    },
    pushRoutes: (routes) => {
      dispatch(pushRoutes(routes));
    },
    showMentionAppCover: () => {
      dispatch(toggleMentionAppCoverAction(true));
    },
    dailyEvent: () => {
      dispatch(dailyLoginAction(intl));
    },
    gosharef: () => {
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profileShare));
    },
  };
};

export default withRouter(
  connect(ProfileMainStateToProps, ProfileMainDispatch)(ProfileMain)
);
