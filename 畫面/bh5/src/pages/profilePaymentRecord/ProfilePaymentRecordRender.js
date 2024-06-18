import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import axiosRequest from "../../modules/axiosItem";
import { colors, requestUrlConstants } from "../../constants";

const ProfilePaymentRecord = ({ user }) => {
  const intl = useIntl();
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    // username
    axiosRequest
      .get(requestUrlConstants.getBuyGoldMoneyPaymentUrl, {
        username: user.username,
      })
      .then((data) => {
        setRecordList(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfilePaymentRecordElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.PAYMENT.CHARGE.HISTORY" })}
          showBack={true}
          show_back_color="#ffffff"
        />
      </TopBarContainer>
      <div className="payment_warning fw-m">
        {intl.formatMessage({
          id: "PROFILE.PAYMENT.CHARGE.UNSUCCESS.DESCRIPTION",
        })}
      </div>
      <div className="payment_container">
        <div className="payment_container_row fw-m">
          <div className="payment_container_row_col title">
            {intl.formatMessage({ id: "PROFILE.PAYMENT.LABEL.TIME" })}
          </div>
          <div className="payment_container_row_col title">
            {intl.formatMessage({ id: "PROFILE.PAYMENT.LABEL.CHARGE.MODE" })}
          </div>
          <div className="payment_container_row_col title">
            {intl.formatMessage({ id: "PROFILE.PAYMENT.LABEL.CHARGE.TYPE" })}
          </div>
          <div className="payment_container_row_col title">
            {intl.formatMessage({ id: "PROFILE.PAYMENT.LABEL.CHARGE.AMOUNT" })}
          </div>
          <div className="payment_container_row_col title">
            {intl.formatMessage({
              id: "PROFILE.PAYMENT.LABEL.TIME.ORDER.STATUS",
            })}
          </div>
        </div>
        {recordList.map((data) => {
          return (
            <div className="payment_container_row" key={data.id}>
              <div className="payment_container_row_col">
                {new Date(data.ctime * 1000).toLocaleDateString()}
              </div>
              <div className="payment_container_row_col">{data.way}</div>
              <div className="payment_container_row_col">{data.item_type}</div>
              <div className="payment_container_row_col">{data.num}</div>
              <div className="payment_container_row_col">
                {data.status === 0
                  ? intl.formatMessage({ id: "GLOBAL.STATUS.PENDING" })
                  : data.status === 1
                    ? intl.formatMessage({ id: "GLOBAL.STATUS.PASS" })
                    : intl.formatMessage({ id: "GLOBAL.STATUS.REJECT" })}
              </div>
            </div>
          );
        })}
      </div>
    </ProfilePaymentRecordElement>
  );
};

export default ProfilePaymentRecord;

export const ProfilePaymentRecordElement = styled.div`
  /*  */
  padding-top: ${main_height}px;

  .payment_warning {
    padding: 1.5% 0;
    text-align: center;
    font-size: 20px;
    border-bottom: 2px solid ${colors.back_grey};
    background-color: ${colors.light_pink};
  }

  .payment_container {
    &_row {
      display: flex;
      border-bottom: 1px solid #aaa;

      &:last-child {
        border-bottom: none;
      }

      &_col {
        flex-grow: 1;
        padding: 1.5% 0;
        width: 0;
        font-size: 12px;
        text-align: center;

        &.title{
          font-size:20px;
          padding:2% 0;
        }
      }
    }
  }
 
`;
