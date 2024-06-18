import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import { connect } from "react-redux";

import outQuotaGirl from "../../assets/outOfQuota/outQuotaGirl.png";
import outQuotaBg from "../../assets/outOfQuota/outQuotaBg.jpg";
import outQuotaText from "../../assets/outOfQuota/outQuotaText.svg";
import { CSSTransition } from "react-transition-group";
import CloseComponent, { CloseComponentElement } from "./CloseComponent";
import { buyContentAction, closeOutOfQuotaPortalAction } from "../../reducers/actions/outOfQuotaData";
import { colors, padding, pageUrlConstants } from "../../constants";
import { pushRoutes } from "../../reducers/actions/historyActions";

let typeStr = ['小说'];

const OutOfQuotaPortal = ({
  userGold,
  gold,
  buy_type,
  buyContent,
  closeOutOfQuotaPortal,
  toBuyVipPage,
  toBuyGoldPage
}) => {

  const [ showBuyBoard, setShowBuyBoard] = useState(false);

  return (
    <OutOfQuotaPortalElement>
      <CSSTransition
        timeout={200}
        in={!showBuyBoard}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_show_cover"
      >
        <div className="show">
          <div className="show_container">
            <div className="show_container_cover">
              <img className="show_container_cover_girl" src={outQuotaGirl} alt="Girl"/>
              <img className="show_container_cover_bg" src={outQuotaBg} alt="Bg"/>
            </div>

            <div className="show_container_content">
              <div className="show_container_content_description">
                <img className="show_container_content_description_title" src={outQuotaText} alt="Text"/>
                <p className="show_container_content_description_text">升级VIP，取得无限观看次数</p>
              </div>
              <div className="show_container_content_button">
                <div 
                  className="show_container_content_button_btn"
                  onClick={()=>setShowBuyBoard(true)}
                >金币支付</div>
                <div 
                  className="show_container_content_button_btn highlight"
                  onClick={()=>toBuyVipPage(buy_type)}
                >升级VIP</div>
              </div>
              <CloseComponent
                callback={closeOutOfQuotaPortal}
                styleType={1}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={200}
        in={showBuyBoard}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_buy_cover"
      >
        <div 
          className="buy"
        >
          <div className="buy_content">
            <div className="buy_content_card">
              <div className="buy_content_card_title">
                <p className="buy_content_card_title_text">解锁新内容</p>
                <CloseComponent
                  callback={closeOutOfQuotaPortal}
                  styleType={2}
                />
              </div>
              <div className="buy_content_card_description">
                <p className="buy_content_card_description_title">
                  此{typeStr[buy_type]}需要付费才可继续观看
                </p>
                <p className="buy_content_card_description_text">
                  金额：{gold} 金币
                </p>
              </div>
              <div className="buy_content_card_button">
                <div 
                  className="buy_content_card_button_btn"
                  onClick={closeOutOfQuotaPortal}
                >
                  <span className="buy_content_card_button_btn_text">
                    再想想
                  </span>
                </div>
                <div 
                  className="buy_content_card_button_btn highLight"
                  onClick={buyContent}
                >
                  <span className="buy_content_card_button_btn_text">
                    立即解锁
                  </span>
                </div>
              </div>
            </div>
            <div className="buy_content_recharge">
              <div className="buy_content_recharge_gold">
                <p className="buy_content_recharge_gold_text">
                  当前拥有：<span className="buy_content_recharge_gold_text_span">{userGold}</span> 金币
                </p>
              </div>
              <div 
                className="buy_content_recharge_btn"
                onClick={toBuyGoldPage}
              >
                <p className="buy_content_recharge_btn_text">
                  前往充值
                </p>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </OutOfQuotaPortalElement>
  )
}

const OutOfQuotaPortalStateOfProps = (state) => {
  return {
    userGold: state.user.sign,
    buy_type: state.outOfQuotaData.buy_type,
    gold: state.outOfQuotaData.gold,
    episode: state.outOfQuotaData.episode,
  }
}

const OutOfQuotaPortalDispatchToProps = (dispatch) => {
  return {
    closeOutOfQuotaPortal: () =>{
      dispatch(closeOutOfQuotaPortalAction());
    },
    buyContent: () => {
      dispatch(buyContentAction());
    },
    toBuyVipPage: (buy_type) => {
      dispatch({
        type: "CLOSE_OUTOFQUOTAPORTAL"
      });

      const url = [
        pageUrlConstants.profile.pages.profileBuyVip.pages.profileBuyVipCommon,
        // pageUrlConstants.profile.pages.profileBuyVip.pages.profileBuyVipSex,
        pageUrlConstants.profile.pages.profileBuyVip.pages.profileBuyVipVideo
      ];
      
      dispatch(pushRoutes(url[buy_type === 4 ? 1: 0]));
    },
    toBuyGoldPage: () => {
      dispatch({
        type: "CLOSE_OUTOFQUOTAPORTAL"
      });
      dispatch(pushRoutes(pageUrlConstants.profile.pages.profilePayment));
    }
  }
}


export default connect(OutOfQuotaPortalStateOfProps, OutOfQuotaPortalDispatchToProps)(OutOfQuotaPortal);

export const OutOfQuotaPortalElement = styled.div`/*  */
position: relative;
z-index: 20;


.show,
.buy {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #000a;
}

.show {

  ${CloseComponentElement} {
    position: absolute;
    bottom: -90px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
  }

  &_container {
    position: relative;
    justify-content: center;
    align-items: center;
    width: 60%;
    @media (min-width:599px){
      max-width: 400px;
    }
    &_cover {
      position: relative;
      
      &_girl,
      &_bg {
        overflow: hidden;
        vertical-align: middle;
        border-radius: 10px;
      }

      &_girl {
        position: absolute;
        bottom: 0;
        width: 100%;
      }

      &_bg {
        width: 100%;
      }
    }

    &_content {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      padding-bottom: 40px;

      &_description {
        text-align: center;

        &_title {
          width: 80%;
        }

        &_text {
          font-size: 12px;
          color: #fff;
        }
      }

      &_button {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateY(50%);
        display: flex;
        justify-content: space-evenly;

        &_btn {
          cursor: pointer;
          padding: 10px 0;
          width: 100px;
          font-size: 16px;
          text-align: center;
          color: #f24c7c;
          background-color: white;
          border-radius: 10px;

          &.highlight {
            color: #885f2c;
            background-image: linear-gradient(to right, #efd7ad 0%, #daad75 100%);
          }
        }
      }
    }
  }
}

.buy {
  &_content {
    margin-top: auto;
    width: 100%;
    background-color: #fff;
    border-radius: 20px 20px 0 0;

    &_card {
      padding: ${padding}px ${padding}px 0;

      &_title {
        display: flex;
        justify-content: space-between;

        &_text {
          font-size: 30px;
          font-weight: 900;
          color: #646464;
        }
        ${CloseComponentElement} {
          position: relative;
          width: 30px;
          height: 30px;
        }
      }

      &_description {
        font-size: 20px;
        font-weight: 700;
        text-align: center;

        &_title {
          margin-top: 20px;
        }

        &_text {
          margin-top: 20px;
          color: ${ colors.dark_pink };
        }
      }

      &_button {
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;

        &_btn {
          cursor: pointer;
          padding: 10px 20px;
          text-align: center;
          border: 2px solid #a8a8a8;
          border-radius: 10px;

          &_text {
            font-size: 20px;
            font-weight: 700;
            color: ${ colors.dark_pink };
          }

          &.highLight {
            background-image: linear-gradient(to top, ${ colors.dark_pink } 0%, #fa83b3 100%);
            border: none;

            .buy_content_card_button_btn_text {
              color: #fff;
            }
          }
        }
      }
    }

    &_recharge {
      display: flex;
      margin-top: 20px;
      font-size: 20px;
      flex-wrap: 900;

      &_gold {
        flex-grow: 1;
        padding: 10px 0;
        text-align: center;
        background-color: ${ colors.back_grey };

        &_text {
          color: #646464;

          &_span {
            color: #000;
          }
        }
      }

      &_btn {
        flex-grow: 1;
        text-align:center;
        cursor: pointer;
        padding: 10px;
        background-color: #1a2950;

        &_text {
          color: #fff;
        }
      }
    }
  }
}


`;