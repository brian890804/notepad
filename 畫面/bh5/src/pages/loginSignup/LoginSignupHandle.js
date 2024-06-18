import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getEmailVerifyCode,
  signupUser,
  postVerifyEmailCodeAction,
  postCheckUserEmailAction,
} from "./LoginSignupAction";

import loginSignupPage from "./LoginSignupRender";
import { pageUrlConstants } from "../../constants";
import {
  backRoutes,
  replaceRoutes,
} from "../../reducers/actions/historyActions";

import store from "../../store";
import { userLoginAction } from "../../reducers/actions/user";
import { toggleMentionAppCoverAction } from "../../reducers/actions/showCoverCenter";
import { utmTrack, checkDataExpired } from "../../reducers/actions/utilities";
import { handleRegisterAccount } from "../../modules/gtmEventHandle";

const { home } = pageUrlConstants;

const loginSignupStateToProps = (state) => {
  const { is_mobile_reg, is_email_reg, is_qq_reg } = state.config;
  const showSignupType = [is_qq_reg, is_mobile_reg, is_email_reg];
  // const showSignupType = [1,1,1];
  let defaultSignType = showSignupType.length - 1;
  for (let i = 0; i < showSignupType.length; i++) {
    if (showSignupType[i]) {
      defaultSignType = i;
      break;
    }
  }

  return {
    defaultSignType,
    showSignupType: showSignupType,
    stateAreaCode: state.areaCode,
  };
};

const loginSignupDispatchToProps = (dispatch) => {
  return {
    userSignup: (data, callback) => {
      const utm_source = localStorage.getItem("origin");
      let shareMa = undefined;
      let utc_data = localStorage.getItem("utmMark")
        ? JSON.parse(localStorage.getItem("utmMark"))
        : "";
      if (utc_data && utc_data.shareMa) {
        shareMa = utc_data.shareMa;
      }
      dispatch(
        signupUser(
          {
            ...data,
            deviceModel: "H5",
            type: "H5",
            share_ma: shareMa,
            utm_source: utm_source,
            dianka: undefined,
            // 下面是要判斷用來 CTA 的先不處理
            // share_ma:
            // utm_source: null
          },
          (check) => {
            if (check) {
              dispatch(
                userLoginAction(
                  {
                    username: data.name,
                    passwd: data.password,
                    deviceModel: "h5",
                  },
                  callback
                )
              );
              dispatch(replaceRoutes(home.pages.homeMain));
              handleRegisterAccount();
              dispatch(toggleMentionAppCoverAction(true));
              if (
                !checkDataExpired("urlParameterTimestamp", 1000 * 60 * 60 * 24)
              ) {
                utmTrack();
              }
            } else {
              callback(check);
            }
          }
        )
      );
    },
    signupUserSuccess: () => {
      const breadcrumbsData = [...store.getState().breadcrumbs];
      breadcrumbsData.reverse();
      for (let i = 0; i < breadcrumbsData.length; i++) {
        if (breadcrumbsData[i].path.indexOf("login") === -1) {
          dispatch(replaceRoutes(breadcrumbsData[i]));
          return;
        }
      }
      dispatch(backRoutes(-2));
    },
    getEmailVerify: (email) => {
      dispatch(getEmailVerifyCode(email));
    },
    emailCodeVerify: (data, callback) => {
      dispatch(postVerifyEmailCodeAction(data, callback));
    },
    checkEmailUnique: (email, callback) => {
      dispatch(postCheckUserEmailAction(email, callback));
    },
    
  };
};

const loginSignupHandle = connect(
  loginSignupStateToProps,
  loginSignupDispatchToProps
)(loginSignupPage);

export default withRouter(loginSignupHandle);
