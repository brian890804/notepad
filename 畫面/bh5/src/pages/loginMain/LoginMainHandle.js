import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import {
  backRoutes,
  pushRoutes,
  replaceRoutes,
} from "../../reducers/actions/historyActions";
import { blockStateAction } from "../../reducers/actions/routesGuard";
import {
  userFBLoginAction,
  userLoginAction,
} from "../../reducers/actions/user";

import store from "../../store";

import LoginMainsPage from "./LoginMainRender";

const { login } = pageUrlConstants;

const LoginMainsStateToProps = (state) => {
  return {
    customerService: state.config.group_cs,
    blockIn: state.routesGuard.blockIn,
  };
};

const LoginMainsDispatchToProps = (dispatch) => {
  return {
    userLogin: (data, callback) => {
      dispatch(userLoginAction(data, callback));
    },
    userFBLogin: (props, callback) => {
      dispatch(userFBLoginAction(props, callback));
    },
    userLoginSuccess: () => {
      const breadcrumbsData = [...store.getState().breadcrumbs];
      breadcrumbsData.reverse();
      for (let i = 0; i < breadcrumbsData.length; i++) {
        if (breadcrumbsData[i].path.indexOf("login") === -1) {
          dispatch(replaceRoutes(breadcrumbsData[i]));
          return;
        }
      }
      dispatch(backRoutes());
    },
    toSignup: () => {
      dispatch(pushRoutes(login.pages.signup));
    },
    clickSkipBtn: () => {
      dispatch(blockStateAction(false));
    },
  };
};

const LoginMainsHandle = connect(
  LoginMainsStateToProps,
  LoginMainsDispatchToProps
)(LoginMainsPage);

export default withRouter(LoginMainsHandle);
