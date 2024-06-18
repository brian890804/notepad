import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addFeedbackAction } from "./ProfileFeedbackAction";

import ProfileFeedback from "./ProfileFeedbackRender";

const ProfileFeedbackStateToProps = (state) => {
  return {};
};

const ProfileFeedbackDispatch = (dispatch) => {
  return {
    addFeedback: (data, callback) => {
      dispatch(addFeedbackAction(data, callback));
    }
  };
};

export default withRouter(
  connect(ProfileFeedbackStateToProps, ProfileFeedbackDispatch)(ProfileFeedback)
);
