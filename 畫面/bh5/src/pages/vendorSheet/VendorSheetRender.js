import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "@emotion/styled/macro";
import { CSSTransition } from "react-transition-group";
import TopBarContainer, { main_height } from "../component/TopBarContainer";
import TopTitleBar from "../component/TopTitleBar";
import { apiUrl, colors, padding, requestUrlConstants } from "../../constants";
import ImageComponent from "../component/ImageComponent";
import { moneyAndGold } from "../vendorMain/component/VendorItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { bottom_nav_height } from "../component/BottomNavBar";

import { ReactComponent as CustomerServiceIcon } from "../../assets/vendor/customer_service.svg";
import LinkComponent from "../component/LinkComponent";
import CloseComponent from "../component/CloseComponent";
import {
  dismissPreventPageScroll,
  preventPageScroll,
} from "../../reducers/actions/utilities";
import callToast from "../../modules/toastCall";

import axiosRequest from "../../modules/axiosItem";

const { postGetCouponListUrl } = requestUrlConstants;

// buyType 0 自用 1 送禮
const VendorSheetRender = ({
  user,
  goodsId,
  buyType,
  goodsData,
  backPage,
  config,
  submitOrder,
}) => {
  const intl = useIntl();
  const receiverGiftRef = useRef();
  const receiverNameRef = useRef();
  const receiverAreaRef = useRef();
  const receiverAddressRef = useRef();
  const receiverCodeRef = useRef();
  const receiverPhoneRef = useRef();

  const [selectCoupon, setSelectCoupon] = useState({
    id: 0,
    title: intl.formatMessage({ id: "VENDOR.SHEET.LABEL.CHOICE.COUPON" }),
  });
  const [paymentType, setPaymentType] = useState(0); // 0 晶鑽 1 金幣
  const [couponCover, setCouponCover] = useState(false);
  const [couponCoverContainer, setCouponCoverContainer] = useState(false);

  const [receiverGift, setReceiverGift] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverArea, setReceiverArea] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverCode, setReceiverCode] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    if (!goodsData.id) {
      backPage();
    }
    if (!goodsData.mone) {
      setPaymentType(1);
    }

    let formData = new FormData();
    formData.append("page", 1);
    formData.append("limit", 99);
    formData.append("category_id", goodsData.category_id);
    formData.append("is_expire", 0);
    formData.append("uid", user.id);

    axiosRequest.post(postGetCouponListUrl, formData).then((data) => {
      setCouponList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function receiverGiftEvent(e) {
    receiverGiftRef.current.classList.remove("error");
    var key = window.event ? e.keyCode : e.which;
    setReceiverGift(e.target.value);
    if (key === 13) {
      receiverNameRef.current.focus();
    }
  }
  function receiverNameEvent(e) {
    receiverNameRef.current.classList.remove("error");
    var key = window.event ? e.keyCode : e.which;
    setReceiverName(e.target.value);
    if (key === 13) {
      receiverAreaRef.current.focus();
    }
  }
  function receiverAreaEvent(e) {
    receiverAreaRef.current.classList.remove("error");
    var key = window.event ? e.keyCode : e.which;
    setReceiverArea(e.target.value);
    if (key === 13) {
      receiverAddressRef.current.focus();
    }
  }
  function receiverAddressEvent(e) {
    receiverAddressRef.current.classList.remove("error");
    var key = window.event ? e.keyCode : e.which;
    setReceiverAddress(e.target.value);
    if (key === 13) {
      receiverCodeRef.current.focus();
    }
  }
  function receiverCodeEvent(e) {
    receiverCodeRef.current.classList.remove("error");
    var key = window.event ? e.keyCode : e.which;
    setReceiverCode(e.target.value);
    if (key === 13) {
      receiverPhoneRef.current.focus();
    }
  }
  function receiverPhoneEvent(e) {
    receiverPhoneRef.current.classList.remove("error");
    var key = window.event ? e.keyCode : e.which;
    setReceiverPhone(e.target.value);
    if (key === 13) {
      submitInfo();
    }
  }

  function submitInfo() {
    let check = true;

    if (goodsData.item_type === "actual") {
      if (!receiverPhone) {
        receiverPhoneRef.current.classList.add("error");
        receiverPhoneRef.current.focus();
        check = false;
      }

      if (!receiverCode) {
        receiverCodeRef.current.classList.add("error");
        receiverCodeRef.current.focus();
        check = false;
      }

      if (!receiverAddress) {
        receiverAddressRef.current.classList.add("error");
        receiverAddressRef.current.focus();
        check = false;
      }

      if (!receiverArea) {
        receiverAreaRef.current.classList.add("error");
        receiverAreaRef.current.focus();
        check = false;
      }

      if (!receiverName) {
        receiverNameRef.current.classList.add("error");
        receiverNameRef.current.focus();
        check = false;
      }
    }

    if (buyType !== "0") {
      if (!receiverGift) {
        receiverGiftRef.current.classList.add("error");
        receiverGiftRef.current.focus();
        check = false;
      }
    }

    if (check) {
      let object = {
        isActual: goodsData.item_type === "actual",
        goodsId,
        paymentType,
        receiverName,
        receiverArea,
        receiverAddress,
        receiverCode,
        receiverPhone,
        receiverGift,
      };
      if (
        selectCoupon.title !==
          intl.formatMessage({ id: "VENDOR.SHEET.LABEL.CHOICE.COUPON" }) &&
        selectCoupon.discount_unit !== paymentType
      ) {
        object.selectCoupon = selectCoupon;
      }

      submitOrder(object);
    } else {
      callToast(intl.formatMessage({ id: "TOAST.TIP.EMPTY" }));
    }
  }

  function clickCouponEvent(data) {
    setSelectCoupon(data);
    setCouponCoverContainer(false);
  }

  function pickPaymentType(numeber) {
    setSelectCoupon({
      id: 0,
      title: intl.formatMessage({ id: "VENDOR.SHEET.LABEL.CHOICE.COUPON" }),
    });
    setPaymentType(numeber);
  }

  return (
    <VendorSheetRenderElement>
      <TopBarContainer>
        <TopTitleBar
          title={intl.formatMessage({ id: "VENDOR.SHEET.LABEL.SETTLE" })}
          color="#000"
          showBack={true}
          back_color="#fff"
        >
          <LinkComponent
            routes={{
              linkurl: config.group_cs,
            }}
          >
            <CustomerServiceIcon width="42" height="42" />
          </LinkComponent>
        </TopTitleBar>
      </TopBarContainer>
      <CSSTransition
        timeout={200}
        in={couponCover}
        onEnter={() => {
          setCouponCoverContainer(true);
          preventPageScroll();
        }}
        classNames="CSSTransition_opacity"
        unmountOnExit
        key="CSSTransition_coupon_cover"
      >
        <div className="sheet_coupon">
          <CSSTransition
            timeout={100}
            in={couponCoverContainer}
            onExited={() => {
              setCouponCover(false);
              dismissPreventPageScroll();
            }}
            classNames="CSSTransition_popup"
            unmountOnExit
            key="CSSTransition_coupon_cover_container"
          >
            <div className="sheet_coupon_container">
              <div className="sheet_coupon_container_header">
                <p className="sheet_coupon_container_header_title">
                  {intl.formatMessage({
                    id: "VENDOR.SHEET.LABEL.CHOICE.COUPON",
                  })}
                </p>
                <div
                  className="sheet_coupon_container_header_close"
                  onClick={() => {
                    setCouponCoverContainer(false);
                  }}
                >
                  <CloseComponent
                    callback={() => {
                      setCouponCoverContainer(false);
                    }}
                    styleType="2"
                  />
                </div>
              </div>
              <div className="sheet_coupon_container_body">
                {couponList.map((data) => {
                  if (data.count - (data.use_count || 0) <= 0) {
                    return "";
                  }
                  return (
                    <div
                      className={
                        "sheet_coupon_container_body_item " +
                        (paymentType === data.discount_unit ? "disable" : "")
                      }
                      key={data.id}
                      onClick={() => {
                        if (paymentType !== data.discount_unit) {
                          clickCouponEvent(data);
                        }
                      }}
                    >
                      <div className="sheet_coupon_container_body_item_header">
                        {Array.from({ length: 6 }).map((i, k) => {
                          return (
                            <div
                              className="sheet_coupon_container_body_item_header_dot"
                              style={{
                                top: k * 15 + 7 + "%",
                              }}
                              key={k}
                            />
                          );
                        })}
                        <span className="sheet_coupon_container_body_item_header_title">
                          {data.discount_type === "number"
                            ? data.discount_amount
                            : data.discount_amount / 10 +
                              intl.formatMessage({
                                id: "GLOBAL.LABEL.BUY.FOLD",
                              })}
                        </span>
                        <span className="sheet_coupon_container_body_item_header_type">
                          {data.discount_unit === 0
                            ? intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })
                            : intl.formatMessage({ id: "GLOBAL.MONEY" })}
                          {intl.formatMessage({
                            id: "GLOBAL.LABEL.BUY.DISCOUNT",
                          })}
                        </span>
                      </div>
                      <div className="sheet_coupon_container_body_item_body">
                        <div className="sheet_coupon_container_body_item_body_title">
                          <p className="sheet_coupon_container_body_item_body_title_text">
                            {data.title}
                          </p>
                        </div>
                        <div className="sheet_coupon_container_body_item_body_time">
                          <span className="sheet_coupon_container_body_item_body_time_text">
                            {data.start_date}-{data.end_date}
                          </span>
                        </div>
                        <div className="sheet_coupon_container_body_item_body_description">
                          <p className="sheet_coupon_container_body_item_body_description_text">
                            {data.discount_type === "number"
                              ? intl.formatMessage({
                                  id: "VENDOR.SHEET.LABEL.REDUCE",
                                }) +
                                data.discount_amount +
                                intl.formatMessage({
                                  id: "VENDOR.SHEET.LABEL.GOLD_MONEY_ONCE",
                                })
                              : intl.formatMessage({
                                  id: "VENDOR.SHEET.LABEL.BUY.DISCOUNT.GAME",
                                })}
                            {intl.formatMessage({
                              id: "VENDOR.SHEET.LABEL.DESCRIPTION_1",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
      <div className="sheet_container">
        <div className="sheet_container_header">
          <div className="sheet_container_header_cover">
            <ImageComponent
              src={
                goodsData.picurl?.indexOf("http") === -1
                  ? apiUrl + "/" + goodsData.picurl
                  : goodsData.picurl
              }
              placeholderImg={
                goodsData.picurl?.indexOf("http") === -1
                  ? apiUrl + "/" + goodsData.picurl
                  : goodsData.picurl
              }
              alt={goodsData.title}
              title={goodsData.title}
              toFixSize={true}
              border_radius={0}
            />
          </div>
          <div className="sheet_container_header_info">
            <div className="sheet_container_header_info_title">
              <span className="sheet_container_header_info_title_text">
                {goodsData.title}
              </span>
            </div>
            <div className="sheet_container_header_info_price">
              {moneyAndGold(goodsData.mone, goodsData.yue,intl)}
            </div>
          </div>
        </div>
        <div className="sheet_container_payment">
          <div className="sheet_container_payment_title">
            <span className="sheet_container_payment_title_text">
              {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.PAYMENT" })}
            </span>
          </div>
          <div className="sheet_container_payment_type">
            {goodsData.yue ? (
              <div
                className="sheet_container_payment_type_label"
                onClick={() => {
                  pickPaymentType(0);
                }}
              >
                <div className="sheet_container_payment_type_label_radio">
                  <div
                    className={
                      "sheet_container_payment_type_label_radio_dot " +
                      (paymentType === 0 ? "active" : "")
                    }
                  />
                </div>
                {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.BUY.MONEY" })}
              </div>
            ) : (
              ""
            )}
            {goodsData.mone ? (
              <div
                className="sheet_container_payment_type_label"
                onClick={() => {
                  pickPaymentType(1);
                }}
              >
                <div className="sheet_container_payment_type_label_radio">
                  <div
                    className={
                      "sheet_container_payment_type_label_radio_dot " +
                      (paymentType === 1 ? "active" : "")
                    }
                  />
                </div>
                {intl.formatMessage({
                  id: "VENDOR.SHEET.LABEL.BUY.GOLD_MONEY",
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className="sheet_container_coupon"
          onClick={() => {
            setCouponCover(true);
          }}
        >
          <div className="sheet_container_coupon_select">
            <span className="sheet_container_coupon_select_title">
              {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.COUPON" })}
            </span>
            <span className="sheet_container_coupon_select_choose">
              {selectCoupon.title}
              <FontAwesomeIcon
                className="sheet_container_coupon_select_choose_icon"
                icon={faAngleRight}
              />
            </span>
          </div>
        </div>
        {buyType === "1" ? (
          <div className="sheet_container_send">
            <div className="sheet_container_send_title">
              <span className="sheet_container_send_title_text">
                {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.RECEIVED_DATA" })}
              </span>
            </div>
            <div className="sheet_container_send_box">
              <input
                ref={receiverGiftRef}
                className="sheet_container_send_box_input"
                type="number"
                placeholder={intl.formatMessage({
                  id: "VENDOR.SHEET.LABEL.GIVE_AWAY_PHONE",
                })}
                value={receiverGift}
                onChange={receiverGiftEvent}
                onKeyDown={receiverGiftEvent}
                enterKeyHint="next"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="sheet_container_caption">
          <div className="sheet_container_caption_title">
            <span className="sheet_container_caption_title_text">
              {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.SPECIFICATIONS" })}
            </span>
          </div>
          <div className="sheet_container_caption_description">
            <p className="sheet_container_caption_description_text">
              {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.DESCRIPTION_2" })}
              {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.DESCRIPTION_3" })}
            </p>
          </div>
        </div>
        {goodsData.item_type === "actual" ? (
          <div className="sheet_container_form">
            <div className="sheet_container_form_title">
              <span className="sheet_container_form_title_text">
                {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.RECEIVED_DATA" })}
              </span>
            </div>
            <form className="sheet_container_form_card">
              <div className="sheet_container_form_card_item">
                <input
                  ref={receiverNameRef}
                  className="sheet_container_form_card_item_input"
                  type="text"
                  placeholder={intl.formatMessage({
                    id: "VENDOR.SHEET.PLACEHOLDER.RECEIVER.NAME",
                  })}
                  value={receiverName}
                  onChange={receiverNameEvent}
                  onKeyDown={receiverNameEvent}
                  enterKeyHint="next"
                />
              </div>
              <div className="sheet_container_form_card_item">
                <input
                  ref={receiverAreaRef}
                  className="sheet_container_form_card_item_input"
                  type="text"
                  placeholder={intl.formatMessage({
                    id: "VENDOR.SHEET.PLACEHOLDER.AREA",
                  })}
                  value={receiverArea}
                  onChange={receiverAreaEvent}
                  onKeyDown={receiverAreaEvent}
                  enterKeyHint="next"
                />
              </div>
              <div className="sheet_container_form_card_item">
                <input
                  ref={receiverAddressRef}
                  className="sheet_container_form_card_item_input"
                  type="text"
                  placeholder={intl.formatMessage({
                    id: "VENDOR.SHEET.PLACEHOLDER.COMPLETE_ADDRESS",
                  })}
                  value={receiverAddress}
                  onChange={receiverAddressEvent}
                  onKeyDown={receiverAddressEvent}
                  enterKeyHint="next"
                />
              </div>
              <div className="sheet_container_form_card_item">
                <input
                  ref={receiverCodeRef}
                  className="sheet_container_form_card_item_input"
                  type="text"
                  placeholder={intl.formatMessage({
                    id: "VENDOR.SHEET.PLACEHOLDER.POSTAL_CODE",
                  })}
                  value={receiverCode}
                  onChange={receiverCodeEvent}
                  onKeyDown={receiverCodeEvent}
                  enterKeyHint="next"
                />
              </div>
              <div className="sheet_container_form_card_item">
                <input
                  ref={receiverPhoneRef}
                  className="sheet_container_form_card_item_input"
                  type="number"
                  placeholder={intl.formatMessage({
                    id: "VENDOR.SHEET.PLACEHOLDER.PHONE",
                  })}
                  value={receiverPhone}
                  onChange={receiverPhoneEvent}
                  onKeyDown={receiverPhoneEvent}
                  enterKeyHint="done"
                />
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="sheet_bottom_nav">
        <div className="sheet_bottom_nav_container">
          <div className="sheet_bottom_nav_container_total">
            <span className="sheet_bottom_nav_container_total_text">合计</span>
            <span className="sheet_bottom_nav_container_total_amount">
              {paymentType === 0 ? (
                <>
                  <span className="sheet_bottom_nav_container_total_amount_text">
                    {selectCoupon.discount_unit === 1
                      ? selectCoupon.discount_type === "number"
                        ? goodsData.yue - selectCoupon.discount_amount
                        : Math.round(
                            goodsData.yue * (selectCoupon.discount_amount / 100)
                          )
                      : goodsData.yue}
                  </span>
                  {intl.formatMessage({ id: "GLOBAL.MONEY" })}
                </>
              ) : (
                <>
                  <span className="sheet_bottom_nav_container_total_amount_text">
                    {selectCoupon.discount_unit === 0
                      ? selectCoupon.discount_type === "number"
                        ? goodsData.mone - selectCoupon.discount_amount
                        : Math.round(
                            goodsData.mone *
                              (selectCoupon.discount_amount / 100)
                          )
                      : goodsData.mone}
                  </span>
                  {intl.formatMessage({ id: "GLOBAL.GOLD_MONEY" })}
                </>
              )}
            </span>
          </div>
          <div className="sheet_bottom_nav_container_btn" onClick={submitInfo}>
            <span className="sheet_bottom_nav_container_btn_text">
              {intl.formatMessage({ id: "VENDOR.SHEET.LABEL.BUY.CONFIRM" })}
            </span>
          </div>
        </div>
      </div>
    </VendorSheetRenderElement>
  );
};

export default VendorSheetRender;

export const VendorSheetRenderElement = styled.div`
  /*  */
  padding-top: ${main_height}px;
  padding-bottom: ${bottom_nav_height}px;

  .sheet_coupon {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 599px;
    background-color: #000a;

    &_container {
      position: relative;
      overflow: auto;
      margin-top: auto;
      max-height: 50vh;
      background-color: #fff;

      &_header {
        position: sticky;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        padding: 10px ${padding}px;
        background-color: #fff;

        &_title {
          font-size: 22px;
          font-weight: 900;
          color: ${colors.text_grey};
        }

        &_close {
          position: relative;
          width: 22px;
          height: 22px;
        }
      }

      &_body {
        padding: ${padding}px;
        padding-top: 0;

        &_item {
          cursor: pointer;
          display: flex;
          margin-top: 10px;
          background-image: linear-gradient(
            135deg,
            #fa83b3 0%,
            #f45c8c 54.468%,
            #f24c7c 100%
          );

          &.disable {
            cursor: auto;
            filter: grayscale(1);
          }

          &_header {
            flex-shrink: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 15px 0;
            width: 105px;
            color: #fff;

            &::before,
            &::after,
            &_dot {
              position: absolute;
              width: 10px;
              height: 10px;
              background-color: #fff;
              border-radius: 50%;
            }

            &_dot {
              left: 0;
              transform: translateX(-50%);
            }

            &::before,
            &::after {
              content: "";
              left: 30%;
            }

            &::before {
              top: 0;
              transform: translateY(-50%);
            }

            &::after {
              bottom: 0;
              transform: translateY(50%);
            }

            &_title {
              font-size: 30px;
              font-weight: 900;
            }

            &_type {
              margin-top: 10px;
              font-size: 16px;
              font-weight: 500;
            }
          }

          &_body {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 0 5px 0 10px;
            margin: 2px;
            width: 100%;
            background-color: #fff;

            &_title,
            &_time,
            &_description {
              &_text {
                font-size: 14px;
              }
            }

            &_time,
            &_description {
              &_text {
                color: ${colors.text_grey};
              }
            }

            &_description {
              &_text {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  .sheet_container {
    border-bottom: 10px solid ${colors.back_grey};

    &_header,
    &_payment,
    &_coupon,
    &_send,
    &_caption,
    &_form {
      padding: ${padding}px;
      border-top: 10px solid ${colors.back_grey};

      &_title {
        &_text {
          font-size: 20px;
          font-weight: 700;
        }
      }
    }

    &_caption,
    &_form {
      border-top-width: 20px;
    }

    &_header {
      display: flex;

      &_cover {
        width: 30%;
        max-width: 200px;
      }

      &_info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 20px;

        &_price {
          .price {
            font-weight: 600;
            margin-top: 10px;
            font-size: 20px;
            color: ${colors.dark_pink};

            &_small {
              font-size: 14px;
              letter-spacing: 1px;
            }
          }
        }
      }
    }

    &_coupon {
      cursor: pointer;

      &_select {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 900;

        &_choose {
          color: ${colors.text_light_grey};

          &_icon {
            margin-left: 10px;
            vertical-align: bottom;
          }
        }
      }
    }

    &_payment {
      &_type {
        display: flex;
        margin-top: 10px;

        &_label {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: 50px;
          letter-spacing: 1px;
          color: ${colors.text_grey};
          font-weight: 900;

          &:last-child {
            margin-right: 0;
          }

          &_radio {
            display: inline-block;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0 10px 0 5px;
            box-sizing: border-box;
            width: 24px;
            height: 24px;
            border: 2px solid #a8a8a8;
            border-radius: 50%;

            &_dot {
              width: 80%;
              height: 80%;
              border-radius: 50%;

              &.active {
                background-color: #fa719a;
              }
            }
          }
        }
      }
    }

    &_send {
      &_box {
        margin-top: 10px;

        &_input {
          padding: 0;
          padding-bottom: 10px;
          width: 100%;
          font-size: 18px;
          border-top: none;
          border-right: none;
          border-bottom: 1px solid #a8a8a8;
          border-left: none;
          outline: none;
          font-weight: 900;

          &::placeholder {
            color: ${colors.text_light_grey};
          }

          &.error {
            &::placeholder {
              color: #ff2020;
            }
          }
        }
      }
    }

    &_caption {
      font-size: 18px;
      font-weight: 900;

      &_title {
        &_text {
          color: ${colors.text_grey};
        }
      }

      &_description {
        margin-top: 10px;

        &_text {
          line-height: 1.3em;
          letter-spacing: 1px;
          color: ${colors.text_light_grey};
        }
      }
    }

    &_form {
      /* &_title {
        &_text {}
      } */
      &_card {
        &_item {
          margin-top: 10px;

          &_input {
            padding: 0;
            padding-bottom: 10px;
            width: 100%;
            font-size: 18px;
            border-top: none;
            border-right: none;
            border-bottom: 1px solid #a8a8a8;
            border-left: none;
            outline: none;
            font-weight: 900;

            &::placeholder {
              color: ${colors.text_light_grey};
            }

            &.error {
              &::placeholder {
                color: #ff2020;
              }
            }
          }
        }
      }
    }
  }

  .sheet_bottom_nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 ${padding}px;
    margin: auto;
    box-sizing: border-box;
    max-width: 599px;
    height: ${bottom_nav_height}px;
    background-color: #fff;

    &_container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      font-size: 20px;

      &_total {
        font-weight: 900;

        &_amount {
          color: ${colors.dark_pink};

          &_text {
            margin: 0 5px;
          }
        }
      }

      &_btn {
        cursor: pointer;
        padding: 10px 20px;
        background-color: ${colors.dark_pink};
        border-radius: 10px;

        &_text {
          color: #fff;
        }
      }
    }
  }
`;
