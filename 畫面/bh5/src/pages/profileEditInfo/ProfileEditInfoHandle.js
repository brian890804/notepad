import { connect } from "react-redux";
import { withRouter } from "react-router";
import { backRoutes } from "../../reducers/actions/historyActions";
import {
  userFBLoginOutAction,
  userLoginOutAction,
} from "../../reducers/actions/user";
import { initPostData } from "../postsMain/PostMainAction";
import { clearVipInfoAction } from "../profileBuyVipCommon/ProfileBuyVipCommonAction";
import {
  editUserDataAction,
  updateUserAvatarAction,
} from "./ProfileEditInfoAction";

import ProfileEditInfo from "./ProfileEditInfoRender";

const ProfileEditInfoStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const ProfileEditInfoDispatchToProps = (dispatch) => {
  return {
    clearUserData: () => {
      dispatch(userLoginOutAction());
      dispatch(clearVipInfoAction());
      dispatch(backRoutes());
      dispatch(userFBLoginOutAction());
      dispatch(initPostData());
    },
    updateUserAvatar: (fileData) => {
      dispatch(updateUserAvatarAction(fileData));
    },
    editUserData: (data) => {
      dispatch(editUserDataAction(data));
    },
  };
};

export default withRouter(
  connect(
    ProfileEditInfoStateToProps,
    ProfileEditInfoDispatchToProps
  )(ProfileEditInfo)
);
