import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";
import store from "../../store";
import { postBindEmailAction, postBindInviteAction } from "./ProfileSetInfoAction";

import ProfileSetInfo from "./ProfileSetInfoRender";


const { login } = pageUrlConstants;

const ProfileSetInfoStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes,
  };
};

const ProfileSetInfoDispatchToProps = (dispatch) => {
  const intl = useIntl();
  return {
    postBindInvite: (parentid) => {
      if(store.getState().user.id === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postBindInviteAction(parentid,intl));
      }
    },
    postBindEmail: (email) => {
      if(store.getState().user.id === "guest") {
        dispatch(pushRoutes(login));
      } else {
        dispatch(postBindEmailAction(email,intl));
      }
    }
  };
};

export default withRouter(
  connect(ProfileSetInfoStateToProps, ProfileSetInfoDispatchToProps)(ProfileSetInfo)
);
