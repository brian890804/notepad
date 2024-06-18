import { connect } from "react-redux";
import { withRouter } from "react-router";
import { pageUrlConstants } from "../../constants";
import { replaceRoutes } from "../../reducers/actions/historyActions";

import ProfileMyCollect from "./ProfileMyCollectRender";

const { profile } = pageUrlConstants;

const ProfileMyCollectStateToProps = (state, ownProps) => {
  return {
    routes: ownProps.routes
  }
}

const ProfileMyCollectDispatchToProps = (dispatch) => {
  return {
    clickTabLabel: (key) => {
      let upCass = key.slice(0, 1);
      upCass = upCass.toUpperCase();
      dispatch(replaceRoutes(profile.pages.profileMyCollect.pages["profileMyCollect" + upCass + key.slice(1)]));
    }
  }
}


export default withRouter(connect(ProfileMyCollectStateToProps, ProfileMyCollectDispatchToProps)(ProfileMyCollect));