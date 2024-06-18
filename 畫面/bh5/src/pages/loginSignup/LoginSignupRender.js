import { useState, useRef, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled";
import { colors, padding, REG_SET } from "../../constants";

// import PropTypes from "prop-types";

import IconInput, { input_margin } from "../component/IconInputComponent";

import toastCall from "../../modules/toastCall";
import { callCaptcha, CALL_CAPTCHA_TYPE } from "../../utils/callCaptcha";
import WavaButton from "../component/WavaButton";

const { qqReg, emailReq, emailVerifyReq, alphanumericReq } = REG_SET;

let captcha = {};
let interval = "";
const LoginSignupPage = ({
  userSignup,
  signupUserSuccess,
  showSignupType,
  defaultSignType,
  getEmailVerify,
  emailCodeVerify,
  checkEmailUnique,
}) => {
  const intl = useIntl();
  const [loginType, setLoginType] = useState(defaultSignType);
  const accountRef = useRef(null);
  const qqAccRef = useRef(null);
  const emailRef = useRef(null);
  const emailVerifyRef = useRef(null);
  const passwordRef = useRef(null);

  const [account, setAccount] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [verifyTimer, setVerifyTimer] = useState(0);
  const [qqAcc, setQqAcc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginTypeList = [
    {
      name: intl.formatMessage({ id: "REGISTER.QQ" }),
    },
    {
      name: intl.formatMessage({ id: "REGISTER.GENERAL" }),
    },
    {
      name: intl.formatMessage({ id: "REGISTER.MAIL" }),
    },
  ];
  function emailVerifyEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setEmailVerify(e.target.value);
    if (key === 13) {
      signupUserSubmit();
    }
  }

  function accountEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setAccount(e.target.value);
    if (key === 13) {
      passwordRef.current.focus();
    }
  }
  function qqAccEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setQqAcc(e.target.value);
    if (key === 13) {
      passwordRef.current.focus();
    }
  }
  function emailEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setEmail(e.target.value);
    if (key === 13) {
      passwordRef.current.focus();
    }
  }
  function passwordEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setPassword(e.target.value);
    if (key === 13) {
      signupUserSubmit();
    }
  }

  function signupUserSubmit() {
    switch (loginType) {
      case 0:
        if (qqAcc && password) {
          if (qqReg.test(qqAcc)) {
            callCaptcha(CALL_CAPTCHA_TYPE.REGISTER, (validate) => {
              userSignup(
                {
                  qq: qqAcc,
                  name: qqAcc,
                  password: password,
                  reg_type: ["qq", "mobile", "email"][loginType],
                  ...validate,
                },
                signupCheck
              );
            });
          }
        } else {
          toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
        }

        break;
      case 1:
        if (account && password) {
          if (alphanumericReq.test(account)) {
            callCaptcha(CALL_CAPTCHA_TYPE.REGISTER, (validate) => {
              userSignup(
                {
                  name: account,
                  password: password,
                  reg_type: ["qq", "email", "mobile", "fast"][3],
                  ...validate,
                },
                signupCheck
              );
            });
          }
        } else {
          toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
        }
        break;
      case 2:
        if (email && password) {
          if (emailReq.test(email)) {
            callCaptcha(CALL_CAPTCHA_TYPE.REGISTER, (validate) => {
              checkEmailUnique(email, (request) => request && setLoginType(3));
              captcha = validate;
            });
          }
        } else {
          toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
        }
        break;
      case 3:
        if (emailVerify && password && emailVerifyReq.test(emailVerify)) {
          emailCodeVerify({ email, code: emailVerify }, (callback) => {
            if (callback) {
              userSignup(
                {
                  email,
                  name: email,
                  password: password,
                  reg_type: ["qq", "mobile", "email"][2],
                  ...captcha,
                },
                signupCheck
              );
            }
          });
        }
        break;
      default:
        break;
    }
  }

  function signupCheck(code) {
    if (code) {
      signupUserSuccess();
      setAccount("");
      setPassword("");
      accountRef.current.value = "";
      passwordRef.current.value = "";
      accountRef.current.focus();
    }
  }
  useEffect(() => {
    if (verifyTimer === 60) {
      clearInterval(interval);
      interval = setInterval(() => {
        if (verifyTimer > 0) setVerifyTimer((pre) => pre - 1);
      }, 1000);
    } else {
    }
  }, [verifyTimer]);

  function getEmailVerifyCode() {
    if (verifyTimer === 0) {
      setVerifyTimer(60);
      getEmailVerify(email);
    }
  }
  return (
    <LoginSignupPageElement>
      <div id="aaaa" />
      <div className="login_type">
        {loginType !== 3 &&
          loginTypeList.map(
            (data, index) =>
              !!showSignupType[index] && (
                <div
                  className={
                    "login_type_box " + (index === loginType && "active")
                  }
                  onClick={() => {
                    setLoginType(index);
                  }}
                  key={data.name}
                >
                  {data.name}
                </div>
              )
          )}
      </div>
      <form className="input_content">
        {loginType === 2 && (
          <>
            <div className="input_content_box">
              <IconInput
                required
                className="input_content_box_input"
                ref={emailRef}
                inputType="email"
                value={email}
                callback={emailEvent}
                placeholder={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.MAIL",
                })}
                enterKeyHint="next"
                reg={emailReq}
                regErrStr={intl.formatMessage({ id: "LOGIN.TIP.ERROR.MAIL" })}
              />
            </div>
          </>
        )}
        {loginType === 0 && (
          <>
            <div className="input_content_box">
              <IconInput
                required
                className="input_content_box_input"
                ref={qqAccRef}
                inputType="number"
                value={qqAcc}
                callback={qqAccEvent}
                placeholder={intl.formatMessage({ id: "LOGIN.PLACEHOLDER.QQ" })}
                enterKeyHint="next"
                reg={qqReg}
                regErrStr={intl.formatMessage({ id: "LOGIN.TIP.ERROR.QQ" })}
              />
            </div>
          </>
        )}
        {loginType === 1 && (
          <>
            <div className="input_content_box">
              <IconInput
                required
                className="input_content_box_input"
                ref={accountRef}
                value={account}
                callback={accountEvent}
                placeholder={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.ACCOUNT",
                })}
                enterKeyHint="next"
                reg={alphanumericReq}
                regErrStr={intl.formatMessage({
                  id: "LOGIN.TIP.ERROR.ACCOUNT",
                })}
              />
            </div>
          </>
        )}
        {loginType === 3 && (
          <>
            <div className="input_content_box">
              <IconInput
                className="input_content_box_input"
                ref={emailVerifyRef}
                value={emailVerify}
                type="number"
                callback={emailVerifyEvent}
                placeholder={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.MAIL_VERIFY",
                })}
                enterKeyHint="done"
                reg={emailVerifyReq}
                regErrStr={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.MAIL_VERIFY.TIP",
                })}
                required
              />
              <div onClick={getEmailVerifyCode}>
                <WavaButton
                  className={`input_content_box_btn ${
                    verifyTimer > 0 && "disabled"
                  }`}
                >
                  {verifyTimer > 0
                    ? verifyTimer +
                      intl.formatMessage({
                        id: "LOGIN.LABEL.AFTER_SECOND_SENT",
                      })
                    : intl.formatMessage({
                        id: "LOGIN.PLACEHOLDER.GET.LETTER",
                      })}
                </WavaButton>
              </div>
            </div>
            <div className="input_content_box"></div>
          </>
        )}
        {loginType !== 3 && (
          <>
            <div className="input_content_box">
              <IconInput
                required
                className="input_content_box_input"
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
          </>
        )}
      </form>
      <div className="input_submit" onClick={signupUserSubmit}>
        <p
          className={`input_submit_text ${
            loginType === 3 && emailVerify === "" && "disabled"
          }`}
        >
          {loginType !== 3 || emailVerify !== ""
            ? intl.formatMessage({ id: "LOGIN.LABEL.REGISTER" })
            : intl.formatMessage({ id: "LOGIN.LABEL.WRITE_VERITY_CODE" })}
        </p>
      </div>
    </LoginSignupPageElement>
  );
};

LoginSignupPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default LoginSignupPage;

export const LoginSignupPageElement = styled.div`
  /*  */
  padding: ${padding}px;

  .login_type {
    display: flex;
    margin-bottom: 10px;
    &_box {
      cursor: pointer;
      font-size: 12px;
      margin-right: 5px;
      padding: 4px 10px;
      border-radius: 6px;
      border: solid 1px #fa719a;
      color: #fa719a;
      &.active {
        color: #fff;
        background-color: #f24c7c;
      }
    }
  }

  .input_content {
    &_box {
      display: flex;
      margin-bottom: ${input_margin}px;
      height: 60px;
      @media (max-width: 899px) {
        height: 40px;
      }
      &_input {
        width: 100%;
      }
      &_btn {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-shrink: 0;
        flex-grow: 1;
        margin-left: 10px;
        box-sizing: border-box;
        min-width: 300px;
        height: 100%;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background-color: #f24c7c;
        border-radius: 4px;
        place-content: center;
        @media (max-width: 899px) {
          min-width: 100px;
          font-size: 14px;
        }
        &.disabled {
          color: #fff;
          background-color: ${colors.text_light_grey};
        }
      }
    }
  }

  .input_submit {
    cursor: pointer;
    margin-top: 6rem;

    &_text {
      padding: 16px 0;
      font-size: 18px;
      width: 100%;
      text-align: center;
      color: #fff;
      background-color: #f24c7c;
      border-radius: 4px;
      font-weight: 700;
      &.disabled {
        background-color: #d8d8d8;
        color: ${colors.text_grey};
      }
      @media (max-width: 899px) {
        padding: 10px 0;
        font-size: 14px;
      }
    }
  }
`;
