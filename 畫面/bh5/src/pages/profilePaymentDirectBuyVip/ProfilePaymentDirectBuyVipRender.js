import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { colors, padding } from "../../constants";
import ImageComponent from "../component/ImageComponent";
import WavaButton from "../component/WavaButton";
import { FloatElement } from "../profilePayment/ProfilePaymentRender";
import CloseIcon from "@mui/icons-material/Close";

import background_blue from "../../assets/profile/bg-blue.svg";
import background_purple from "../../assets/profile/bg-purple.svg";
import crownIcon from "../../assets/icons/crown.png";
import background_red from "../../assets/profile/bg-red.svg";
import infiniteIcon from "../../assets/profile/buyvip_infinite.svg";
import serverIcon from "../../assets/profile/buyvip_server.svg";
import freeIcon from "../../assets/profile/buyvip_free.svg";
import cardIcon from "../../assets/profile/buyvip_card.svg";
import useMediaSetting from "../../reackHook/useMediaSetting";
import { CSSTransition } from "react-transition-group";
import {
  dismissPreventPageScroll,
  preventPageScroll,
} from "../../reducers/actions/utilities";

const ProfilePayment = ({
  user,
  getDirectPurchaseList,
  getDirectPurchase,
  pay_channel_list,
  item_list,
}) => {
  const intl = useIntl();
  const { isMobile } = useMediaSetting();
  const { avatar, nick_name, time } = user;
  const [showModal, setShowModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(0);
  const [channelSelect, setChannelSelect] = useState(0);
  const [showTransfer, setShowTransfer] = useState(false);
  useEffect(() => {
    let Element = document.getElementsByClassName("PCFooterElement");
    setTimeout(() => Element[0].style.setProperty("display", "none"), 100);
  }, []);
  function getUserIdentity() {
    return time === "-1"
      ? intl.formatMessage({ id: "PROFILE.BUY.WATCH.FOREVER_1" })
      : Date.now() > time * 1000
      ? intl.formatMessage({ id: "PROFILE.MAIN.VIP.MATURITY1" })
      : new Date(time * 1000).toLocaleDateString().toString();
  }
  const memberPermissions = [
    {
      icon: freeIcon,
      text: intl.formatMessage({
        id: "PROFILE.BUY.LABEL.FREE",
      }),
    },
    {
      icon: infiniteIcon,
      text: intl.formatMessage({
        id: "PROFILE.BUY.LABEL.WATCH.FOREVER",
      }),
    },
    {
      icon: serverIcon,
      text: intl.formatMessage({
        id: "PROFILE.BUY.LABEL.EXCLUSIVE",
      }),
    },
    {
      icon: cardIcon,
      text: intl.formatMessage({
        id: "PROFILE.BUY.LABEL.PREMIUM_ICON",
      }),
    },
  ];

  useEffect(() => {
    getDirectPurchaseList();
  }, []);

  function onOpenFloatCover() {
    setShowTransfer(true);
    preventPageScroll();
  }
  function onCloseFloatCover() {
    setShowTransfer(false);
    dismissPreventPageScroll();
  }
  function onSubmit() {
    getDirectPurchase(
      {
        item_id: item_list[itemSelect].id,
        channel_id: channelSelect,
      },
      window.open
    );
    setShowTransfer(false);
    setShowModal(true);
  }
  return (
    <ProfilePaymentElement>
      <TopBarContainer show_shadow={false}>
        <TopTitleBar
          title={
            "VIP" + intl.formatMessage({ id: "PROFILE.MAIN.LABEL.MEMBER" })
          }
          showBack={true}
          back_color="#fff"
          color="black"
          show_back_color="black"
        />
      </TopBarContainer>
      <article className="black_area">
        <section className="g-flex-center py-3">
          <section className="g-flex-column-center">
            <section className="g-flex-start gap-3">
              <section className="profile_direct_buy_vip_avatar">
                <ImageComponent
                  is_cover={true}
                  src={avatar}
                  placeholderImg={avatar}
                  alt={nick_name}
                  title={nick_name}
                  border_radius={"50%"}
                  background_color="transparent"
                />
              </section>
              <section className="g-flex-column-center gap-2 fw-s">
                <span className="profile_direct_buy_vip_name ">
                  {nick_name}
                </span>
                <span className="profile_direct_buy_vip_permissions  g-flex-center align-items-center">
                  <img
                    src={crownIcon}
                    alt="BH5 crown"
                    className="profile_direct_buy_vip_crown"
                  />
                  {getUserIdentity()}
                </span>
              </section>
            </section>
            <section className="g-flex-column-center align-items-center mt-2 gap-2">
              <span className="profile_direct_buy_vip_description fw-m py-2">
                {intl.formatMessage({ id: "PROFILE.DIRECT_BUY_VIP.BUY_LONG" })}
              </span>
              <section
                className={`g-flex-space-around gap-${isMobile ? "2" : "5"}`}
              >
                {item_list.map((item, index) => {
                  return (
                    <VipCard
                      key={item.id}
                      nowSelect={itemSelect === index}
                      onClick={() => setItemSelect(index)}
                      index={index}
                      {...item}
                    />
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      </article>

      <footer className="container_footer">
        <div className="container_footer_title">
          <p className="container_footer_title_text">
            {intl.formatMessage({
              id: "PROFILE.DIRECT_BUY_VIP.MEMBER_PERMISSIONS",
            })}
          </p>
        </div>
        <div className="container_footer_highlight">
          {memberPermissions.map((item) => (
            <HighlightItem key={item.text} {...item} />
          ))}
        </div>
        <div className="container_footer_description">
          {intl.formatMessage({ id: "PROFILE.BUY.LABEL.INFO.DESCRIPTION_1" })}
        </div>
      </footer>
      <div onClick={onOpenFloatCover}>
        <WavaButton className="container_footer_button">
          {intl.formatMessage({ id: "PROFILE.DIRECT_BUY_VIP.CONTINUE.MEMBER" })}
        </WavaButton>
      </div>

      <FloatElement>
        <div
          className="float_cover"
          style={{
            height: showTransfer ? "auto" : "0vh",
            transform: showTransfer && "translateY(" + -70 + `vh) `,
          }}
        >
          <div className="float_cover_container">
            <div className="float_cover_header">
              <div className="float_cover_header_left">
                {intl.formatMessage({
                  id: "PROFILE.DIRECT_BUY_VIP.PAY_TYPE",
                })}
              </div>
              <div className="float_cover_close" onClick={onCloseFloatCover}>
                <CloseIcon
                  fontSize="large"
                  className="float_cover_close_img cursor"
                />
              </div>
            </div>
            <div className="float_cover_body">
              <div className="float_cover_body_text g-flex-center mb-3 ">
                <span>
                  {intl.formatMessage({
                    id: "PROFILE.DIRECT_BUY_VIP.CHECKED",
                  })}
                  {item_list[itemSelect].outside_display_name}
                </span>
                <span className="float_cover_body_price">
                  ￥{item_list[itemSelect].pay_price}
                </span>
              </div>
              <div className="g-flex-column-center gap-3">
                {pay_channel_list.map((item) => (
                  <div
                    key={item.id}
                    className="g-flex-space-between align-items-center "
                    onClick={() => setChannelSelect(item.id)}
                  >
                    <label
                      for={item.name}
                      className="float_cover_body_text g-flex-center align-items-center gap-1 justify-content-start w-100 "
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="float_cover_body_icon"
                      />
                      {item.name}
                    </label>
                    <input
                      type="radio"
                      id={item.name}
                      name="payTypeItems"
                      value={item.name}
                      checked={item.id == channelSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div onClick={onSubmit}>
              <WavaButton className="float_cover_button">
                {intl.formatMessage({
                  id: "PROFILE.DIRECT_BUY_VIP.PAY",
                })}
              </WavaButton>
            </div>
          </div>
        </div>
        <div
          className="background_cover"
          onClick={onCloseFloatCover}
          style={{ display: !showTransfer && "none" }}
        />
        <CSSTransition
          timeout={200}
          in={showModal}
          classNames="CSSTransition_opacity"
          unmountOnExit
          key="CSSTransition_show_view"
        >
          <div className="float_cover_tip" onClick={() => setShowModal(false)}>
            <div
              className="float_cover_tip_container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="float_cover_tip_container_title">
                <p className="float_cover_tip_container_title_text">
                  {intl.formatMessage({
                    id: "PROFILE.DIRECT_BUY_VIP.SUBMIT_FORM",
                  })}
                </p>
              </div>
              <div className="float_cover_tip_container_content">
                {intl.formatMessage({
                  id: "PROFILE.DIRECT_BUY_VIP.MODAL.DESCRIPTION",
                })}
              </div>
              <div className="float_cover_tip_container_btn">
                <div
                  className="float_cover_tip_container_btn_button heightlight"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <span className="float_cover_tip_container_btn_button_text">
                    {intl.formatMessage({
                      id: "POST.KNOW",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </FloatElement>
    </ProfilePaymentElement>
  );
};

export default ProfilePayment;

export const ProfilePaymentElement = styled.div`
  /*  */
  padding: ${main_height}px 0;
  min-height: calc(var(--vh, 1vh) * 100);

  .black_area {
    background: black;
    padding: 1% 0;
    color: #fff;
  }
  .white_area {
    background: #fff;
    color: black;
  }
  .profile_direct_buy_vip {
    &_avatar {
      flex-shrink: 0;
      position: relative;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      @media (max-width: 899px) {
        width: 60px;
        height: 60px;
        margin-left: 10px;
      }
    }

    &_crown {
      width: 25px;
      height: 20px;
      margin-right: 5px;
    }

    &_description {
      font-size: 1.5rem;
      @media (max-width: 899px) {
        font-size: 1.1rem;
      }
    }

    &_name {
      font-size: 1.2rem;
      font-weight: 600;
      @media (max-width: 899px) {
        font-size: 0.8rem;
      }
    }

    &_permissions {
      font-size: 1.2rem;
      @media (max-width: 899px) {
        font-size: 0.8rem;
      }
    }
  }
  .container {
    &_footer {
      padding: ${padding}px;
      margin-top: auto;
      @media (max-width: 899px) {
        padding: ${padding}px 10px;
      }

      &_title {
        padding-bottom: 5px;

        &_text {
          font-weight: 600;
          font-size: 1.5rem;
          text-align: center;
          @media (max-width: 899px) {
            font-size: 1.2rem;
          }
        }
      }

      &_highlight {
        display: flex;
      }

      &_description {
        font-size: 1rem;
        text-align: center;
        margin-top: 10px;
        color: ${colors.text_light_grey};
        font-weight: 500;
        @media (max-width: 899px) {
          font-size: 0.8rem;
        }
      }

      &_button {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        cursor: pointer;
        padding: 20px;
        box-sizing: border-box;
        font-weight: 600;
        text-align: center;
        color: #fff;
        background-color: ${colors.back_dark_pink};
        font-size: 1.4rem;

        @media (max-width: 899px) {
          padding: 10px;
          font-size: 1.2rem;
        }
      }
    }
  }

  ${FloatElement} {
    .float_cover {
      &_tip {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 11;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        background-color: #000c;
        &_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          box-sizing: border-box;
          width: 300px;
          background-color: #fff;
          border-radius: 5px;

          &_title {
            margin-top: 20px;
            font-weight: 600;
            &_text {
              font-size: 18px;
            }
          }

          &_content {
            margin-top: 15px;
            width: 80%;
            text-align: center;
            color: ${colors.text_grey};

            &_input {
              width: 100%;
              text-align: center;
              border: none;
              border-bottom: 1px solid;
              outline: none;
              border-radius: 0;
            }
          }

          &_btn {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
            width: 80%;

            &_button {
              cursor: pointer;
              padding: 10px;
              margin: 5px 0;
              box-sizing: border-box;
              width: 100%;
              font-size: 14px;
              text-align: center;
              border-radius: 20px;

              &_text {
                color: #fff;
              }

              &.heightlight {
                background-color: ${colors.back_dark_pink};

                .float_cover_container_btn_button_text {
                  color: #fff;
                }
              }
            }
          }
        }
      }
      &_container {
        @media (max-width: 899px) {
          padding: 0;
        }
      }
      &_body {
        &_text {
          font-weight: 600;
          font-size: 1.2rem;
          gap: 10px;
          @media (max-width: 899px) {
            font-size: 1rem;
          }
        }

        &_price {
          color: ${colors.back_dark_pink};
        }

        &_icon {
          width: 45px;
        }
      }
      &_header {
        padding: 2% 5%;
      }
      &_button {
        cursor: pointer;
        padding: 20px;
        margin: 0 5%;
        box-sizing: border-box;
        font-weight: 700;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        background-color: ${colors.back_dark_pink};
        font-size: 1.4rem;
        @media (max-width: 899px) {
          font-size: 1rem;
          padding: 15px;
        }
      }
    }

    .background_cover {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: black;
      opacity: 0.5;
      z-index: 99;
    }
  }

  input {
    accent-color: ${colors.back_dark_pink};
    width: 25px;
    height: 25px;
  }
`;
const HighlightItem = ({ icon, title, text }) => {
  return (
    <HighlightElementItem>
      <img className="icon" src={icon} alt={text} title={text} />
      <p className="title">{title}</p>
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
  padding: 20px 15px;
  .icon {
    width: 60px;
    @media (max-width: 899px) {
      width: 40px;
    }
  }

  .title {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;
  }

  .text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #885f2c;
    @media (max-width: 899px) {
      font-size: 0.8rem;
    }
  }
`;

const VipCard = ({
  outside_display_name,
  pay_price,
  orig_price,
  index,
  ...props
}) => {
  function switchBackground() {
    switch (index) {
      case 0:
        return background_blue;
      case 1:
        return background_purple;
      case 2:
        return background_red;
      default:
        break;
    }
  }
  function switchColor() {
    switch (index) {
      case 0:
        return "#5a65f2";
      case 1:
        return "#a841ff";
      case 2:
        return "#ff4848";
      default:
        break;
    }
  }
  return (
    <VipCardElement
      color={switchColor(index)}
      background={switchBackground(index)}
      className="g-flex-column-center align-items-center gap-2"
      {...props}
    >
      <section className="vip_card_subtitle">{outside_display_name}</section>
      <section className="vip_card_title">￥{pay_price}</section>
      <section className="vip_card_other_title">￥{orig_price}</section>
    </VipCardElement>
  );
};

const VipCardElement = styled.div`
  /*  */
  background: ${({ background }) => "url(" + background + ")"}no-repeat;
  background-size: contain;
  background-position: center;
  font-size: 1rem;
  width: 9rem;
  height: 9rem;
  white-space: nowrap;
  font-weight: 600;
  opacity: ${({ nowSelect }) => (nowSelect ? 1 : 0.5)};
  cursor: pointer;
  user-select: none;
  transition: 1s;
  @media (max-width: 899px) {
    width: 7rem;
    height: 7rem;
  }
  &:hover {
    transition: 0.5s;
    opacity: 1;
  }
  .vip_card {
    &_title {
      font-size: 1.6rem;
      color: ${({ color }) => color};
      padding: 2px 0;
      border-radius: 9px;
      background-color: #fff;
      width: 6rem;
      text-align: center;
      @media (max-width: 899px) {
        font-size: 1.4rem;
        width: 4.5rem;
      }
    }
    &_subtitle {
      font-size: 1.2rem;
      @media (max-width: 899px) {
        font-size: 1rem;
      }
    }
    &_other_title {
      text-decoration: line-through;
    }
  }
`;
