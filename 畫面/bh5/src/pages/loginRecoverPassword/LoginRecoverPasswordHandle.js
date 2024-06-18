import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { pageUrlConstants } from "../../constants";
import callToast from "../../modules/toastCall";
import { initAreaCode } from "../../reducers/actions/areaCode";
import { replaceRoutes } from "../../reducers/actions/historyActions";
import { verifyResetPassword, checkUsernameExist } from "./LoginRecoverPasswordAction";

import LoginRecoverPasswordPage from "./LoginRecoverPasswordRender";

const { login } = pageUrlConstants;

const LoginRecoverPasswordStateToProps = (state) => {
  return {
    stateAreaCode: state.areaCode
  }
};

const LoginRecoverPasswordDispatchToProps = (dispatch) => {
  return {
    initAreaCode: () => {
      dispatch(initAreaCode());
    },
    resetPassword: (data, needCheck = false) => {
      if(needCheck) {
        dispatch(verifyResetPassword(data, (check)=>{
          if(check) {
            dispatch({
              type: "STORE_TEMPORARYDATA",
              data
            })
            dispatch(replaceRoutes(login.pages.resetPassword));
          }
        }));
      } else {
        dispatch(checkUsernameExist(data, (check)=>{
          if(check) {
            dispatch({
              type: "STORE_TEMPORARYDATA",
              data
            })
            dispatch(replaceRoutes(login.pages.resetPassword));
          } else {
            callToast('亲～找不到喔');
          }
        }));
      }
    }
  }
}

const LoginRecoverPasswordHandle = connect( LoginRecoverPasswordStateToProps, LoginRecoverPasswordDispatchToProps )(LoginRecoverPasswordPage);

export default withRouter(LoginRecoverPasswordHandle);