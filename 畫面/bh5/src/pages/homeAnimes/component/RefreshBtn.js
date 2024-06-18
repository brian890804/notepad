import React from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../constants";

const RefreshBtn = () => {
  const intl = useIntl();
  return (
    <RefreshBtnElement>
      <div className="refresh_btn">
        <p className="refresh_btn_text">
          {intl.formatMessage({ id: "GLOBAL.REFRESH" })}
          <span className="refresh_btn_text_icon">
            <FontAwesomeIcon
              className="refresh_btn_text_icon_img"
              icon={faRedo}
            />
          </span>
        </p>
      </div>
    </RefreshBtnElement>
  );
};

export default RefreshBtn;

export const RefreshBtnElement = styled.div`
  /*  */
  .refresh {
    &_btn {
      cursor: pointer;
      padding: 5px;
      border: 1px solid ${colors.dark_pink};
      border-radius: 5px;

      &_text {
        text-align: center;
        color: ${colors.dark_pink};
        font-weight: 900;

        &_icon {
          margin-left: 6px;
          vertical-align: middle;

          &_img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }
      }
    }
  }
`;
