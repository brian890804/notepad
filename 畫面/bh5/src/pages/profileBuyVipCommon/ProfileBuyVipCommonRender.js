import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import ImageComponent from "../component/ImageComponent";
import { colors, padding } from "../../constants";

import diamondIcon from "../../assets/profile/diamond.svg";
import crownIcon from "../../assets/icons/crown.png";
import exclamationIcon from "../../assets/profile/exclamation.png";

import freeIcon from "../../assets/profile/buyvip_free.svg";
import infiniteIcon from "../../assets/profile/buyvip_infinite.svg";
import serverIcon from "../../assets/profile/buyvip_server.svg";
import cardIcon from "../../assets/profile/buyvip_card.svg";

const ProfileBuyVipCommon = ({
  user,
  vipInfoData,
  setVipInfo,
  exchangeVipCode,
  buyVipMember,
  toBuyGoldPage,
}) => {
  const intl = useIntl();

  const [selectOption, setSelectOption] = useState(0);

  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (!vipInfoData.vip) {
      setVipInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function buyMemberEvent() {
    if (parseInt(user.money) >= vipInfoData.vip[selectOption].pay_price) {
      buyVipMember(vipInfoData.vip[selectOption]);
    } else {
      toBuyGoldPage();
    }
  }

  return (
    <ProfileBuyVipCommonElement>
      <div className="container">
        <div className="container_header">
          <div className="container_header_info">
            <div className="container_header_info_avatar">
              <ImageComponent
                is_cover={true}
                src={user.avatar}
                background_color="transparent"
                placeholderImg={user.avatar}
                border_radius="50%"
              />
            </div>
            <div className="container_header_info_detail">
              <div className="container_header_info_detail_title">
                <p className="container_header_info_detail_title_text">
                  {intl.formatMessage({ id: "PROFILE.BUY.RESPECT" })}：
                  {user.nick_name ? user.nick_name : user.username}
                </p>
                {user.time === "-1" || Date.now() < user.time * 1000 ? (
                  <span className="container_header_info_detail_title_text_hight">
                    {user.time === "-1"
                      ? intl.formatMessage({
                          id: "PROFILE.BUY.WATCH.FOREVER",
                        })
                      : intl.formatMessage({ id: "PROFILE.BUY.WATCH.LIMIT" })}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="container_header_info_detail_time">
                <p className="container_header_info_detail_time_text">
                  {user.time === "-1"
                    ? intl.formatMessage({ id: "PROFILE.BUY.WATCH.FOREVER_1" })
                    : Date.now() < user.time * 1000
                    ? intl.formatMessage({ id: "PROFILE.BUY.LABEL.WILL_BE" }) +
                      new Date(user.time * 1000)
                        .toLocaleDateString()
                        .toString() +
                      intl.formatMessage({ id: "PROFILE.BUY.LABEL.MATURITY" })
                    : intl.formatMessage({
                        id: "PROFILE.BUY.LABEL.MATURITY.VIP",
                      })}
                </p>
              </div>
            </div>
          </div>
          <div className="container_header_input">
            <div className="container_header_input_container">
              <div className="container_header_input_container_title">
                <span className="container_header_input_container_title_icon">
                  <img
                    className="container_header_input_container_title_icon_img"
                    src={diamondIcon}
                    alt="diamond"
                  />
                </span>
                <span className="container_header_input_container_title_text">
                  {intl.formatMessage({
                    id: "PROFILE.BUY.LABEL.VIP.REDEMPTION_CODE",
                  })}
                </span>
              </div>
              <div className="container_header_input_container_box">
                <input
                  className="container_header_input_container_box_input"
                  type="text"
                  placeholder={intl.formatMessage({
                    id: "PROFILE.BUY.PLACEHOLDER.VIP.REDEMPTION_CODE",
                  })}
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                />
                <div
                  className="container_header_input_container_box_submit fw-m"
                  onClick={() => {
                    exchangeVipCode(verificationCode);
                  }}
                >
                  {intl.formatMessage({
                    id: "PROFILE.BUY.LABEL.REDEEM_NOW",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container_body">
        <div className="container_body_title mb-3">
          <img
            className="container_body_title_icon"
            src={crownIcon}
            alt="crown"
          />
          <span className="container_body_title_text fw-l ">
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.BUY.MEMBER",
            })}
          </span>
        </div>
        <div className="container_body_content">
          {vipInfoData.vip
            ? vipInfoData.vip.map((data, index) => {
                return (
                  <div
                    className={
                      "container_body_content_item fw-m " +
                      (selectOption === index ? "active" : "")
                    }
                    key={data.id}
                    onClick={() => {
                      setSelectOption(index);
                    }}
                  >
                    <div className="container_body_content_item_title">
                      <span className="container_body_content_item_title_text">
                        {data.outside_display_name}
                        <span className="container_body_content_item_discount ml-2">
                          原价¥{data.pay_price + data.pay_price * (index + 1)}
                        </span>
                      </span>
                      {/* {data.orig_price} */}
                    </div>
                    <div className="container_body_content_item_price">
                      <span className="container_body_content_item_price_text">
                        <span
                          className={
                            "container_body_content_item_price_text_discount mr-2 " +
                            (selectOption === index && "active")
                          }
                        >
                          特惠
                        </span>
                        ¥ {data.pay_price}
                      </span>
                    </div>
                  </div>
                );
              })
            : ""}
          <div className="container_body_content_info">
            <img
              className="container_body_content_info_icon"
              src={exclamationIcon}
              alt="exclamation"
            />
            <span className="container_body_content_info_text">
              {intl.formatMessage({
                id: "PROFILE.BUY.LABEL.INFO.MEMBER.DESCRIPTION",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="container_footer">
        <div className="container_footer_title">
          <p className="container_footer_title_text">
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.BENEFIT_INTRODUCE",
            })}
          </p>
        </div>
        <div className="container_footer_highlight">
          <HighlightItem
            icon={freeIcon}
            text={intl.formatMessage({
              id: "PROFILE.BUY.LABEL.FREE",
            })}
          />
          <HighlightItem
            icon={infiniteIcon}
            text={intl.formatMessage({
              id: "PROFILE.BUY.LABEL.WATCH.FOREVER",
            })}
          />
          <HighlightItem
            icon={serverIcon}
            text={intl.formatMessage({
              id: "PROFILE.BUY.LABEL.EXCLUSIVE",
            })}
          />
          <HighlightItem
            icon={cardIcon}
            text={intl.formatMessage({
              id: "PROFILE.BUY.LABEL.PREMIUM_ICON",
            })}
          />
        </div>
        <div className="container_more_info">
          <p className="mb-5">
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.INFO.DESCRIPTION_1",
            })}
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.INFO.DESCRIPTION_2",
            })}
          </p>
        </div>
        <div className="container_footer_btn" onClick={buyMemberEvent}>
          <span className="container_footer_btn_text">
            {intl.formatMessage({
              id: "PROFILE.BUY.LABEL.BUY.MONEY",
            })}
            <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
          </span>
        </div>
      </div>
    </ProfileBuyVipCommonElement>
  );
};

export default ProfileBuyVipCommon;

const ProfileBuyVipCommonElement = styled.div`
  /*  */
  .container {
    &_header {
      position: sticky;
      top: 0;
      padding: 10px 0;
      margin-bottom: 20px;
      background-color: #000;
      @media (min-width: 599px) {
        padding: 20px ${padding}px 1px;
      }

      &_info {
        display: flex;
        padding: 0 ${padding}px;
        color: #fff;
        &_avatar {
          width: 60px;
          height: 60px;
        }

        &_detail {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: flex-start;
          margin-left: 10px;
          font-size: 12px;
          &_title {
            &_text {
              font-size: 16px;
              &_hight {
                margin-top: 2%;
                font-size: 12px;
                display: inline-block;
                padding: 2px 5px;
                vertical-align: middle;
                background-color: #daad75;
                border-radius: 10px;
              }
            }
          }

          &_time {
            display: inline-block;
            padding: 3px 5px;
            background-color: #daad75;
            border-radius: 20px;
          }
        }
      }

      &_input {
        padding: 0 20px;
        margin: 3% 1% -18%;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 10px #aaa;
        @media(min-width:599px){
          margin: 1% 4%;
        }

        &_container {
          padding: 20px;

          &_title {
            text-align: center;

            &_icon {
              &_img {
                width: 20px;
                height: 20px;
                vertical-align: middle;
              }
            }

            &_text {
              margin-left: 10px;
              font-weight: 700;
            }
          }

          &_box {
            display: flex;
            margin-top: 10px;

            &_input {
              flex-grow: 1;
              padding: 7px 7px 7px 25px;
              width: 0;
              border: 1px solid #aaa;
              border-right: none;
              border-radius: 20px 0 0 20px;
              outline: none;
            }

            &_submit {
              cursor: pointer;
              flex-shrink: 0;
              padding: 2%;
              font-size: 20px;
              width: 100px;
              line-height: 22px;
              text-align: center;
              color: #fff;
              background-image: linear-gradient(
                to Right,
                #fbc6c0 0%,
                #fa97ab 45%,
                #fa719a 100%
              );
              border-radius: 0 20px 20px 0;
              @media(min-width:599px){
                padding: 1% 12%;
              }
            }
          }
        }
      }
    }

    &_body {
      padding: ${padding}px;
      padding-top:15%;
      @media(min-width:599px){
        padding: ${padding}px;
      }
      &_title {
        &_icon {
          width: 20px;
          height: 20px;
          vertical-align: bottom;
        }

        &_text {
          margin-left: 10px;
          font-size: 18px;
        }
      }

      &_content {
        &_item {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          padding: 20px 1%;
          margin-top: 10px;
          font-size: 20px;
          color: #a8a8a8;
          border: 1px solid #000;
          border-radius: 5px;
          transition: 0.2s;
          @media (max-width: 599px) {
            font-size: 16px;
          }

          &.active {
            color: #000;
            background-color: rgb(239 215 173 / 20%);
            border-color: #daad75;
          }

          &_discount {
            color: #a8a8a8;
            text-decoration: line-through;
          }

          &_price_text {
            padding: 20px;

            &_discount {
              color: white;
              padding: 2px 10px;
              font-size: 16px;
              background-color: #a8a8a8;
              &.active {
                background-color: ${colors.dark_pink};
              }
            }
          }
        }

        &_info {
          margin-top: 10px;

          &_icon {
            margin-right: 5px;
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }

          &_text {
            font-size: 12px;
            color: #daad75;
          }
        }
      }
    }

    &_more_info {
      text-align: center;
      color: ${colors.text_light_grey};
      > p {
        padding: 8px;
        &:first-child {
          padding-bottom: 0;
        }
      }
    }

    &_footer {
      padding: ${padding}px;

      &_title {
        font-size: 22px;
        font-weight: 900;
      }

      &_highlight {
        display: flex;
      }

      &_btn {
        cursor: pointer;
        font-size: 20px;
        display: block;
        padding: 20px;
        margin: auto;
        text-align: center;
        color: #fff;
        background-image: linear-gradient(97deg, #efd7ad, #daad75);
        border-radius: 35px;
      }
    }
  }
`;

const HighlightItem = ({ icon, text }) => {
  return (
    <HighlightElementItem>
      <img className="icon" src={icon} alt={text} title={text} />
      <p className="text">{text}</p>
    </HighlightElementItem>
  );
};

const HighlightElementItem = styled.div`
  /*  */

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 8%;
  @media (max-width: 599px) {
    padding: 20px 1%;
  }
  .icon {
    width: 53%;
  }

  .text {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #885f2c;
  }
`;
