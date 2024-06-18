import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { padding, REG_SET, requestUrlConstants } from "../../constants";
import IconInput, { input_margin } from "../component/IconInputComponent";
import IconSelect from "../component/IconSelectComponent";
// import PropTypes from "prop-types";

import phoneIcon from "../../assets/icons/phone.png";
import shieldIcon from "../../assets/icons/shield.png";
import flagIcon from "../../assets/icons/flag.png";
import axiosRequest from "../../modules/axiosItem";
import toastCall from "../../modules/toastCall";

const { postGetVerify } = requestUrlConstants;

const { qqReg, emailReq, alphanumericReq } = REG_SET;

const LoginRecoverPasswordPage = ({
  stateAreaCode,
  initAreaCode,
  resetPassword,
}) => {
  const intl = useIntl();
  const loginTypeList = [
    {
      name: intl.formatMessage({ id: "REGISTER.GENERAL" }),
    },
    {
      name: intl.formatMessage({ id: "REGISTER.QQ" }),
    },
    {
      name: intl.formatMessage({ id: "REGISTER.MAIL" }),
    },
    {
      name: intl.formatMessage({ id: "REGISTER.PHONE" }),
    },
  ];
  const phoneNemberRef = useRef(null);
  const verifyRef = useRef(null);
  const qqAccRef = useRef(null);
  const emailRef = useRef(null);

  const [loginType, setLoginType] = useState(0);
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [generalAccount, setGeneralAccount] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");
  const [qqAcc, setQqAcc] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    initAreaCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function phoneNumberEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setPhoneNumber(e.target.value);
    if (key === 13) {
      verifyRef.current.focus();
    }
  }

  function qqAccEvent(e) {
    setQqAcc(e.target.value);
  }
  function emailEvent(e) {
    setEmail(e.target.value);
  }

  function verifyNumberEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setVerifyNumber(e.target.value);
    if (key === 13) {
      verifyRef.current.focus();
    }
  }

  function areaCodeEvent(e) {
    setAreaCode(e.target.dataset.value);
  }

  function getUserVerify() {
    if (areaCode && phoneNumber) {
      let formData = new FormData();
      formData.append("country_code", areaCode);
      formData.append("username", phoneNumber);
      axiosRequest
        .post(postGetVerify, formData)
        .then((data) => {})
        .catch((e) => {});
    } else {
      toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
    }
  }
  function accountEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setGeneralAccount(e.target.value);
    if (key === 13) {
      verifyRef.current.focus();
    }
  }
  return (
    <LoginRecoverPasswordPageElement>
      <div className="login_type">
        {loginTypeList.map((data, index) => (
          <div
            className={"login_type_box " + (index === loginType && "active")}
            onClick={() => {
              setLoginType(index);
            }}
            key={data.name}
          >
            {data.name}
          </div>
        ))}
        <div></div>
      </div>
      <form className="input_content">
        {loginType === 0 && (
          <>
            <div className="input_content_box">
              <IconInput
                className="input_content_box_input"
                value={generalAccount}
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
        {loginType === 1 && (
          <>
            <div className="input_content_box">
              <IconInput
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
        {loginType === 2 && (
          <>
            <div className="input_content_box">
              <IconInput
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
        {loginType === 3 && (
          <>
            <div className="input_content_box">
              <IconSelect
                className="input_content_box_input"
                icon={flagIcon}
                placeholder={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.SELECT_CODE",
                })}
                optionsPreFix="+"
                options={stateAreaCode}
                callback={areaCodeEvent}
                value={areaCode}
              />
            </div>
            <div className="input_content_box">
              <IconInput
                className="input_content_box_input"
                ref={phoneNemberRef}
                icon={phoneIcon}
                inputType="tel"
                value={phoneNumber}
                callback={phoneNumberEvent}
                placeholder={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.PHONE",
                })}
                enterKeyHint="next"
              />
            </div>
            <div className="input_content_box">
              <IconInput
                className="input_content_box_input"
                ref={verifyRef}
                icon={shieldIcon}
                inputType="number"
                value={verifyNumber}
                callback={verifyNumberEvent}
                placeholder={intl.formatMessage({
                  id: "LOGIN.PLACEHOLDER.INPUT.LETTER",
                })}
                enterKeyHint="done"
              />
              <div className="input_content_box_btn" onClick={getUserVerify}>
                <p className="input_content_box_btn_text">
                  {intl.formatMessage({ id: "LOGIN.PLACEHOLDER.GET.LETTER" })}
                </p>
              </div>
            </div>
          </>
        )}
      </form>
      <div
        className="input_submit"
        onClick={() => {
          switch (loginType) {
            case 0:
              if (generalAccount) {
                resetPassword({
                  username: generalAccount,
                  reg_type: ["fast", "qq", "email", "mobile"][loginType],
                });
              } else {
                toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
              }
              break;
            case 1:
              if (qqAcc) {
                resetPassword({
                  username: qqAcc,
                  reg_type: ["fast", "qq", "email", "mobile"][loginType],
                });
              } else {
                toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
              }
              break;
            case 2:
              if (email) {
                resetPassword({
                  username: email,
                  reg_type: ["fast", "qq", "email", "mobile"][loginType],
                });
              } else {
                toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
              }
              break;
            case 3:
              if (areaCode && phoneNumber && verifyNumber) {
                resetPassword(
                  {
                    country_code: areaCode,
                    username: phoneNumber,
                    sms_code: verifyNumber,
                    reg_type: ["fast", "qq", "email", "mobile"][loginType],
                  },
                  true
                );
              } else {
                toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
              }
              break;
            default:
              break;
          }
        }}
      >
        <p className="input_submit_text">
          {intl.formatMessage({ id: "LOGIN.REVISE" })}
        </p>
      </div>
    </LoginRecoverPasswordPageElement>
  );
};

LoginRecoverPasswordPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default LoginRecoverPasswordPage;

export const LoginRecoverPasswordPageElement = styled.div`
  /*  */
  padding: ${padding}px;

  .login_type {
    display: flex;
    margin-bottom: 10px;
    &_box {
      white-space: nowrap;
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
      height: 40px;

      &_input {
        width: 100%;
      }

      &_btn {
        cursor: pointer;
        flex-shrink: 0;
        margin-left: 10px;
        box-sizing: border-box;
        width: 125px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background-color: #f24c7c;
        border-radius: 4px;
      }
    }
  }

  .input_submit {
    cursor: pointer;
    margin-top: 20px;

    &_text {
      padding: 8px 0;
      width: 100%;
      text-align: center;
      color: #fff;
      background-color: #f24c7c;
      border-radius: 4px;
    }
  }
`;
