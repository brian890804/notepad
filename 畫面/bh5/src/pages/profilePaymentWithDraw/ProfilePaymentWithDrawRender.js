import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { useLocation } from "react-router";

import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { colors, pageUrlConstants, REG_SET } from "../../constants";
import purseIcon from "../../assets/profile/purse.png";
import backgroundImg from "../../assets/profile/with_draw_bg.png";
import WavaButton from "../component/WavaButton";
import callToast from "../../modules/toastCall";
import useMediaSetting from "../../reackHook/useMediaSetting";
import LinkComponent from "../component/LinkComponent";
import { nullableTypeAnnotation } from "@babel/types";

const { qqReg } = REG_SET;
const { profile } = pageUrlConstants;
const ProfilePaymentWithDraw = ({
  user,
  setPcFooter,
  PCFooterStatus,
  postWithDrawAction,
  goHistory,
}) => {
  const intl = useIntl();
  const countRef = useRef();
  const { isMobile } = useMediaSetting();
  const [regErr, setRegErr] = useState(false);
  const [amount, setAmount] = useState(null);
  const [qqAcc, setQqAcc] = useState();
  const location = useLocation();

  useEffect(() => {
    setPcFooter(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, PCFooterStatus]);

  function qqAccEvent(e) {
    var key = window.event ? e.keyCode : e.which;
    setQqAcc(e.target.value);
    if (key === 13) {
      onSubmit();
    }
  }

  function onSubmit() {
    if (qqReg.test(qqAcc)) {
      if (amount % 10 !== 0) {
        callToast("提领金额必须是10的倍数");
      } else {
        postWithDrawAction(amount, qqAcc);
        goHistory({
          name: pageUrlConstants.profile.pages.profilePaymentWithDrawHistory
            .name,
          path: pageUrlConstants.profile.pages.profilePaymentWithDrawHistory
            .path,
          dynamic: {
            type: "submit",
          },
        });
      }
    }
  }
  function inputRegEvent(e) {
    if (qqReg && !qqReg.test(qqAcc)) {
      setRegErr(true);
    } else {
      setRegErr(false);
    }
  }

  function add() {
    if (amount < 100) {
      setAmount(100);
    }
    clearInterval(countRef.current);
    countRef.current = setInterval(() => {
      if ((amount < 10000 && amount >= 0) || amount === null) {
        setAmount((pre) => {
          if (pre >= 10000) {
            return 10000;
          } else if (pre % 10 !== 0) {
            return pre - (pre % 10);
          } else {
            return (pre += 10);
          }
        });
      }
    }, 50);
  }

  function reduce() {
    if (amount <= 100) {
      setAmount(100);
    } else {
      clearInterval(countRef.current);
      countRef.current = setInterval(() => {
        if (amount <= 10000 && amount >= 100) {
          setAmount((pre) => {
            if (pre <= 0 && pre !== null) {
              return 0;
            } else if (pre % 10 !== 0) {
              return pre - (pre % 10);
            } else if (pre > 100) {
              return (pre -= 10);
            } else {
              return 100;
            }
          });
        }
      }, 50);
    }
  }
  function mouseUp() {
    clearInterval(countRef.current);
  }
  return (
    <ProfilePaymentWithDrawElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({
            id: "PROFILE.PAYMENT.TRANSFER.WITH_DRAW",
          })}
          showBack={true}
          show_back_color="#ffffff"
        >
          <LinkComponent
            className="profile_with_draw_history"
            routes={{
              name: pageUrlConstants.profile.pages.profilePaymentWithDrawHistory
                .name,
              path: pageUrlConstants.profile.pages.profilePaymentWithDrawHistory
                .path,
            }}
          >
            {intl.formatMessage({
              id: "PROFILE.PAYMENT.CHARGE.HISTORY_1",
            })}
          </LinkComponent>
        </TopTitleBar>
      </TopBarContainer>

      <ProfilePaymentWithDrawTopElement>
        <div className="profile_with_draw_bg img_container">
          <img src={backgroundImg} alt="profile_with_draw_bg" />
        </div>
        <div className="profile_with_draw_container">
          <div className="profile_with_draw_purse img_container">
            <img src={purseIcon} alt="profile_with_draw_purse" />
          </div>
          <div className="profile_with_draw_information">
            <div className="profile_with_draw_information_top">
              {parseInt(user.money) - amount}
            </div>
            <div className="profile_with_draw_information_bottom">
              (
              {intl.formatMessage({
                id: "PROFILE.PAYMENT",
              })}
              )
            </div>
          </div>
        </div>
      </ProfilePaymentWithDrawTopElement>

      <ProfilePaymentWithDrawBottomElement
        buttonStatus={
          parseInt(user.money) - amount >= 0 &&
          amount !== null &&
          amount >= 100 &&
          qqReg.test(qqAcc)
        }
      >
        <div className="profile_with_draw_bottom_container">
          <div className="profile_with_draw_item">
            <div className="profile_with_draw_item_top">
              {intl.formatMessage({
                id: "PROFILE.WITH_DRAW.APPLY",
              })}
            </div>
            <div className="profile_with_draw_item_bottom amount">
              <button
                className="profile_with_draw_item_bottom_amount_control"
                onMouseDown={reduce}
                onMouseUp={mouseUp}
                onTouchStart={reduce}
                onTouchEnd={mouseUp}
                onMouseLeave={mouseUp}
              >
                –
              </button>
              <input
                className="profile_with_draw_item_bottom_amount"
                min={100}
                step={10}
                max={10000}
                type={isMobile ? "tel" : "number"}
                placeholder={intl.formatMessage({
                  id: "PROFILE.WITH_DRAW.APPLY_MONEY",
                })}
                value={amount}
                onBlur={(e) =>
                  setAmount(e.target.value - (e.target.value % 10))
                }
                onChange={(e) => {
                  if (e.target.value > 10000) {
                    setAmount(10000);
                  } else if (e.target.value < 0 && e.target.value !== null) {
                    setAmount(0);
                  } else if (!e.target.value) {
                    setAmount(null);
                  } else {
                    setAmount(parseInt(e.target.value));
                  }
                }}
              />
              <button
                className="profile_with_draw_item_bottom_amount_control"
                onMouseUp={mouseUp}
                onMouseDown={add}
                onTouchStart={add}
                onTouchEnd={mouseUp}
                onMouseLeave={mouseUp}
              >
                +
              </button>
              <span
                className="with_draw_tip"
                onClick={() => {
                  setAmount(parseInt(user.money - (user.money % 10)));
                }}
              >
                {intl.formatMessage({
                  id: "PROFILE.WITH_DRAW.APPLY.ALL_MONEY",
                })}
              </span>
            </div>
          </div>

          <div className="profile_with_draw_item">
            <div className="profile_with_draw_item_top">
              {intl.formatMessage({
                id: "SOCIAL.DETAIL.INFO.LABEL.CONTACT_DETAILS",
              })}
            </div>
            <div className="profile_with_draw_item_bottom">
              <input
                step={0}
                type={isMobile ? "tel" : "number"}
                placeholder={intl.formatMessage({ id: "LOGIN.PLACEHOLDER.QQ" })}
                onKeyDown={qqAccEvent}
                onChange={qqAccEvent}
                onBlur={inputRegEvent}
                enterKeyHint="send"
                value={qqAcc}
              />
              {regErr && (
                <span className="error">
                  {intl.formatMessage({ id: "LOGIN.TIP.ERROR.QQ" })}
                </span>
              )}
            </div>
          </div>

          <div className="profile_with_draw_detail">
            <ol>
              <li className="title">规格说明</li>
              <li>1.最低提领申请金额为100精钻(1精钻=1RMB)</li>
              <li>2.申请完成后将有专人与您联系，大约等待1-2个工作天</li>
              <li>
                3.提领金额以10的倍数为准，若有填写个位数金额将替用户做四捨五入处理，也能使用「-」「+」符号增减提领金额
              </li>
              <li>
                4.平台将收取出金通道费10%(例：提现金额100精钻x0.9=实际到帐金额90精钻)
              </li>
            </ol>
          </div>
        </div>
        <div onClick={parseInt(user.money) - amount >= 100 ? onSubmit : ""}>
          <WavaButton className="footer_bottom">
            <p className="footer_bottom_wava">确认</p>
          </WavaButton>
        </div>
      </ProfilePaymentWithDrawBottomElement>
    </ProfilePaymentWithDrawElement>
  );
};

export default ProfilePaymentWithDraw;

const ProfilePaymentWithDrawElement = styled.article`
  /*  */
  background: #f3f4f5;
  .profile_with_draw_history {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
  }
`;

const ProfilePaymentWithDrawTopElement = styled.section`
  /*  */
  padding-top: ${main_height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #fff;
  margin-bottom: 0.5rem;

  .profile_with_draw {
    &_container {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-width: 100px;
    }

    &_information {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &_top {
        color: ${colors.back_dark_pink};
        font-size: 30px;
        font-weight: bold;
      }

      &_bottom {
        position: relative;
        color: ${colors.text_grey};
        font-size: 16px;
      }
    }

    &_purse {
      padding-bottom: 130%;
      width: 130%;
      @media (max-width: 899px) {
        padding-bottom: 100%;
        width: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &_bg {
      padding-bottom: 16%;
      width: 35%;
      @media (max-width: 899px) {
        padding-bottom: 55%;
        width: 100%;
      }
    }
  }
`;

const ProfilePaymentWithDrawBottomElement = styled.section`
  /*  */
  background: #fff;
  position: relative;
  .profile_with_draw {
    &_bottom_container {
      display: flex;
      flex-direction: column;
      position: relative;
      background: #fff;
      padding: 20px 15px;
      gap: 10px;
    }
    &_item {
      display: flex;
      flex-direction: column;
      padding-bottom: 5px;
      gap: 10px;
      &_top {
        color: black;
        font-size: 20px;
      }
      &_bottom {
        position: relative;
        display: flex;
        align-items: center;
        &.amount {
          @media (max-width: 899px) {
            border-bottom: 2px solid ${colors.text_light_grey};
          }
        }
        input {
          color: ${colors.text_grey};
          padding: 10px 0;
          width: 100%;
          font-size: 16px;
          border: none;
          border-radius: 0;
          border-bottom: 2px solid ${colors.text_light_grey};
          outline: name;
          &:focus {
            outline: none;
            border-bottom: 2px solid ${colors.text_light_grey};
          }
        }
        &_amount {
          @media (max-width: 899px) {
            width: 40% !important;
            border-bottom: 0 !important;
            text-align: center;
          }
          &_control {
            display: none;
            @media (max-width: 899px) {
              color: black;
              user-select: none;
              display: block;
              font-size: 30px;
              font-weight: 600;
              border: none;
              background: transparent;
            }
          }
        }
      }
    }
    &_detail {
      margin-bottom: 10em;
      li {
        font-size: 16px;
        &.title {
          color: ${colors.text_grey};
        }
        color: ${colors.text_light_grey};
      }
    }
  }
  .footer {
    &_bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      cursor: ${({ buttonStatus }) => (buttonStatus ? "pointer" : "default")};
      width: 100%;
      text-decoration: none;
      color: #fff;
      background-color: ${({ buttonStatus }) =>
        buttonStatus ? colors.back_dark_pink : "gray"};
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      &_wava {
        padding: 20px 0;
        @media (max-width: 899px) {
          padding: 10px 0;
        }
      }
    }
  }
  .with_draw_tip {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 25px;
    font-weight: 700;
    color: #39b3fd;
    font-size: 18px;
    cursor: pointer;
    @media (max-width: 899px) {
      right: 0px;
    }
  }
  .error {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 25px;
    font-weight: 700;
    color: #f00;
    font-size: 14px;
    @media (max-width: 899px) {
      right: 0px;
    }
  }
`;
