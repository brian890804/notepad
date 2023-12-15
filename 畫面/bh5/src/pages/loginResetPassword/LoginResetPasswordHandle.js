import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../../store";
import { toResetPassword } from "./LoginResetPasswordAction";
import { pageUrlConstants } from "../../constants";

import LoginResetPasswordPage from "./LoginResetPasswordRender";
import toastCall from "../../modules/toastCall";

import { backRoutes, replaceRoutes } from "../../reducers/actions/historyActions";

const { login } = pageUrlConstants;
const LoginResetPasswordStateToProps = (state) => {
  return {
    user: state.user
  }
};

const LoginResetPasswordDispatchToProps = (dispatch) => {
  return {
    resetPasswordSubmit: (data) => {
      const user = store.getState().user;
      const temporaryData = user.temporaryData;
      let dataQuery = {
        username: user.username || temporaryData.username,
        password: data.password
      }
      if(user.id !== "guest") {
        dataQuery.old_password = data.old_password;
      }
      dispatch(toResetPassword(dataQuery, (check=> {
        if(check) {
          if(user.id === "guest") {
            dispatch(replaceRoutes(login));
          } else {
            dispatch(backRoutes());
          }
          toastCall("请牢记您的新密码!请退出账号再重新登陆防止忘记哦~~！！");
        }
      })))
    }
  }
}

const LoginResetPasswordHandle = connect( LoginResetPasswordStateToProps, LoginResetPasswordDispatchToProps )(LoginResetPasswordPage);

export default withRouter(LoginResetPasswordHandle);