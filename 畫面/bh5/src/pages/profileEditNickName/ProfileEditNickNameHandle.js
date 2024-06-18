import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  editUserDataAction,
  updateUserAvatarAction,
} from "./ProfileEditNickNameAction";

import ProfileEditNickName from "./ProfileEditNickNameRender";
import { pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";

const ProfileEditInfoStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const ProfileEditInfoDispatchToProps = (dispatch) => {
  return {
    updateUserAvatar: (fileData) => {
      dispatch(updateUserAvatarAction(fileData));
    },
    editUserData: (data, callback) => {
      dispatch(editUserDataAction(data, callback));
    },
    editSuccesssToProile: () => {
      dispatch(pushRoutes(pageUrlConstants.profile));
    },
  };
};

export default withRouter(
  connect(
    ProfileEditInfoStateToProps,
    ProfileEditInfoDispatchToProps
  )(ProfileEditNickName)
);
