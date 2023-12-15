import { useState, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { padding } from "../../constants";
// import PropTypes from "prop-types";

import toastCall from "../../modules/toastCall";

import IconInput, { input_margin } from "../component/IconInputComponent";
import lockIcon from "../../assets/icons/lock.png";

const LoginResetPasswordPage = ({ user, resetPasswordSubmit }) => {
  const intl = useIntl();
  const oldPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function oldPasswordEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setOldPassword(e.target.value);
    if (key === 13) {
      passwordRef.current.focus();
    }
  }

  function passwordEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setPassword(e.target.value);
    if (key === 13) {
      newPasswordRef.current.focus();
    }
  }
  function newPasswordEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setNewPassword(e.target.value);
    if (key === 13) {
      submitPassword();
    }
  }

  function submitPassword() {
    if (password && newPassword) {
      if (password === newPassword) {
        let data = {
          password: password,
        };
        if (user.id !== "guest") {
          data.old_password = oldPassword;
        }
        resetPasswordSubmit(data);
      } else {
        toastCall(intl.formatMessage({ id: "LOGIN.TIP.NOREPEAT.PASSWORD" }));
      }
    } else {
      toastCall(intl.formatMessage({ id: "LOGIN.TIP.ERROR.MUST" }));
    }
  }

  return (
    <LoginResetPasswordPageElement>
      <form className="input_content">
        {user.id !== "guest" ? (
          <div className="input_content_box">
            <IconInput
              className="input_content_box_input"
              ref={oldPasswordRef}
              icon={lockIcon}
              inputType="text"
              value={oldPassword}
              callback={oldPasswordEvent}
              placeholder={intl.formatMessage({
                id: "LOGIN.PLACEHOLDER.AGAIN_PASSWORD",
              })}
              enterKeyHint="next"
            />
          </div>
        ) : (
          ""
        )}
        <div className="input_content_box">
          <IconInput
            className="input_content_box_input"
            ref={passwordRef}
            icon={lockIcon}
            inputType="text"
            value={password}
            callback={passwordEvent}
            placeholder={intl.formatMessage({
              id: "LOGIN.PLACEHOLDER.NEW_PASSWORD",
            })}
            enterKeyHint="next"
          />
        </div>
        <div className="input_content_box">
          <IconInput
            className="input_content_box_input"
            ref={newPasswordRef}
            icon={lockIcon}
            inputType="text"
            value={newPassword}
            callback={newPasswordEvent}
            placeholder={intl.formatMessage({
              id: "LOGIN.PLACEHOLDER.AGAIN_PASSWORD",
            })}
            enterKeyHint="done"
          />
        </div>
      </form>
      <div className="input_submit" onClick={submitPassword}>
        <p className="input_submit_text">
          {intl.formatMessage({ id: "LOGIN.RESET.PASSWORD" })}
        </p>
      </div>
    </LoginResetPasswordPageElement>
  );
};

LoginResetPasswordPage.propTypes = {
  // newNotice: PropTypes.number.isRequired,
  // clickSerch: PropTypes.func.isRequired,
  // clickAvatar: PropTypes.func.isRequired,
  // clickNew: PropTypes.func.isRequired,
};

export default LoginResetPasswordPage;

export const LoginResetPasswordPageElement = styled.div`
  /*  */
  padding: ${padding}px;

  .input_content {
    &_box {
      display: flex;
      margin-bottom: ${input_margin}px;
      height: 40px;

      &_input {
        width: 100%;
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
