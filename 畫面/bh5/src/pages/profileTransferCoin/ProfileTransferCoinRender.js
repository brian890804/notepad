import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { styled as muiStyled } from "@mui/material/styles";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { useIntl } from "react-intl";
import { colors, pageUrlConstants } from "../../constants";
import transfer_bg from "../../assets/profile/transfer_bg.svg";
import { CardActionArea } from "@mui/material";
import coinIcon from "../../assets/profile/icon_coin.svg";
import Button from "@mui/lab/LoadingButton";
import useMediaSetting from "../../reackHook/useMediaSetting";
import callToast from "../../modules/toastCall";
import FloatTip from "../component/FloatTip";

const MuiButton = muiStyled((props) => <Button {...props} />)(
  ({ disabled }) => ({
    "&.MuiButton-root": {
      color: "#fff",
      borderRadius: 35,
      backgroundColor: disabled ? "#a8a8a8" : colors.back_dark_pink,
      width: "100%",
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: 0,
    },
  })
);

const { profile } = pageUrlConstants;
const ProfileTransferCoinRender = ({
  goHistory,
  user,
  getTransferMoneyRule,
  transferRule,
  postTransferMoney,
}) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  const [transferPrice, setTransferPrice] = useState();
  const [buttonStatus, setButtonStatus] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [floatTipStatus, setFloatTipStatus] = useState(false);
  const [Tips] = useState(() => ({
    Title: intl.formatMessage({ id: "PROFILE.TRANSFER.REDEEM.TITLE" }),
    Content: intl.formatMessage({ id: "PROFILE.TRANSFER.REDEEM.CONTENT" }),
    Button_t: intl.formatMessage({
      id: "PROFILE.TRANSFER.REDEEM.CONTINUE_REDEEM",
    }),
    Button_b: intl.formatMessage({ id: "PROFILE.TRANSFER.REDEEM.WATCH_NOW" }),
  }));
  const { money } = user;
  function onSelectPrice(diamond) {
    setTransferPrice(diamond);
  }
  function onTransferMoney() {
    if (transferPrice) {
      const nowRule = transferRule.find((data) => data.money === transferPrice);
      setButtonLoading(true);
      postTransferMoney(nowRule, (Boolean) => {
        if (Boolean) {
          setFloatTipStatus(true);
        }
        setButtonLoading(false);
      });
    } else {
      callToast("請先選擇一項將兌換的金幣數量");
    }
  }
  useEffect(() => {
    if (transferPrice > money) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  }, [transferPrice]);
  useEffect(() => {
    getTransferMoneyRule();
  }, []);
  const buttonContent = buttonStatus
    ? buttonLoading
      ? intl.formatMessage({ id: "PROFILE.BUY.LABEL.REDEEM_ING" })
      : intl.formatMessage({ id: "PROFILE.BUY.LABEL.REDEEM_NOW" })
    : intl.formatMessage({ id: "PROFILE.BUY.LABEL.IRREDEEMABLE" });
  return (
    <ProfileTransferCoinElement>
      <FloatTip
        status={floatTipStatus}
        setStatus={setFloatTipStatus}
        Tips={Tips}
      />
      {isMobile && (
        <TopBarContainer show_shadow={false}>
          <TopTitleBar
            title={intl.formatMessage({ id: "PROFILE.PAYMENT.TRANSFER.GOLD" })}
            showBack={true}
            show_back_color="#ffffff"
            onChildrenClick={() => goHistory(profile.pages.profileTransferRecord)}
          >
            {intl.formatMessage({ id: "PROFILE.PAYMENT.CHARGE.HISTORY_1" })}
          </TopTitleBar>
        </TopBarContainer>
      )}
      <div className="transfer_container_own_money_card">
        <div className="transfer_container_own_money_card_title">
          <div className="transfer_container_own_money_card_title_left">
            {intl.formatMessage({ id: "PROFILE.PAYMENT.CHARGE.OWN_MONEY" })}
          </div>
          <div className="transfer_container_own_money_card_title_right"></div>
        </div>
        <div className="transfer_container_own_money_content">{money}</div>
      </div>
      <div className="transfer_container">
        <div className="transfer_container_exchange_instructions">
          {intl.formatMessage({ id: "PROFILE.TRANSFER.EXCHANGE.CAPTIONS" })}
          <ol>
            <li>{intl.formatMessage({ id: "PROFILE.TRANSFER.CAPTIONS_1" })}</li>
            <li>{intl.formatMessage({ id: "PROFILE.TRANSFER.CAPTIONS_2" })}</li>
            <li>{intl.formatMessage({ id: "PROFILE.TRANSFER.CAPTIONS_3" })}</li>
          </ol>
        </div>
        <div className="transfer_container_exchange_items">
          {transferRule.map((data, key) => {
            return (
              <div className="transfer_container_exchange_item" key={key}>
                <CardActionArea onClick={() => onSelectPrice(data.money)}>
                  <div
                    className={`transfer_container_exchange_item_top ${
                      data.money === transferPrice && "active"
                    }`}
                  >
                    <div className="mb-2">
                      {intl.formatMessage({
                        id: "PROFILE.TRANSFER.REDEEM",
                      })}
                    </div>
                    <div className="transfer_container_exchange_item_top_description">
                      <img src={coinIcon} alt="coin" />
                      {data.transform_sign}
                      {intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })}
                    </div>
                  </div>
                  <div className="transfer_container_exchange_item_bottom">
                    <div className="transfer_container_exchange_item_bottom_tip">
                      {intl.formatMessage({ id: "PROFILE.TRANSFER.REDEEM" })}
                      {data.transform_sign}
                      {intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })}
                    </div>
                    <div className="transfer_container_exchange_item_bottom_description">
                      {intl.formatMessage({ id: "PROFILE.TRANSFER.DEDUCT" })}
                      {data.money}
                      {intl.formatMessage({ id: "GLOBAL.MONEY" })}
                    </div>
                  </div>
                </CardActionArea>
              </div>
            );
          })}
        </div>
        <div className="transfer_button">
          <MuiButton
            disabled={!buttonStatus}
            loading={buttonLoading}
            onClick={onTransferMoney}
            className="transfer_button_style"
          >
            {buttonContent}
          </MuiButton>
        </div>
      </div>
    </ProfileTransferCoinElement>
  );
};
export default ProfileTransferCoinRender;

export const ProfileTransferCoinElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  @media (min-width: 599px) {
    padding-top: 0px;
  }
  .transfer_container {
    padding: 3% 3% 15% 3%;
    @media (min-width: 599px) {
      padding: 3% 3% 30% 3%;
    }
    &_own_money {
      &_card {
        width: 100%;
        border-radius: 5px;
        background-image: url(${transfer_bg});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);

        &_title {
          display: flex;
          justify-content: space-between;
          padding: 5%;
          font-size: 1rem;
          align-self: center;
          font-weight: 700;
          @media (min-width: 599px) {
            font-size: 1.6rem;
          }
        }
      }
      &_content {
        font-size: 1.2rem;
        padding: 5%;
        @media (min-width: 599px) {
          font-size: 1.8rem;
        }
      }
    }
    &_exchange {
      &_instructions {
        margin: 2%;
        line-height: 1.3;
        ol {
          li {
            color: ${colors.text_grey};
            font-size: 0.9rem;
            @media (min-width: 599px) {
              font-size: 1.2rem;
            }
          }
        }
      }

      &_items {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-column-gap: 1em;
        grid-row-gap: 1em;
      }

      &_item {
        padding: 1%;
        &_top {
          text-align: center;
          background-color: #f3f4f5;
          radius: 5px;
          height: 12vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 1rem;
          border: solid 3px #f3f4f5;
          border-radius: 5px;
          &.active {
            border: solid 3px #f24c7c;
            border-radius: 5px;
          }
          @media (min-width: 599px) {
            font-size: 1.4rem;
          }
          &_description {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fac500;
            font-weight: 700;
            img {
              margin-right: 0.2em;
              width: 15px;
              height: 15px;
            }
          }
        }
        &_bottom {
          margin-top: 1em;
          &_tip {
            font-size: 1rem;
            @media (min-width: 599px) {
              font-size: 1.6rem;
            }
          }
          &_description {
            font-size: 0.8rem;
            color: ${colors.text_grey};
            @media (min-width: 599px) {
              font-size: 1.4rem;
            }
          }
        }
      }
    }
  }
  .transfer_button {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    @media (min-width: 599px) {
      width: 30%;
      left: 35%;
      position: absolute;
    }
    &_style {
      font-size: 1.2rem;
      @media (min-width: 599px) {
        font-size: 1.8rem;
      }
    }
  }
`;
