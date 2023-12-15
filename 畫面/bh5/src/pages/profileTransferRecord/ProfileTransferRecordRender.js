import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { useIntl } from "react-intl";
import { colors } from "../../constants";
import coinIcon from "../../assets/profile/transfer_coin.svg";
import walletIcon from "../../assets/profile/transfer_wallet.svg";
import timeIcon from "../../assets/profile/transfer_time.svg";
import scrollBottomCallEvent from "../../modules/scrollEvent";

const ProfileTransferRecordRender = ({ getTransferHistory }) => {
  const intl = useIntl();
  const [dataItems, set] = useState([]);
  const mountRef = useRef(1);
  useEffect(() => {
    getTransferHistory({ page: mountRef.current, limit: 10 }, set);
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function scrollEvent() {
    if (!(dataItems.length < mountRef.current * 10)) {
      scrollBottomCallEvent((scrollColdEnd) => {
        mountRef.current += 1;
        getTransferHistory(
          { page: mountRef.current, limit: 10 },
          set,
          scrollColdEnd
        );
      });
    }
  }
  return (
    <ProfileTransferRecordElement>
      <TopBarContainer show_shadow={false}>
        <TopTitleBar
          title={intl.formatMessage({ id: "PROFILE.TRANSFER.REDEEM_RECORD" })}
          showBack={true}
          show_back_color="#ffffff"
        />
      </TopBarContainer>
      <div className="transfer_record_container">
        {dataItems?.map((data) => (
          <div className="transfer_record_card" key={data.create_time}>
            <div className="transfer_record_card_row">
              <div className="transfer_record_card_row_l">
                <img src={coinIcon} alt="coinIcon" className="mr-2" />
                兑换金币
              </div>
              <div className="transfer_record_card_row_r">
                {data.transform_sign}
              </div>
            </div>
            <div className="transfer_record_card_row">
              <div className="transfer_record_card_row_l">
                <img src={walletIcon} alt="walletIcon" className="mr-2" />
                扣除精钻
              </div>
              <div className="transfer_record_card_row_r">{data.money}</div>
            </div>
            <div className="transfer_record_card_row">
              <div className="transfer_record_card_row_l">
                <img src={timeIcon} alt="timeIcon" className="mr-2" />
                兑换时间
              </div>
              <div className="transfer_record_card_row_r">
                {data.create_time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileTransferRecordElement>
  );
};
export default ProfileTransferRecordRender;

export const ProfileTransferRecordElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  background-color: ${colors.back_grey};
  .transfer_record {
    &_container {
      position: relative;
      background-color: ${colors.back_grey};
    }
    &_card {
      height: 20vh;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1%;
      margin-bottom: 0.5em;
      &_row {
        display: flex;
        justify-content: space-between;
        padding: 1% 0%;
        font-size: 1.4rem;
        padding-bottom: 0px;
        &:first-child {
          border-bottom: solid 1px ${colors.text_light_grey};
          padding-bottom: 1%;
          .transfer_record_card_row_r {
            color: ${colors.back_dark_pink};
          }
        }
        & > div {
          display: flex;
          align-items: center;
          color: ${colors.text_light_grey};
        }
      }
    }
  }
`;
