import { useState, useRef, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { padding, pageUrlConstants, REG_SET } from "../../constants";

import IconInput, { input_margin } from "../component/IconInputComponent";

import lockIcon from "../../assets/icons/lock.png";

import LinkComponent from "../component/LinkComponent";
import toastCall from "../../modules/toastCall";
// import PropTypes from "prop-types";
import phoneIcon from "../../assets/login/icon-phone.svg";
import iconQq from "../../assets/login/icon-qq.svg";
import iconMail from "../../assets/login/icon-mail.svg";
import iconFb from "../../assets/login/icon-fb.svg";
import iconGoogle from "../../assets/login/icon-google.svg";
import iconTwitter from "../../assets/login/icon-twitter.svg";
import { userFBLoginOutAction } from "../../reducers/actions/user";
import { bottom_footer_height } from "../component/PCFooter";

const { home, login } = pageUrlConstants;
const { alphanumericReq } = REG_SET;

const LoginMainPage = ({
  customerService,
  userLogin,
  userFBLogin,
  userLoginSuccess,
  toSignup,
  blockIn,
  clickSkipBtn,
}) => {
  const intl = useIntl();

  const phoneNemberRef = useRef(null);
  const passwordRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    userFBLoginOutAction();
  }, []);
  function phoneNumberEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setPhoneNumber(e.target.value);
    if (key === 13) {
      passwordRef.current.focus();
    }
  }

  function passwordEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setPassword(e.target.value);
    if (key === 13) {
      userSumbit();
    }
  }

  function userSumbit() {
    if (phoneNumber && password) {
      if (alphanumericReq.test(phoneNumber)) {
        userLogin(
          {
            username: phoneNumber,
            passwd: password,
          },
          userLoginCheck
        );
      }
    } else {
      toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR" }));
    }
  }

  function userLoginCheck(code) {
    if (code) {
      userLoginSuccess();
    } else {
      setPhoneNumber("");
      setPassword("");
      phoneNemberRef.current.value = "";
      passwordRef.current.value = "";
      phoneNemberRef.current.focus();
    }
  }
  const loginOptions = [
    {
      type: "phone",
      icon: phoneIcon,
    },
    {
      type: "email",
      icon: iconMail,
    },
    {
      type: "qq",
      icon: iconQq,
    },
  ];
  const OtherLoginType = [
    // {
    //   type: "twitter",
    //   icon: iconTwitter,
    // },
    // {
    //   type: "google",
    //   icon: iconGoogle,
    // },
  ];
  const responseFacebook = useCallback((props) => {
    const { accessToken } = props;
    if (accessToken) {
      userFBLogin(props, userLoginCheck);
    }
  }, []);
  return (
    <LoginMainPageElement>
      <form className="input_content">
        <div className="input_content_box">
          <IconInput
            ref={phoneNemberRef}
            inputType="account"
            value={phoneNumber}
            callback={phoneNumberEvent}
            placeholder={intl.formatMessage({
              id: "LOGIN.PLACEHOLDER.ACCOUNT",
            })}
            enterKeyHint="next"
            reg={alphanumericReq}
            regErrStr={intl.formatMessage({ id: "LOGIN.TIP.ERROR.ACCOUNT" })}
          />
        </div>
        <div className="input_content_box">
          <IconInput
            ref={passwordRef}
            inputType="password"
            value={password}
            callback={passwordEvent}
            placeholder={intl.formatMessage({
              id: "LOGIN.PLACEHOLDER.PASSWORD",
            })}
            enterKeyHint="done"
          />
        </div>
        <div className="input_content_help">
          <LinkComponent
            className="input_content_help_link highlight"
            routes={login.pages.recoverPassword}
          >
            {intl.formatMessage({ id: "LOGIN.LABEL.FORGET_PASSWORD" })}
          </LinkComponent>
          <LinkComponent
            className="input_content_help_link"
            routes={{
              linkurl: customerService,
            }}
          >
            {intl.formatMessage({ id: "LOGIN.LABEL.CUSTOMER_SERVICE" })}
          </LinkComponent>
        </div>
      </form>
      <div className="button_container">
        <div className="button_container_btn highlight" onClick={userSumbit}>
          {intl.formatMessage({ id: "LOGIN.LABEL.GO_LOGIN" })}
        </div>
        <div className="other_container">
          <div className="other_container_title">
            <p className="other_container_title_text">
              {intl.formatMessage({ id: "LOGIN.LABEL.SELECT_LOGIN_MODE" })}
            </p>
          </div>
          <div className="other_container_buttons">
            {loginOptions.map((option) => (
              <div className="other_container_buttons_btn" key={option.title}>
                <div className="other_container_buttons_btn_content">
                  <LinkComponent
                    className="other_container_buttons_btn_content_link"
                    routes={{
                      name: login.pages.loginOhter.name + option.title,
                      path: login.pages.loginOhter.path,
                      dynamic: {
                        loginType: option.type,
                      },
                    }}
                  >
                    <div className="other_container_buttons_btn_content_link_icon">
                      <img
                        className="other_container_buttons_btn_content_link_icon_img"
                        src={option.icon}
                        alt={option.title}
                      />
                    </div>
                  </LinkComponent>
                </div>
              </div>
            ))}
            <FacebookLogin
              disableMobileRedirect={true}
              appId={process.env.REACT_APP_KEY_THIRD_LOGIN_FB}
              fields="name,email,picture"
              state="oauth"
              callback={responseFacebook}
              render={(renderProps) => (
                <div
                  className="other_container_buttons_btn cursor"
                  onClick={renderProps.onClick}
                >
                  <div className="other_container_buttons_btn_content">
                    <div className="other_container_buttons_btn_content_link">
                      <div className="other_container_buttons_btn_content_link_icon">
                        <img
                          className="other_container_buttons_btn_content_link_icon_img"
                          src={iconFb}
                          alt={"Fb Login"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div className="button_container_gap">
          <span className="button_container_gap_span">
            {intl.formatMessage({ id: "LOGIN.LABEL.NOT_HAVE_ACCOUNT" })}
          </span>
        </div>
        <div className="button_container_btn" onClick={toSignup}>
          {intl.formatMessage({ id: "LOGIN.LABEL.REGISTER" })}
        </div>
      </div>
    </LoginMainPageElement>
  );
};

LoginMainPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default LoginMainPage;

export const LoginMainPageElement = styled.div`
  /*  */
  padding: ${padding}px;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);

  .input_content {
    &_box {
      margin-bottom: ${input_margin}px;
      height: 40px;
      @media (min-width: 599px) {
        min-height: 60px;
      }
    }

    &_help {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      &_link {
        cursor: pointer;
        padding: 0 4px;
        font-size: 14px;
        text-decoration: none;
        color: #a8a8a8;
        @media (min-width: 599px) {
          font-size: 16px;
          padding-left: 1em;
        }
        &.highlight {
          color: #f24c7c;
        }
      }
    }
  }

  .button_container {
    margin-top: 25px;

    &_btn {
      cursor: pointer;
      padding: 8px 0;
      text-align: center;
      color: #f24c7c;
      background-color: #ffdde7;
      border-radius: 4px;
      font-weight: 600;
      @media (min-width: 899px) {
        font-size: 17px;
        padding: 0;
        min-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &.highlight {
        color: #fff;
        background-color: #f24c7c;
      }
    }

    &_gap {
      margin-top: 20px;
      margin-bottom: 5px;
      text-align: center;

      &_span {
        position: relative;
        display: inline-block;
        font-size: 12px;
        color: #646464;
        @media (min-width: 899px) {
          font-size: 14px;
          padding: 0 1em;
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 0.5px;
          background-color: #979797;
          @media (min-width: 899px) {
            width: 30px;
          }
        }

        &::before {
          left: -22px;
        }

        &::after {
          right: -22px;
        }
      }
    }
  }

  .other_container {
    margin-top: 20px;
    &_title {
      &_text {
        margin-bottom: 5px;
        font-size: 12px;
        color: #646464;
        font-weight: 500;
        text-align: center;
        @media (min-width: 899px) {
          font-size: 14px;
          padding: 0 1em;
        }
      }
    }

    &_buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      &_btn {
        &_content {
          padding: 10px;
          &_link {
            display: flex;
            border-radius: 35px;
            text-decoration: none;
            align-items: center;
            justify-content: space-evenly;
            &_icon {
              &_img {
                width: 30px;
                height: 30px;
                vertical-align: middle;
                @media (min-width: 599px) {
                  width: 40px;
                  height: 40px;
                }
              }
            }
          }
        }
      }
    }
  }
`;
