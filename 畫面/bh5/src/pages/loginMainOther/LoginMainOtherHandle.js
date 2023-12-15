import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import { backRoutes, pushRoutes, replaceRoutes } from "../../reducers/actions/historyActions";
import { blockStateAction } from "../../reducers/actions/routesGuard";
import { userLoginAction } from "../../reducers/actions/user";

import store from "../../store";

import LoginMainOtherPage from "./LoginMainOtherRender";

const {login} = pageUrlConstants;

const LoginMainOtherStateToProps = (state) => {
  const type = state.router.location.pathname.split('/')[3];

  return {
    type,
    customerService: state.config.group_cs,
    blockIn: state.routesGuard.blockIn
  }
};

const LoginMainOtherDispatchToProps = (dispatch) => {
  return {
    userLogin: (data, callback) => {
      dispatch(userLoginAction(data, callback));
    },
    userLoginSuccess: () => {
      const breadcrumbsData = [...store.getState().breadcrumbs];
      breadcrumbsData.reverse();
      for(let i = 0 ; i < breadcrumbsData.length ; i++) {
        if(breadcrumbsData[i].path.indexOf("login") === -1) {
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
    }
  }
}

const LoginMainOtherHandle = connect( LoginMainOtherStateToProps, LoginMainOtherDispatchToProps )(LoginMainOtherPage);

export default withRouter(LoginMainOtherHandle);